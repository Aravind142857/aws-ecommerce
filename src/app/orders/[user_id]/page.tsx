"use client"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import User from "@/app/types/User";
import { Order } from "@/app/types/recentOrders";
import Image from "next/image";

const Orders:React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<User|null>(null);
    const [recentOrders, setRecentOrders] = useState<Order[]|any[]>([]);
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
        fetch(`/api/getUser?user_id=${user_id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }
            return res.json();
        })
        .then(data => setUserData(data.data))
        .catch(err => console.error('Error: ', err));
        //  recent orders = filter orders by user_id
    }, [session, status, router]);
    
    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const response = await fetch(`/api/recentOrders/getRecentOrders?user_id=${params.user_id}&num_orders=${-1}`);
                if (!response.ok) {
                    console.error('Failed to fetch recent orders');
                }
                const data = await response.json();
                setRecentOrders(data.data);
            } catch (error) {
                console.error('Error fetching recent orders:', error);
            }
        };
        if (userData) {
            fetchRecentOrders();
        }
    }, [userData?.user_id]);
    if (!userData) return <div>Loading...</div>;
    return (
        <main className="w-full h-full px-[15%] py-[2%] space-y-8">
        <div className="w-full space-y-4">
            <h1 className="w-full text-center text-4xl">Orders</h1>
            <hr></hr>
        </div>
        {recentOrders.map((order:Order) => (
            <OrderCard key={order.order_id} order={order}/>
        ))}
        </main>
    )
}
interface OrderCardProps {
    order: Order;
}
const OrderCard: React.FC<OrderCardProps> = ({order}) => {
    return (
        <div className="w-full h-fit bg-fuchsia-200/30 z-[1] border border-white shadow-md shadow-white p-4 rounded-md">
            <div className="w-full flex justify-between my-2">
                <p className="top-1 left-1 relative">Order #{order.order_id}</p>
                <div className="flex flex-row">
                    <div className="flex flex-col mr-4">
                        <p className="">Order placed:</p>
                        <p className=" relative">{new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
                    </div>
                    <div className="flex flex-col mr-2">
                        {/* <p className="top-1 right-1 relative">Status: {order.status}</p> */}
                        <p className="">Total cost:</p>
                        <p className="relative self-end">${order.cart.total_price}</p>
                    </div>
                </div>
            </div>
            <hr className="my-4"></hr>
            <div className="text-center text-2xl space-y-4">
                {order.cart.items.map((item) => (
                <div key={item.product.pid} className="flex flex-row">
                    <div className="relative size-[300] w-fit">
                        <Image width="300" height="200" src={item.product.img} alt={item.product.name}/>
                        <div className="absolute z-[1] w-6 h-6 rounded-full outline outline-2 outline-white flex -bottom-3 -right-3 bg-slate-200 opacity-60">
                            <p className="text-sm m-auto text-opacity-100 text-black font-bold">{item.quantity}</p>
                        </div>
                    </div>
                    <div className="w-full px-6 space-y-4 flex flex-col justify-center">
                        <p>{item.product.name}</p>
                        <p className="text-lg">${item.product.price}</p>
                    </div>
                </div>
            ))}</div>
        </div>
    )

}
export default Orders;