import { db } from "@/app/database/dynamoDB";
import { Cart, CartItem } from "@/app/types/cart";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
export async function POST (request: Request) {
    const body = await request.json();
    if (!body) {
        return Response.json({error: "No request body found"}, { status: 400 });
    }
    const {user_id, product, quantity} = body.user_id;
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
        if (res.Items) {
            c = Cart.fromDynamoItem(res.Items[0]);
        }
        c.addProduct(product, quantity);
        db.put({TableName: "Carts", Item: c});
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