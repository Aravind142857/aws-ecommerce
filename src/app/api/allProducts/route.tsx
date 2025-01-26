export const dynamic = 'force-static';
import Product from "@/app/types/Product";
import { allItems } from "../products";
export async function GET() {
    const data = Product.toJSON(allItems);
    return Response.json({ data })
  }