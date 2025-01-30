import Product from "./Product";

export class Cart {
    cart_id: string;
    items: CartItem[];
    total_quantity: number;
    total_price: number;
    constructor(cart_id: string, items: CartItem[], total_quantity: number, total_price: number) {
        this.cart_id = cart_id;
        this.items = items;
        this.total_quantity = total_quantity;
        this.total_price = total_price;
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
        this.items.push(new CartItem(product, quantity));
        this.total_quantity = Number(this.total_quantity) + Number(quantity);
        this.total_price = Number(this.total_price) + Number(product.price) * Number(quantity);
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
}
export class CartItem {
    product: Product;
    quantity: number;
    total_price: number;
    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
        this.total_price = Number(product.price) * Number(this.quantity);
    }
}   