"use client"
import { useEffect } from "react";

const ProfilePage:React.FC = () => {
    const name = "John";
    useEffect(() => {
        console.log("Profile Page");
        // Fetch user data from dynamoDB
        //  recent orders = filter orders by user_id
    }, [])
    return (
    <div className="w-full h-full bg-black text-white text-xl self-center">
        <main className="mx-[10%]">
            <h1 className="text-center text-4xl mb-16">Profile {name}</h1>
            <div id="profile-address" className=" w-1/2 h-64 mx-auto mb-2 bg-gradient-to-br from-slate-700 via-gray-500  to-slate-600 border-white border">
                <p className="relative top-1 left-1">Address</p>
            </div>
            <div id="profile-orders" className=" w-1/2 h-64 mx-auto mb-2 bg-gradient-to-br from-slate-700 via-gray-500  to-slate-600 border-white border">
                <p className="relative top-1 left-1">Recent orders</p>
            </div>
            <div id="profile-wishlist" className=" w-1/2 h-64 mx-auto mb-2 bg-gradient-to-br from-slate-700 via-gray-500  to-slate-600 border-white border">
                <p className="relative top-1 left-1">Your wishlist</p>
            </div>
        </main>
    </div>
    );
};
export default ProfilePage;