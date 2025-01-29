import Product from "@/app/types/Product";
import { NextRequest } from "next/server";
import { db } from "@/app/database/dynamoDB";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
export async function GET(request: NextRequest) {
    const searchedParams = request.nextUrl.searchParams;
    const pid: string | null = searchedParams.get('pid');
    if (pid) {
      const params = {
        "ExpressionAttributeValues": {
        ":v1": {
        "S": `${pid}`
        }
        },
        "KeyConditionExpression": "pid = :v1",
        "TableName": "Products"
      };
      try {
        const res = await db.send(new QueryCommand(params));
        if (!res.Items) {
          return Response.json({ error: 'No such product found' }, {status: 404})
        }
        const product: Product = Product.fromDynamoItem(res.Items[0]);  
        return Response.json({ data: product });
      } catch (err) {
        console.log(err);
        return Response.json({ error: 'No such product found' }, {status: 404})
      }
    } else {
        return 
    }
  }