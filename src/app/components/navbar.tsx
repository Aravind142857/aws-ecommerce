import { Dispatch, SetStateAction } from "react"
interface navbarProps {
    setTag: Dispatch<SetStateAction<string>>
}
export const Navbar: React.FC<navbarProps> = ({setTag}) => {
    const links = ["All", "Technology", "Clothing", "Food and Beverages", "Books", "Drugs and Pharmaceuticals"];
    return (
        <div className="w-full p-2 border-2 border-white ">
            <div id="searchbar" className="w-full h-8 bg-white mb-2"></div>
            <div id="nav-items" className="flex justify-between">
                {links.map((url) => (
                    <button key={url} 
                    className="p-1 outline outline-2 outline-white rounded-md hover:bg-white hover:text-black"
                    onClick={()=> setTag(url)}>{url}</button>
                ))}
            </div>
        </div>
    );
};