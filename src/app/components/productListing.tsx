"use client"
import Product from "../types/Product"
import Image from "next/image"
import { useEffect, useState } from "react"
interface ProductListingProps {
    tag: string
}
const allItems = [
    new Product("iPad", "(10th Generation): with A14 Bionic chip, 10.9-inch Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Blue", "$700.00", "https://picsum.photos/seed/picsum/400/300", 4.5, 1000, "Technology"),
    new Product("dress", "Women Mock Neck Ribbed Bodycon Dress Long Sleeve Mini Pencil Dresses ", "$89.49", "https://picsum.photos/seed/brady/400/300", 4.9, 3000, "Clothing"),
    new Product("t-shirt", "Men's Cotton, Moisture-Wicking Crew Tee Undershirts, Multi-Packs Available", "$19.99", "https://picsum.photos/seed/kendrick/400/300", 3.8, 385, "Clothing"),
    new Product("Pepsi", "Pepsi Soda, 7.5 Ounce Mini Cans, (10 Pack) (Packaging May Vary)", "$1.99", "https://picsum.photos/seed/mbappe/400/300", 4.2, 11536, "Food and Beverages"),
    new Product("Dear Edward", "Dear Edward: A Read with Jenna Pick: A Novel", "$20.00", "https://picsum.photos/seed/phil/400/300", 4.9, 1004, "Books"),
    new Product("Das Capital - Karl Marx", "Capital (Das Capital): Includes Vol.1,2,3", "$26.00", "https://picsum.photos/seed/diaz/400/300", 4.5, 1914, "Books"),
];

export const ProductListing: React.FC<ProductListingProps> = ({tag}) => {
    const [items, setItems] = useState<Product[]>(allItems);
    // function handleTag(tag: string) {
    //     switch (tag) {
    //         case "All":
    //             setItems(allItems);
    //             return;
    //         default:
    //             setItems(allItems.filter((p)=> p.category === tag));   
    //     }
    // }

    useEffect(()=> {
        if (tag == "All") {
            setItems(allItems);
        } else {
            setItems(allItems.filter((p)=> p.category === tag));
        }
        return () => {setItems(allItems)};
    },[tag]);

    

    return (
    <>
    {items.length == 0 && <p className="text-center mt-4 text-6xl w-full">No Items match the filter</p>}
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-flow-row ">
        {items.map((product, idx) => (
          <div key={idx} className="border-4 border-white p-2 m-2 w-full">
            <Image src={product.img.toString()} alt="Placeholder" width={400} height={300} className="m-auto "/>
            <h1 className="text-4xl text-center">{product.name}</h1>
            <h2 className="text-md text-center w-full line-clamp-1">{product.desc}</h2>
            <span className="flex justify-between"><p className="font-bold">{product.price}</p><p>{product.rating.toString()} / 5</p><p>{product.votes.toString()}</p></span>
            <p className="text-center text-lg">{product.category}</p>
          </div>
        ))}
      </div>
      </>
    )
}