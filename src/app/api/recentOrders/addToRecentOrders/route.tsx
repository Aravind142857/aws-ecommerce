import { db } from "@/app/database/dynamoDB";

import { Cart } from "@/app/types/cart";
import { RecentOrders } from "@/app/types/recentOrders";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
export async function POST (request: Request) {
    const body:{user_id: string, cart: Cart} = await request.json();
    if (!body) {
        return Response.json({error: "No request body found"}, { status: 400 });
    }
    const {user_id, cart} = body;
    if (!user_id) {
        return Response.json({error: "No user_id found"}, { status: 400 });
    }
    if (!cart || cart.items.length == 0) {
        return Response.json({error: "No cart found"}, { status: 400 });
    }
    const params = {
        "ExpressionAttributeValues": {
        ":v1": {
        "S": `${user_id}`
        }
        },
        "KeyConditionExpression": "user_id = :v1",
        "TableName": "RecentOrders"
    };
    try {
        const res = await db.send(new QueryCommand(params));
        let recent_orders: RecentOrders = new RecentOrders(user_id, []);
        if (res.Items && res.Items.length > 0) {
            recent_orders = RecentOrders.fromDynamoItem(res.Items[0]);
        }
        console.log(`${res.Items?res.Items.length:0} orders found`);
        recent_orders.addOrder(cart);
        console.log(`added order to recent orders, ${recent_orders}`);
        const recent_orders_object = recent_orders.toPlainObject();
        console.log(recent_orders_object);
        db.put({ TableName: "RecentOrders", Item: recent_orders_object });
        return Response.json({ data: recent_orders });
    } catch (err) {
    console.log(err);
    return Response.json({ error: 'No such recent order found' }, {status: 500})
    }
}