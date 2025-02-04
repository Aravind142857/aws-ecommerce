import { db } from "@/app/database/dynamoDB";

import { Cart, CartItem } from "@/app/types/cart";
import Product from "@/app/types/Product";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
export async function POST (request: Request) {
    console.log("POST request received");
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
        console.log("Before adding product:", c);
        if (res.Items && res.Items.length > 0) {
            console.log("Item in cart: ", res.Items[0]);
            c = Cart.fromDynamoItem(res.Items[0]);
        }
        console.log(product);
        c.addProduct(product, Number(quantity));
        console.log(c);
        const cartPlainObject = c.toPlainObject();
        db.put({TableName: "Carts", Item: cartPlainObject});
        return Response.json({ data: c });
        // } else {
        //     const update_params = {
        //         TableName: "Carts",
        //         Key: {
        //             user_id: user_id
        //         },
        //         UpdateExpression: `set items = ${}`,
        //         ExpressionAttributeValues: {
        //             ":i": [{product: product, quantity: quantity}]
        //         },
        //         ReturnValues: "UPDATED_NEW"
        //         }
        //     };
        //     const cart: Cart = Cart.fromDynamoItem(res.Items[0]);
        //     cart.addProduct(product, quantity);
        //     db.put({TableName: "Carts", Item: cart});
        //     return Response.json({ data: cart });
        // }
    } catch (err) {
    console.log(err);
    return Response.json({ error: 'No such product found' }, {status: 404})
    }
}