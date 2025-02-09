"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import User from "@/app/types/User";
import { Order, RecentOrders } from "@/app/types/recentOrders";
import { Cart } from "@/app/types/cart";

const ProfilePage:React.FC = () => {
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
                const response = await fetch(`/api/recentOrders/getRecentOrders?user_id=${userData?.user_id}`);
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
        // Global CSS Applied
    <div className="w-full h-full bg-black text-white text-xl self-center">
        <main className="px-[10%] py-[2%]">
            <h1 className="text-center text-4xl mb-16">Profile: {(userData?.given_name??"") + " " + (userData?.family_name??"")}</h1>
            <div id="profile-address" className=" w-1/2 h-64 mx-auto my-2 p-2 bg-gradient-to-br from-slate-700 via-gray-500  to-slate-600 ring ring-slate-400 ring-offset-2 ring-offset-black shadow-[0px_0px_40px_10px_rgba(148,163,184,1)]">
                <p className="profile-label">Address</p>
                <div className="profile-content ">
                    <p className="text-center">{userData?.address??""}</p>
                </div>
                
            </div>
            <div id="profile-orders" className=" w-1/2 min-h-64 mx-auto my-2 p-2 bg-gradient-to-br from-slate-700 via-gray-500  to-slate-600 ring ring-slate-400 ring-offset-2 ring-offset-black shadow-[0px_0px_40px_10px_rgba(148,163,184,1)]">
                <p className="profile-label">Recent orders</p>
                <div className="profile-content flex flex-col">
                    {recentOrders.map((order:Order) => (
                        <div key={order.order_id}>
                            <p>{order.order_id}</p>
                            {order.cart.items.map((item) => (
                                <p key={item.product.pid}>{item.product.name}: {item.quantity} ({item.product.price})</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div id="profile-wishlist" className=" w-1/2 h-64 mx-auto my-2 p-2 bg-gradient-to-br from-slate-700 via-gray-500  to-slate-600 ring ring-slate-400 ring-offset-2 ring-offset-black shadow-[0px_0px_40px_10px_rgba(148,163,184,1)]">
                <p className="profile-label">Your wishlist</p>
                <div className="profile-content">

                </div>
            </div>
        </main>
    </div>
    );
};
export default ProfilePage;

// glow effect - https://notchtools.com/css-glow-generator