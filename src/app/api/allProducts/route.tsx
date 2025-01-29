export const dynamic = 'force-static';
import Product from "@/app/types/Product";
import { db } from "../../database/dynamoDB";
import { NextRequest } from "next/server";
export async function GET (request: NextRequest) {
    try {
        const result = await db.scan({TableName: 'Products'});
        const items = result.Items;
        return Response.json({ data: items}, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}