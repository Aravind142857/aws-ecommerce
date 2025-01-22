"use client"
import Product from "../types/Product"
import Image from "next/image"
import { useEffect, useState } from "react"
interface ProductListingProps {
    tag: string
}
const allItems = [
    new Product("iPad", "$700.00", "https://picsum.photos/seed/picsum/400/300", 4.5, 1000, "Technology"),
    new Product("dress", "$89.49", "https://picsum.photos/seed/brady/400/300", 4.9, 3000, "Clothing"),
    new Product("t-shirt", "$19.99", "https://picsum.photos/seed/kendrick/400/300", 3.8, 385, "Clothing"),
    new Product("Pepsi", "$1.99", "https://picsum.photos/seed/mbappe/400/300", 4.2, 11536, "Food and Beverages"),
    new Product("Dear Eddie", "$20.00", "https://picsum.photos/seed/phil/400/300", 4.9, 1004, "Books"),
    new Product("Das Capital - Karl Marx", "$26.00", "https://picsum.photos/seed/diaz/400/300", 4.5, 1914, "Books"),
];

export const ProductListing: React.FC<ProductListingProps> = ({tag}) => {
    const [items, setItems] = useState<Product[]>(allItems);
    function handleTag(tag: string) {
        switch (tag) {
            case "All":
                setItems(allItems);
                return;
            default:
                setItems(allItems.filter((p)=> p.category === tag));   
        }
    }
    useEffect(()=> {
        handleTag(tag);
        return () => {setItems(allItems)};
    },[tag, handleTag]);

    

    return (
    <>
    {items.length == 0 && <p className="text-center mt-4 text-6xl w-full">No Items match the filter</p>}
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-flow-row ">
        {items.map((product, idx) => (
          <div key={idx} className="border-4 border-white p-2 m-2">
            <Image src={product.img.toString()} alt="Placeholder" width={400} height={300}/>
            <h1 className="text-4xl text-center">{product.name}</h1>
            <span className="flex justify-between"><p className="font-bold">{product.price}</p><p>{product.rating.toString()} / 5</p><p>{product.votes.toString()}</p></span>
            <p className="text-center">{product.category}</p>
          </div>
        ))}
      </div>
      </>
    )
}