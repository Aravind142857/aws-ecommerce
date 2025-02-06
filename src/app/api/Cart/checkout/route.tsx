import { CartItem } from "@/app/types/cart";
import { NextRequest } from "next/server";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
});
export async function POST(request: NextRequest) {
    if (request.method == 'POST') {
        try {
            console.log(request.body);
            const body = await request.json();
            const { items }: { items: CartItem[] } = body;
            console.log(items);
            const line_items = items.map((item: CartItem) => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.product.name,
                            description: item.product.desc,
                            images: [item.product.img]
                        },
                        unit_amount: item.product.price * 100,
                    },
                    quantity: item.quantity
            }));
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: line_items,
                mode: 'payment',
                success_url: `${process.env.HOST}/success`,
                cancel_url: `${process.env.HOST}/cancel`

            });
            return Response.json({ idid: session.id }, { status: 200});
        } catch (error: any) {
            console.log(error);
            return Response.json({ error: error }, { status: 500});
        }
    } else {
        return Response.json({ error: 'Method not allowed' }, { status: 405});
    }
}