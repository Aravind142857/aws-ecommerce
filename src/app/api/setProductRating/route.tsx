import { NextRequest } from "next/server";
import { db } from "@/app/database/dynamoDB";
import {  UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import Product from "@/app/types/Product";

export async function POST(request: NextRequest) {
    const { productId, newRating } = await request.json();
    console.log("Entered handling ", productId);
    if (!productId || newRating === undefined) {
        return Response.json({ error: 'Product ID and rating are required' }, { status: 400 });
    }
    const params = {
        TableName: "Products",
        KeyConditionExpression: "pid = :v1",
        ExpressionAttributeValues: {
            ":v1": { S: String(productId) }
        },
    };

    try {
        const res = await db.send(new QueryCommand(params))
        if (!res.Items) {
            return Response.json({ error: 'No such product found' }, {status: 404})
          }
        const product: Product = Product.fromDynamoItem(res.Items[0]);
        console.log("Updating votes from ", product.votes);
        console.log("Updating rating from ", product.rating);
        console.log("Updating votes by ", 1);
        console.log("Updating rating by ", Number(newRating));
        const new_votes = product.votes + 1;
        const new_rating = product.rating + Number(newRating);

        const updateParams = {
            TableName: "Products",
            Key: {
                pid: productId,
            },
            UpdateExpression: "set rating = :r, votes = :v",
            ExpressionAttributeValues: {
                ":r": new_rating,
                ":v": new_votes,
            },
        };
        
        await db.send(new UpdateCommand(updateParams));

        return Response.json({ success: true, message: 'Rating updated successfully' });
    } catch (err) {
        console.error('Error updating product rating:', err);
        return Response.json({ error: 'Failed to update rating' }, { status: 500 });
    }
}
