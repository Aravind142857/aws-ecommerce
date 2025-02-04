"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import User from "@/app/types/User";

const ProfilePage:React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<User|null>(null);
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
        .then(res => res.json())
        .then(data => setUserData(data.data));
        //  recent orders = filter orders by user_id
    }, [session, status, router]);
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
            <div id="profile-orders" className=" w-1/2 h-64 mx-auto my-2 p-2 bg-gradient-to-br from-slate-700 via-gray-500  to-slate-600 ring ring-slate-400 ring-offset-2 ring-offset-black shadow-[0px_0px_40px_10px_rgba(148,163,184,1)]">
                <p className="profile-label">Recent orders</p>
                <div className="profile-content">
                    
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