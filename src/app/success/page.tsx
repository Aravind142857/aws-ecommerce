"use client"
import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Success() {
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status == "loading") return;
        if (!session) {
            router.push('/');
            return;
        }
    }, [status, session])
    useEffect(() => {
        const addCartToRecentOrders = async () => {
            try {
                const cartResponse = await fetch(`/api/Cart/getCart?user_id=${session?.user.id}`);
                if (!cartResponse.ok) {
                    console.error('Failed to fetch cart');
                    return;
                }
                const cartData = await cartResponse.json();
                if (!cartData.data || cartData.data.length == 0) {
                    console.log('No cart data found');
                    return;
                }
                console.log(cartData.data);
                // Assuming there's an API to add cart to recent orders
                const addOrderResponse = await fetch('/api/recentOrders/addToRecentOrders', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user_id: session?.user.id, cart: cartData.data})
                });
                if (!addOrderResponse.ok) {
                    console.error('Failed to add cart to recent orders');
                    return;
                }
                // Clear cart after adding to recent orders
                const clearCartResponse = await fetch('/api/Cart/clearCart', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user_id: session?.user.id})
                });
                if (!clearCartResponse.ok) {
                    console.error('Failed to clear cart');
                }
            } catch (error) {
                console.error('Error adding cart to recent orders or clearing cart:', error);
            }
        };

        addCartToRecentOrders();
    }, [session?.user.id]);
    return (
        <div className="w-screen h-screen overflow-hidden relative">
            <div className="bg-emerald-400 p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline outline-4 outline-neutral-200 rounded-lg space-y-4 z-[1] ">
            <h1 className="w-full text-center text-2xl text-white font-bold">Your payment was successful</h1>
            <div className="flex justify-between font-bold">
                <Link href="/" className="  text-blue-500 hover:underline">Home</Link>
                <Link href={`/cart/${session?.user.id}`} className=" text-blue-500 hover:underline">Back to cart</Link>
            </div>
            </div>
            <div className="z-0 bg-emerald-400 rounded-full w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-grow-bg"></div>
        </div>
    );
}