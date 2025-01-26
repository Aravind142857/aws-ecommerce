import Product from "@/app/types/Product";
import { allItems } from "../products";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
    const searchedParams = request.nextUrl.searchParams;
    const pid: string | null = searchedParams.get('pid');
    if (pid) {
      const product = allItems.find((item:Product) => item.pid === pid);
      console.log(allItems);
      console.log(product, pid);
      if (product === undefined) {
        return Response.json({ error: 'No such product found' }, {status: 404})
      }
    //   const data = Product.toJSON(product);
      return Response.json({ data: product })
    } else {
        return 
    }
  }