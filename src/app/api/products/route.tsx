// export const dynamic = 'force-static';
import Product from "@/app/types/Product";
import { db } from "../../database/dynamoDB";
import { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { NextApiRequest } from "next";
export async function GET (request: NextRequest) {
    try {
        const url: NextURL = request.nextUrl;
        const searchParams = url.searchParams;
        const category = searchParams.get('category') || null;
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const page = parseInt(searchParams.get('page') || '1', 10);

        const totalResult = await db.scan({ TableName: 'Products' });
        const totalCount = totalResult.Items?.length??0;
        if (totalCount == 0) {
          return Response.json({ error: 'No such product found' }, {status: 404})
        }
        const lastEvaluatedKey = request.headers.get('x-last-evaluated-key') || null;
        console.log("last evaluated:",lastEvaluatedKey);
        const result = await db.scan({
            TableName: 'Products',
            Limit: limit,
            ExclusiveStartKey: lastEvaluatedKey ? { pid: lastEvaluatedKey } : undefined,
            FilterExpression: category ? 'category = :category' : undefined,
            ExpressionAttributeValues: category ? { ':category': { S: category } } : undefined
        });
        console.log(result); 
        const items = result.Items;
        const pageCount = Math.ceil(totalCount / limit);
        if (result.LastEvaluatedKey) {
            console.log("Set: ", result.LastEvaluatedKey.pid);
            request.headers.set('x-last-evaluated-key', result.LastEvaluatedKey.pid);
        }
        const metadata = {
            page: page,
            per_page: limit,
            page_count: pageCount,
            total_count: totalCount,
            Links: [
                { self: `/api/products?page=${page}&per_page=${limit}`},
                { first: `/api/products?page=1&per_page=${limit}`},
                { prev: page > 1 ? `/api/products?page=${page - 1}&per_page=${limit}` : null },
                { next: page < pageCount ? `/api/products?page=${page + 1}&per_page=${limit}` : null },
                { last: `/api/products?page=${pageCount}&per_page=${limit}`}
            ]
        }
        return Response.json({ data: items, _metadata: metadata }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
// Obtain the header x-last-evaluated-key and return it in the header of requests