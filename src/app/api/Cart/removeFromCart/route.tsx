import { db } from "@/app/database/dynamoDB";

import { Cart, CartItem } from "@/app/types/cart";
import Product from "@/app/types/Product";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
export async function POST (request: Request) {
    const body:{user_id: string, product: Product, quantity: number} = await request.json();
    if (!body) {
        return Response.json({error: "No request body found"}, { status: 400 });
    }
    const {user_id, product, quantity} = body;
    if (!user_id) {
        return Response.json({error: "No user_id found"}, { status: 400 });
    }
    const params = {
        "ExpressionAttributeValues": {
        ":v1": {
        "S": `${user_id}`
        }
        },
        "KeyConditionExpression": "user_id = :v1",
        "TableName": "Carts"
    };
    try {
        const res = await db.send(new QueryCommand(params));
        let c: Cart = new Cart(user_id, []);
        if (res.Items && res.Items.length > 0) {
            c = Cart.fromDynamoItem(res.Items[0]);
            c.removeProduct(product.pid, quantity);
            db.put({TableName: "Carts", Item: c.toPlainObject()});
            return Response.json({ data: c });
        } else {
            return Response.json({error: "No such product in cart"}, { status: 404 });
        };
    } catch (err) {
        console.log(err);
        return Response.json({ error: 'No such product found' }, {status: 404})
    }
}