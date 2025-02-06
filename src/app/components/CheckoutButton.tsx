import { useState } from "react";
import { CartItem } from "../types/cart";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const CheckoutButton: React.FC<{items: CartItem[] | undefined}> = ({items}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleCheckout = async () => {
        if (!items) return;
        setIsLoading(true);
        const stripe = await stripePromise;
        console.log("Checking out ...", items);
        const res = await fetch('/api/Cart/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: items
            })
        }).then((res) => res.json());
        console.log(res);
        const { idid } = res;
       const error = await stripe?.redirectToCheckout({
            sessionId: idid
        });
        if (error?.error) {
            console.error(error.error);
        }
        setIsLoading(false);
    }
    return (
        <button
        disabled={isLoading}
        onClick={handleCheckout}
        className="w-full bg-amber-500 hover:bg-amber-500/50 text-white font-bold py-2 px-4 rounded"
        >
            {isLoading? 'Loading...':'Checkout'}
        </button>
    )

}
export default CheckoutButton;