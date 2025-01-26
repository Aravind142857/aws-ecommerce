"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Product from "@/app/types/Product";
import Image from "next/image";
const ProductPage = () => {
    const params = useParams();
    const [product, setProduct] = useState<Product|null>(null);
    const pid = params.pid;
    console.log(pid);
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
    return (
        <>
        <main className="px-[10%] py-[3%] w-full h-full flex">
            <div className="w-[30%] p-2">
                <Image src={product.img} alt={product.name} width={400} height={300} className="w-full"/>
            </div>
            <div className="w-[50%] p-4 text-center">
                <h1 className="text-4xl">{product.name}</h1>
                <h2 className="text-3xl">{product.desc}</h2>
                <h3 className="text-xl py-10">{product.price}</h3>
                
            </div>
            <div className="w-[20%] py-16 px-8 bg-slate-700 text-lg text-center flex flex-col justify-end">
                <p>Cart options</p>
                <p>Buy now</p>
                <p>Also consider buying...</p>
            </div>
            
        </main>
        </>
    );
};
export default ProductPage;