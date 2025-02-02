import { NextRequest } from "next/server";
import { db } from "@/app/database/dynamoDB";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import User from "@/app/types/User";
export async function GET(request: NextRequest) {
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
        "TableName": "Users"
      };
      try {
        const res = await db.send(new QueryCommand(params));
        if (!res.Items) {
          return Response.json({ error: 'No such product found' }, {status: 404})
        }
        const user: User = User.fromDynamoItem(res.Items[0]);  
        return Response.json({ data: user });
      } catch (err) {
        console.log(err);
        return Response.json({ error: 'No such product found' }, {status: 404})
      }
    } else {
        return 
    }
  }