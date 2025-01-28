import { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from "react"
import { IoMdClose } from "react-icons/io";

interface CreateProductFormProps {
    setCreateMode: Dispatch<SetStateAction<boolean>>;
}
export const CreateProductForm:React.FC<CreateProductFormProps> = ({setCreateMode}) => {

    const formRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (formRef.current && !(formRef.current as HTMLElement).contains(event.target as Node)) {
                console.log("Clicked outside");
                setCreateMode(false);
                event.stopPropagation();
            }
        }
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setCreateMode])
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const response = await fetch(`/api/createProduct`, {method: 'POST', body: formData});
            if (response.status != 201) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data, data.data);
            setCreateMode(false);
            console.log("Created product with id:", data.data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            window.location.reload();
        }
    }
    return (
        <div className={"fixed top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-transparent backdrop-blur-md ease-in-out transition"}>
        <div ref={formRef} className="p-4 text-xl fixed z-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-500 shadow-lg shadow-black rounded-lg">
            <div className="flex justify-between">
                <h1 className="font-bold">Create Product</h1>
                <button className="hover:bg-white hover:text-black rounded-full p-1" onClick={()=>setCreateMode(false)}><IoMdClose /></button>
            </div>
            <form action="/api/createProduct" method="post" className="flex flex-col" onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" defaultValue="Protein bar" className="border-2 border-black text-black px-2"/>
                <label htmlFor="desc">Description</label>
                <input type="text" name="desc" id="desc" defaultValue="Think! high protein (Brownie Crunch)" className="border-2 border-black text-black px-2"/>
                <label htmlFor="price">Price</label>
                <input type="text" name="price" id="price" defaultValue="$2.99" className="border-2 border-black text-black px-2"/>
                <label htmlFor="img">Image</label>
                <input type="text" name="img" id="img" defaultValue="https://picsum.photos/seed/thinkbrowniecrunch/400/300" className="border-2 border-black text-black px-2"/>
                <label htmlFor="rating">Rating</label>
                <input type="number" step="0.1" name="rating" id="rating" defaultValue="4.2" className="border-2 border-black text-black px-2"/>
                <label htmlFor="votes">Votes</label>
                <input type="number" name="votes" id="votes" defaultValue="876" className="border-2 border-black text-black px-2"/>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" id="category" defaultValue="Food and Beverages" className="border-2 border-black text-black px-2"/>
                {/* <label htmlFor="tag">Tag</label>
                <input type="text" name="tag" id="tag" className="border-2 border-black text-black px-2"/> */}
                {/* <label htmlFor="stock">Stock</label> */}
                {/* <input type="text" name="stock" id="stock" className="border-2 border-black text-black px-2"/> */}
                <button type="submit" className="border-2 border-black">Submit</button>
            </form>
        </div>
        </div>
    )

}

// Not displaying on screen