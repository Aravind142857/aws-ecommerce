"use client"
import { Dispatch, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Cart, CartItem } from "@/app/types/cart";
import { MdAdd, MdRemove, MdDelete } from "react-icons/md";
import CheckoutButton from "@/app/components/CheckoutButton";

const QtyBar:React.FC<{item: CartItem, setStaleData: Dispatch<boolean>}> = ({item, setStaleData}) => {
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const { data: session, status } = useSession();
    const router = useRouter();
    const handleIncrement = () => {
        if (!session) {
            router.push("/");
            return;
        }
        fetch('/api/Cart/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: session.user.id,
                product: item.product,
                quantity: 1
            })
        }).then((res) => {
            if (res.ok) {
                setStaleData(true);
                console.log("Product added to cart");
                return;
            } else {
                console.log("Error adding product to cart");
            }
        }).catch((err) => {
            console.log(err);
        })
        setQuantity(quantity + 1);
    }
    const handleDecrement = (n: number = 1) => {
        if (!session) {
            router.push("/");
            return;
        }
        fetch('/api/Cart/removeFromCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: session.user.id,
                product: item.product,
                quantity: n
            })
        }).then((res) => {
            if (res.ok) {
                setStaleData(true);
                console.log("Product removed from cart");
                return;
            } else {
                console.log("Error removing product from cart");
            }
        }).catch((err) => {
            console.log(err);
        })
        setQuantity(quantity - 1);
    }
    return (
        <div className="w-1/3 flex justify-center flex-col mx-auto space-y-2">
            <div className="self-center mx-auto ">
                <div className="rounded-full w-fit p-2 border-4 border-amber-500 flex flex-row text-2xl">
                    <button className="w-10 h-8  text-white" onClick={()=>{handleDecrement(1)}}>
                        {(quantity > 1)?<MdRemove className="m-auto"/>:<MdDelete className="m-auto text-red-500"/>}</button>
                    <div className="w-10 h-8 text-white text-center">{item.quantity}</div>
                    <button className="w-10 h-8  text-white" onClick={handleIncrement}><MdAdd className="m-auto"/></button>
                </div>
            </div>
            <p className="text-center text-2xl">Total: ${item.total_price}</p>
            <button className="mx-auto text-lg text-red-500" onClick={()=>handleDecrement(item.quantity)}>Remove</button>
        </div>
    )
}

const CartPage:React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [cartData, setCartData] = useState<Cart|null>(null);
    const [message, setMessage] = useState<string|null>(null);
    const [staleData, setStaleData] = useState<boolean>(true);
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
        .then((data: { data?: Cart; message?: string }) => {
            if (data.data) {
                setCartData(data.data);
                setStaleData(false);
            } else {
                setMessage(data.message??"");
            }
        });
        //  recent orders = filter orders by user_id
    }, [session, status, router, staleData]);
    return (
        // Global CSS Applied
    <div className="w-full h-full bg-black text-white text-xl self-center">
        <main className="px-[5%] py-[2%]">
            <h1 className="text-center text-4xl mb-16">Cart: Hello</h1>

            {message && <p className="text-center text-2xl">{message}</p>}
            <div className="flex flex-row">
                <div className="flex-col w-full">
            {cartData?.items?.map((item, index) => (
                <div className="flex w-full" key={index}>
                <div className=" w-2/3 h-64 mx-auto my-2 p-2 bg-gradient-to-br from-slate-700 via-gray-500  to-slate-600 ring ring-slate-400 ring-offset-2 ring-offset-black shadow-[0px_0px_40px_10px_rgba(148, 163, 184, 1)]">
                    <div className="w-full h-full flex ">
                        <Image width={200} height={150} src={item.product.img} alt={item.product.name}/>
                        <div className="profile-content flex-col p-2">
                            <p className="text-center text-3xl">{item.product.name}</p>
                            <p className="text-center text-sm">{item.product.desc}</p>
                            <p className="text-center">${item.product.price}</p>
                        </div>
                    </div>
                </div>
                <QtyBar item={item} setStaleData={setStaleData}/>
                </div>
            ))}
            </div>
            <div className="w-1/4 h-fit bg-fuchsia-200/30 z-[1] border border-white shadow-md shadow-white p-4 rounded-md sticky top-8">
                <p className="text-center text-xl">Subtotal ({cartData?.total_quantity??0} items):</p>

                <p className="text-center text-2xl text-white font-bold">${cartData?.total_price??0}</p>
                {Number(cartData?.items?.length)>0 && <CheckoutButton items={cartData?.items}/>}
            </div>
            </div>
        </main>
    </div>
    );
};
export default CartPage;

// glow effect - https://notchtools.com/css-glow-generator