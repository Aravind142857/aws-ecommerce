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
        const next_process_key = searchParams.get('next_process_key') || undefined;
        console.log("next process key", next_process_key);
        const totalResult = await db.scan({ TableName: 'Products' });
        const totalCount = totalResult.Items?.length??0;
        if (totalCount == 0) {
          return Response.json({ error: 'No such product found' }, {status: 404})
        }
        // const lastEvaluatedKey = request.headers.get('x-last-evaluated-key') || null;
        console.log("last evaluated:",next_process_key);
        const result = await db.scan({
            TableName: 'Products',
            Limit: limit,
            ExclusiveStartKey: next_process_key ? { pid: next_process_key } : undefined,
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
        console.log('Next Evaluated key', result.LastEvaluatedKey);
        const metadata = {
            page: page,
            per_page: limit,
            page_count: pageCount,
            total_count: totalCount,
            lastEvaluatedKey: result.LastEvaluatedKey ? result.LastEvaluatedKey.pid : null,
            Links: [
                { self: `/api/products?page=${page}&limit=${limit}${next_process_key?('&next_process_key=' + next_process_key):''}`},
                // { first: `/api/products?page=1&per_page=${limit}`},
                { prev: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}&next_process_key=${result.LastEvaluatedKey?.pid??null}` : null },
                { next: page < pageCount ? `/api/products?page=${page + 1}&limit=${limit}&next_process_key=${result.LastEvaluatedKey?.pid??null}` : null },
                // { last: `/api/products?page=${pageCount}&per_page=${limit}&next_process_key=${result.LastEvaluatedKey?.pid??null}`}
            ]
        }
        return Response.json({ data: items, _metadata: metadata }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
// Obtain the header x-last-evaluated-key and return it in the header of requests
//  How to pass next prev first, last 
//  Change from searchParam to header: prevKey (currKey from prev header), currKey(nextKey from prev header), nextKey (curr.result.LastEvaluatedKey)