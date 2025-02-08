"use client"
import Product from "../types/Product"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
interface ProductListingProps {
    tag: string;
    searchTerm: string;
    filter: string;
}
// const allItems = [
//     new Product("iPad", "(10th Generation): with A14 Bionic chip, 10.9-inch Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Blue", "$700.00", "https://picsum.photos/seed/picsum/400/300", 4.5, 1000, "Technology"),
//     new Product("dress", "Women Mock Neck Ribbed Bodycon Dress Long Sleeve Mini Pencil Dresses ", "$89.49", "https://picsum.photos/seed/brady/400/300", 4.9, 3000, "Clothing"),
//     new Product("t-shirt", "Men's Cotton, Moisture-Wicking Crew Tee Undershirts, Multi-Packs Available", "$19.99", "https://picsum.photos/seed/kendrick/400/300", 3.8, 385, "Clothing"),
//     new Product("Pepsi", "Pepsi Soda, 7.5 Ounce Mini Cans, (10 Pack) (Packaging May Vary)", "$1.99", "https://picsum.photos/seed/mbappe/400/300", 4.2, 11536, "Food and Beverages"),
//     new Product("Dear Edward", "Dear Edward: A Read with Jenna Pick: A Novel", "$20.00", "https://picsum.photos/seed/phil/400/300", 4.9, 1004, "Books"),
//     new Product("Das Capital - Karl Marx", "Capital (Das Capital): Includes Vol.1,2,3", "$26.00", "https://picsum.photos/seed/diaz/400/300", 4.5, 1914, "Books"),
// ];

export const ProductListing: React.FC<ProductListingProps> = ({tag, searchTerm, filter}) => {
    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [sort, setSort] = useState<string | null>('');
    const router = useRouter();
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/allProducts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (!data) {
                return;
            }
            setItems(data.data);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchProductsByCategory = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/filteredProducts?category=${tag}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setItems(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchProductsByQuery = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/searchProducts?query=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setItems(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log('Fetching all products...')
        fetchProducts();
    }, []);

    useEffect(()=> {
        if (filter == "tag") {
            if (tag == "All") {
                fetchProducts();
            }
            else {
                fetchProductsByCategory();
            }
        }
    },[tag]);
    useEffect(()=> {
        if (filter == "search") {
            if (searchTerm ==  "") {
                fetchProducts();
            } else {
                fetchProductsByQuery();
            }
        }
    },[searchTerm]);
    const handleSort = (sortType: string) => {
        let sortedItems = [...items];
        switch (sortType) {
            case "priceAsc":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "priceDesc":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            case "ratingDesc":
                sortedItems.sort((a, b) => b.rating - a.rating);
                break;
            case "ratingAsc":
                sortedItems.sort((a, b) => a.rating - b.rating);
                break;
            default:
                break;
        }
        setItems(sortedItems);
    };
    useEffect(() => {
        handleSort(sort!);
    }, [sort]
    );
    return (
    <>
    <div className="flex justify-between">
        <h1 className="text-lg font-bold">{items.length} of {items.length} items</h1>
          <p className="text-xl">Showing {filter} products</p>
        {/* sortby */}
        <select
          className=" bg-transparent outline outline-2 outline-white px-2"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
          <option value="ratingDesc">Rating (Highest)</option>
          <option value="ratingAsc">Rating (Lowest)</option>
        </select>
        </div>
    {items.length == 0 && <p className="text-center mt-4 text-6xl w-full mx-auto px-auto">No Items match the filter</p>}
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-flow-row mx-auto ">
        {items.map((product, idx) => (
          <div key={idx} className="border-4 border-white p-2 m-0 w-full cursor-pointer" onClick={()=>router.push(`/products/${product.pid}`)}>
            <Image src={product.img.toString()} alt="Placeholder" width={400} height={300} className="m-auto "/>
            <h1 className="text-4xl text-center">{product.name}</h1>
            <h2 className="text-md text-center w-full line-clamp-1">{product.desc}</h2>
            <span className="flex justify-between"><p className="font-bold">${product.price}</p><p>{product.rating.toString()} / 5</p><p>{product.votes.toString()}</p></span>
            <p className="text-center text-lg">{product.category}</p>
          </div>
        ))}
      </div>
      </>
    )
}

// Set searchTerm to "" once a tag is clicked