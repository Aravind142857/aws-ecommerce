"use client"
import { MouseEventHandler, useState } from "react";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import User from "@/app/types/User";
import { Order } from "@/app/types/recentOrders";
import Image from "next/image";
import Link from "next/link";

const StarRating: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
    const stars = [1, 2, 3, 4, 5];

    const getStarClass = (star: number) => {
        if (rating >= star) return 'text-yellow-500';
        return 'text-gray-300';
    };

    return (
        <div className="flex">
            {stars.map((star) => (
                <div
                    key={star}
                    className={`cursor-pointer text-2xl ${getStarClass(star)}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setRating(star)}
                    onMouseLeave={() => setRating(Math.floor(rating))}
                >
                    <span className="text-">{rating >= star - 0.5 ? '★' : '☆'}
                    </span>
                </div>
            ))}
        </div>
    );
};

const Orders:React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<User|null>(null);
    const [recentOrders, setRecentOrders] = useState<Order[]|any[]>([]);
    const [reviewMode, setReviewMode] = useState<{reviewing: boolean, productId: string|null}>({reviewing: false, productId: null});
    const [rating, setRating] = useState(4);

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
    const handleReviewSubmit: MouseEventHandler = async (e) => {
        e.preventDefault();
        const productId = reviewMode.productId;
        const newRating = rating;
        try {
            const response = await fetch('http://localhost:3000/api/setProductRating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, newRating }),
            });

            const result = await response.json();
            console.log(result);
            if (result.success) {
                console.log('Rating updated successfully');
                setReviewMode({ reviewing: false, productId: null });
            } else {
                console.error('Error updating rating:', result.error);
            }
        } catch (error) {
            console.error('Failed to submit rating:', error);
        }
    };
    if (!userData) return <div>Loading...</div>;
    return (
        <>
        <main className="w-full h-full px-[15%] py-[2%] space-y-8">
        <div className="w-full space-y-4">
            <h1 className="w-full text-center text-4xl">Orders</h1>
            <hr></hr>
        </div>
        {recentOrders.map((order:Order) => (
            <OrderCard key={order.order_id} order={order} setReviewMode={setReviewMode}/>
        ))}
        </main>
        {reviewMode.reviewing && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[2] text-white">
                <div className="max-h-[90%] min-h-[20%] bg-black/90 rounded-md flex flex-col justify-center items-center p-4 border-2 border-slate-500 space-y-3">
                    <h1 className="text-2xl">Leave a review for </h1>
                    <p>{reviewMode.productId} (Replace with product name)</p>
                    <form className="flex flex-col justify-center items-center">
                        <label htmlFor="rating">Rating</label>
                        <StarRating rating={rating} setRating={setRating} />
                        <input type="hidden" name="rating" value={rating} />
                        <label htmlFor="review">Review</label>
                        <textarea name="review" id="review" defaultValue="This is a great product!" className="resize-y text-black px-2 min-h-[50px] max-h-[200px] overflow-y-auto"/>
                        <button onClick={(e) => handleReviewSubmit(e)} type="submit" className="mt-6 p-1 rounded-lg outline outline-2 outline-white hover:bg-white hover:text-black">Submit</button>
                    </form>
                    <button onClick={()=>setReviewMode({reviewing: false, productId: null})} className="p-1 rounded-lg outline outline-2 outline-white hover:bg-white hover:text-black ">Close</button>
                </div>
            </div>
        )}
        </>
    )
}
interface OrderCardProps {
    order: Order;
    setReviewMode: React.Dispatch<React.SetStateAction<{reviewing: boolean, productId: string | null}>>;
}
const OrderCard: React.FC<OrderCardProps> = ({order, setReviewMode}) => {
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
                <div key={item.product.pid} className="flex flex-row w-full ">
                    <div className="relative size-[300] w-fit">
                        <Image width="300" height="200" src={item.product.img} alt={item.product.name}/>
                        <div className="absolute z-[1] w-6 h-6 rounded-full outline outline-2 outline-white flex -bottom-3 -right-3 bg-slate-200 opacity-60">
                            <p className="text-sm m-auto text-opacity-100 text-black font-bold">{item.quantity}</p>
                        </div>
                    </div>
                    <div className="w-1/2 px-6 space-y-4 flex flex-col justify-center">
                        <p>{item.product.name}</p>
                        <p className="text-lg">${item.product.price}</p>
                    </div>
                    <div className="w-fit mr-0 flex justify-center items-center">
                        <button onClick={()=>setReviewMode({reviewing: true, productId: item.product.pid})}
                        className="text-center text-lg w-fit h-fit p-1 rounded-lg outline-white outline outline-2 hover:bg-slate-200 hover:opacity-60 hover:text-black" >Leave a review</button>
                    </div>
                </div>
            ))}</div>
        </div>
    )

}
export default Orders;

// Allow submitting of reviews.
// Set leave a review for to product name