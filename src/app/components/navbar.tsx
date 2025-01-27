import { Dispatch, SetStateAction } from "react"
import { SearchBar } from "./searchbar";
import { Profile } from "./profile";
import { Logo } from "./logo";

interface navbarProps {
    setTag: Dispatch<SetStateAction<string>>;
    setSearchTerm: Dispatch<SetStateAction<string>>;
}
export const Navbar: React.FC<navbarProps> = ({setTag, setSearchTerm}) => {
    const links = ["All", "Technology", "Clothing", "Food and Beverages", "Books", "Drugs and Pharmaceuticals"];
    return (
        <div className="w-full p-2 border-2 border-white ">
            <div id="row1" className="w-full flex justify-between mb-2">
                <Logo />
                <SearchBar setSearchTerm={setSearchTerm}/>
                <Profile />
            </div>
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

// indigo-400, orange-400, sky-400, violet-400/purple-400, bg-lime-400/75, bg-white