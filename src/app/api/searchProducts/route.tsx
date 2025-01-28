import { NextRequest } from "next/server";
import { allItems } from "../products";
import Product from "@/app/types/Product";

export async function GET (request: NextRequest) {
    const searchedParams = request.nextUrl.searchParams;
    const searchTerm: string | null = searchedParams.get('query');
    console.log("Search Request:",searchTerm);
    if (searchTerm) {
        const filteredItems = allItems.filter((product: Product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.desc.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log("Filtered Items:", filteredItems);
        return Response.json({ data: Product.toJSON(filteredItems) });
    } else {
        return Response.json({ data: Product.toJSON(allItems) });
    }
}