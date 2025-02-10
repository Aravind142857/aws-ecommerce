import { Cart } from "./cart";
import {v4 as uuidv4} from 'uuid';
export class RecentOrders {
    user_id: string;
    orders: Order[];
    constructor(user_id: string, orders: Order[]) {
        this.user_id = user_id;
        this.orders = orders;
    }

    addOrder(order: Cart) {
        this.orders.push(new Order(order, uuidv4()));
        console.log(`new order added. ${order}, ${this.orders}`);
    }

    getRecentOrders(n: number) {
        if (n > this.orders.length) {
            return this.orders;
        }
        if (n == -1) {
            return this.orders;
        }
        return this.orders.slice(n);
    }

    toPlainObject() {
        return {
            user_id: this.user_id,
            orders: this.orders.map((order) => new Order(order.cart, order.order_id).toPlainObject())
        };
    }
    static fromDynamoItem(item: Record<string, any>): RecentOrders {
        const user_id: string = item.user_id.S;
        const orders: Order[] = item.orders.L.map((order: Record<string, any>) => Order.fromDynamoItem(order.M));
        return new RecentOrders(user_id, orders);
    }
    static fromDynamoItems(items: Record<string, any>[]): RecentOrders[] {
        const recentOrders: RecentOrders[] = [];
        items.forEach((item) => {
            recentOrders.push(RecentOrders.fromDynamoItem(item.M));
        });
        return recentOrders;
    }
}
export class Order {
    cart: Cart;
    order_id: string;
    constructor( cart: Cart, order_id: string) {
        this.cart = cart;
        this.order_id = order_id;
    }
    toPlainObject() {
        console.log(typeof(this.cart));
        return {
            cart: new Cart(this.cart.user_id, this.cart.items).toPlainObject(),
            order_id: this.order_id
        };
    }
    static fromDynamoItem(item: Record<string, any>): Order {
        const cart: Cart = Cart.fromDynamoItem(item.cart.M);
        const order_id: string = item.order_id.S;
        return new Order(cart, order_id);
    }

}