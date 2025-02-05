import { db } from "@/app/database/dynamoDB";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { NextRequest } from "next/server";
import {Cart} from "@/app/types/cart";
export async function GET (request: NextRequest) {
    const searchedParams = request.nextUrl.searchParams;
    const user_id: string | null = searchedParams.get('user_id');
    if (user_id) {
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
        if (!res.Items || res.Items.length == 0) {
          return Response.json({ message: 'No items in cart' }, {status: 200})
        }
        const cart: Cart = Cart.fromDynamoItem(res.Items[0]);
        return Response.json({ data: cart });
      } catch (err) {
        console.log(err);
        return Response.json({ error: 'Cart not found for user' }, {status: 404})
      }
    } else {
        return 
    }
  }