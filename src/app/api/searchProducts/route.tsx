import { NextRequest } from "next/server";
// import { allItems } from "../products";
import Product from "@/app/types/Product";
import { db } from "@/app/database/dynamoDB";
import { ScanCommand } from "@aws-sdk/client-dynamodb";

export async function GET (request: NextRequest) {
    const searchedParams = request.nextUrl.searchParams;
    const searchTerm: string | null = searchedParams.get('query');
    if (searchTerm) {
        const params = {
            "ExpressionAttributeNames": {
                "#name": "name",
                "#desc": "desc",
                "#lowercase_description": "lowercase_description"
            },
            "ExpressionAttributeValues": {
            ":searchTerm": {
            "S": `${searchTerm}`
            }
            },
            "FilterExpression": "contains(#name, :searchTerm) OR contains(#lowercase_description, :searchTerm) OR contains(#desc, :searchTerm)",
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


        // const filteredItems = allItems.filter((product: Product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.desc.toLowerCase().includes(searchTerm.toLowerCase()));



        // console.log("Filtered Items:", filteredItems);
        // return Response.json({ data: Product.toJSON(filteredItems) });
    } else {
        return;
    }
}