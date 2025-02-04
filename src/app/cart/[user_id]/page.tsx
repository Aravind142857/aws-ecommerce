"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Cart } from "@/app/types/cart";

const CartPage:React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [cartData, setCartData] = useState<Cart|null>(null);
    const [message, setMessage] = useState<string|null>(null);
    useEffect(() => {
        if (status == "loading") return;
        if (!session) {
            router.push('/');
            return;
        }
        const user_id = params.user_id;
        if (user_id !== session.user.id ) {
            router.push('/');
            return;
        }
        fetch(`/api/Cart/getCart?user_id=${user_id}`)
        .then(res => res.json())
        .then(data => data.data?setCartData(data.data):setMessage(data.message));
        //  recent orders = filter orders by user_id
        console.log(cartData?.items);
    }, [session, status, router]);
    return (
        // Global CSS Applied
    <div className="w-full h-full bg-black text-white text-xl self-center">
        <main className="px-[5%] py-[2%]">
            <h1 className="text-center text-4xl mb-16">Cart: Hello</h1>

            {message && <p className="text-center text-2xl">{message}</p>}
            <div className="flex flex-row">
                <div className="flex-col">
            {cartData?.items?.map((item, index) => (
                <div className="flex w-full" key={index}>
                <div className=" w-2/3 h-64 mx-auto my-2 p-2 bg-gradient-to-br from-slate-700 via-gray-500  to-slate-600 ring ring-slate-400 ring-offset-2 ring-offset-black shadow-[0px_0px_40px_10px_rgba(148, 163, 184, 1)]">
                    <div className="w-full h-full flex ">
                        <Image width={200} height={150} src={item.product.img} alt={item.product.name}/>
                        <div className="profile-content flex-col p-2">
                            <p className="text-center text-3xl">{item.product.name}</p>
                            <p className="text-center text-sm">{item.product.desc}</p>
                            <p className="text-center">{item.product.price}</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 flex justify-center flex-col mx-auto">
                    <p className="text-center text-2xl">Quantity: {item.quantity}</p>
                    <p className="text-center text-2xl">Total: ${item.total_price}</p>
                </div>
                </div>
            ))}
            </div>
            <div className="w-1/4 h-fit bg-fuchsia-200/30 z-[1] border border-white shadow-md shadow-white p-4 rounded-md sticky top-8">
                <p className="text-center text-xl">Subtotal ({cartData?.total_quantity??0} items):</p>

                <p className="text-center text-2xl text-white font-bold">${cartData?.total_price??0}</p>
                {Number(cartData?.items?.length)>0 && <button className="w-full bg-amber-500 hover:bg-amber-500/50 text-white font-bold py-2 px-4 rounded">Checkout</button>}
            </div>
            </div>
        </main>
    </div>
    );
};
export default CartPage;

// glow effect - https://notchtools.com/css-glow-generator