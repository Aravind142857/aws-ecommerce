"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Product from "@/app/types/Product";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProductPage = () => {
    const params = useParams();
    const [product, setProduct] = useState<Product|null>(null);
    const pid = params.pid;
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        const fetchProduct:{():Promise<void>} = async () => {
            const response = await fetch(`http://localhost:3000/api/productByID?pid=${pid}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProduct(data.data);
        };
        if (pid) {
            fetchProduct();
        }
    }, [pid]);
    if (!product) {
        return <div>Loading...</div>;
    }
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const quantity = target.elements.namedItem('quantity') as HTMLInputElement;
        const quantityValue = quantity.value;
        if (!session) {
            router.push("/");
            return;
        }
        fetch(`/api/Cart/addToCart`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: session.user.id,
                product: product,
                quantity: quantityValue
            })
        }).then((res) => {
            if (res.ok) {
                console.log("Product added to cart");
                router.push("/");
                return;
            } else {
                console.log("Error adding product to cart");
            }
        }).catch((err) => {
            console.log(err);
        });
    };


    return (
        <>
        <main className="px-[10%] py-[3%] w-full h-full flex">
            <div className="w-[30%] p-2">
                <Image src={product.img} alt={product.name} width={400} height={300} className="w-full"/>
            </div>
            <div className="w-[50%] p-4 text-center">
                <h1 className="text-4xl">{product.name}</h1>
                <h2 className="text-3xl">{product.desc}</h2>
                <h3 className="text-xl py-10">${product.price}</h3>
                
            </div>
            <div className="w-[20%] py-16 px-8 bg-slate-700 text-lg text-center flex flex-col justify-end">
                <form className="" onSubmit={handleFormSubmit}>
                    <label htmlFor="quantity" className="p-1" >Quantity</label>
                    <input type="number" id="quantity" name="quantity" className=" w-32 p-1 border border-1 bg-transparent text-white border-black shadow-md shadow-black"></input>
                    <button type="submit" className="p-1 border border-1 border-black shadow-md shadow-black hover:bg-slate-500 ">Add to Cart</button>

                </form>

                <p>Buy now</p>
                <p>Also consider buying...</p>
            </div>
            
        </main>
        </>
    );
};
export default ProductPage;