import Product from "@/app/types/Product";
import { addProduct } from "../products";
import {v4 as uuidv4} from 'uuid';

/**
 * Process Post req to create Products of type 
 * {
 *  pid: string,
 *  name: string,
 *  desc: string,
 *  price: number,
 *  image: string,
 *  rating: number,
 *  votes: number,
 *  category: string}
 * @param request: NextRequest
 * @returns
 */
export async function POST (request: Request) {
    const formData = await request.formData();
    if (!formData) {
        return Response.json({error: "No request body found"}, { status: 400 });
    }
    const p: Product = new Product(
        // formData.get('pid') as string,
        uuidv4(),
        formData.get('name') as string,
        formData.get('desc') as string,
        formData.get('price') as string,
        formData.get('img') as string,
        Number(formData.get('rating')),
        Number(formData.get('votes')),
        formData.get('category') as string
    );
    console.log(p);
    // Add Product p to allItems
    addProduct(p);

    return Response.json({ data: p.pid }, { status: 201 });
}

// Use zod-form-data to format request based on types