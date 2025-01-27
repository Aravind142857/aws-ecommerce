import { NextRequest } from "next/server";
import { allItems } from "../products";
import Product from "@/app/types/Product";

export async function GET (request: NextRequest) {
    const searchedParams = request.nextUrl.searchParams;
    const searchTerm: string | null = searchedParams.get('query');
    console.log(searchTerm);
    if (searchTerm) {
        const filteredItems = allItems.filter((product: Product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.desc.toLowerCase().includes(searchTerm.toLowerCase()));
        return Response.json({ data: filteredItems });
    } else {
        return Response.json({ data: allItems });
    }
}