import Product from "@/app/types/Product";
import { allItems } from "../products";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
    const searchedParams = request.nextUrl.searchParams;
    const filteredByCategory: string | null = searchedParams.get('category');
    if (filteredByCategory) {
      const filteredItems = allItems.filter((item) => item.category === filteredByCategory);
      console.log(filteredItems, filteredByCategory);
      const data = Product.toJSON(filteredItems);
      return Response.json({ data })
    }
  }