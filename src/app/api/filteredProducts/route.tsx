import Product from "@/app/types/Product";
// import { allItems } from "../products";
import { db } from '@/app/database/dynamoDB';
import { NextRequest } from "next/server";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
export async function GET(request: NextRequest) {
    const searchedParams = request.nextUrl.searchParams;
    const filteredByCategory: string | null = searchedParams.get('category');
    if (filteredByCategory) {
      const params = {
        "ExpressionAttributeValues": {
        ":v1": {
        "S": `${filteredByCategory}`
        }
        },
        "FilterExpression": "category = :v1",
        "TableName": "Products"
      };

      try {
        const res = await db.send(new ScanCommand(params));
        if (!res.Items) {
          return Response.json({ error: 'No such product found' }, {status: 404})
        }
        const products: Product[] = Product.fromDynamoItems(res.Items);
        return Response.json({ data: products });
      } catch (err) {
        console.log(err);
        return Response.json({ error: 'No such product found' }, {status: 404})
      }
    }
  }