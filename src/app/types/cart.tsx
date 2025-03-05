import Product from "@/app/types/Product";

export class Cart {
    user_id: string;
    items: CartItem[];
    total_quantity: number;
    total_price: number;
    constructor(user_id: string, items: CartItem[]) {
        this.user_id = user_id;
        this.items = items;
        this.total_quantity = (items)?items.reduce((accumulator, curr) => accumulator + curr.quantity, 0):0;
        this.total_price = (items)?items.reduce((accumulator, curr) => accumulator + curr.total_price, 0):0.0;
    }
    getCartItems(): CartItem[] {
        return this.items;
    }
    getCartTotalQuantity(): number {
        return this.total_quantity;
    }
    getCartTotalPrice(): number {
        return this.total_price;
    }
    addProduct(product: Product, quantity: number) {
        const item: CartItem | undefined = this.items.find((item) => item.product.pid === product.pid);
        if (item) {
            item.quantity += Number(quantity);
            item.total_price = Number(item.quantity) * Number(item.product.price);
            this.total_quantity = Number(this.total_quantity) + Number(quantity);
            this.total_price = Number(this.total_price) + Number(item.product.price) * Number(quantity);
            return;
        }
        this.items.push(new CartItem(new Product(product.pid, product.name, product.desc, product.price, product.img, product.rating, product.votes, product.category), Number(quantity)));
        this.total_quantity = Number(this.total_quantity??0) + Number(quantity);
        this.total_price = Number(this.total_price??0) + Number(product.price) * Number(quantity);
    }
    removeProduct(product_id: string, quantity: number) {
        const item: CartItem | undefined = this.items.find((item) => item.product.pid === product_id);
        if (item) {
            if (item.quantity <= quantity) {
                this.items = this.items.filter((item) => item.product.pid !== product_id);
                this.total_quantity = Number(this.total_quantity) - Number(item.quantity);
                this.total_price = Number(this.total_price) - Number(item.product.price) * Number(item.quantity);
            } else {
                item.quantity -= Number(quantity);
                item.total_price = Number(item.quantity) * Number(item.product.price);
                this.total_quantity = Number(this.total_quantity) - Number(quantity);
                this.total_price = Number(this.total_price) - Number(item.product.price) * Number(quantity);
            }
        }
    }
    static fromDynamoItem(item: Record<string, any>): Cart {
        const user_id: string = item.user_id.S;
        const items: CartItem[] = CartItem.fromDynamoItems(item.items.L);
        return new Cart(user_id, items);
    }
    toPlainObject() {
        return {
            user_id: this.user_id,
            items: this.items.map((item) => new CartItem(item.product, item.quantity).toPlainObject()),
            total_quantity: this.total_quantity,
            total_price: this.total_price
        };
    }
    
    clear() {
        if (this.items) {
            this.items = [];
        }
        if (this.total_quantity) {
            this.total_quantity = 0;
        }
        if (this.total_price) {
            this.total_price = 0;
        }
    }
}
export class CartItem {
    product: Product;
    quantity: number;
    total_price: number;
    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
        this.total_price = (Number(product.price) * Number(this.quantity));
    }
    static fromDynamoItem(item: Record<string, any>): CartItem {
        const product: Product = Product.fromDynamoItem(item.product.M);
        const quantity: number = Number(item.quantity.N);
        return new CartItem(product, quantity);
    }
    static fromDynamoItems(items: Record<string, any>[]): CartItem[] {
        const cartItems: CartItem[] = [];
        items.forEach((item) => {
            cartItems.push(CartItem.fromDynamoItem(item.M));
        });
        return cartItems;
    }
    toPlainObject() {
        return {
            product: new Product(this.product.pid, this.product.name, this.product.desc, this.product.price, this.product.img, this.product.rating, this.product.votes, this.product.category).toPlainObject(),
            quantity: this.quantity,
            total_price: this.total_price
        };
    }
}

// Create table Cart, API addToCart, API removeFromCart, onCartIconClick: redirect to cart page, on cart page: +/- to change qty, delete to remove item, 'Add product' to add new item to cart.