import { Dispatch, SetStateAction, useState } from "react"
import { SearchBar } from "./searchbar";
import Profile from "./profile";
import { Logo } from "./logo";
import { IoMdAdd } from "react-icons/io";
import LoginButton from "./LoginButton";
import Cart from "./cart";

interface navbarProps {
    setTag: Dispatch<SetStateAction<string>>;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    setFilter: Dispatch<SetStateAction<string>>;
    setCreateMode: Dispatch<SetStateAction<boolean>>;
}
export const Navbar: React.FC<navbarProps> = ({setTag, setSearchTerm, setFilter, setCreateMode}) => {
    const links = ["All", "Technology", "Clothing", "Food and Beverages", "Books", "Drugs and Pharmaceuticals"];
    const [reset, setReset] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user_id, setUser_id] = useState<string>('');
    return (
        <div className="w-full p-2 border-2 border-white mx-auto">
            <div id="row1" className="w-full flex justify-between mb-2">
                <Logo />
                <SearchBar setSearchTerm={setSearchTerm} setFilter={setFilter} reset={reset} setReset={setReset}/>
                <div className="flex justify-end">
                    <div>
                    <button className="p-1 rounded-md hover:bg-white hover:text-black cursor-pointer" onClick={()=>{
                        console.log("Create MODE");
                        setCreateMode(true);
                        }}>
                        <IoMdAdd className="text-2xl w-8 h-8" />
                        
                    </button>
                    {/* <span className="">Add product to database</span> */}
                    </div>
                    <Cart username={username} isAuthenticated={isAuthenticated} user_id={user_id}/>
                    <LoginButton setUsername={setUsername} setIsAuthenticated={setIsAuthenticated} setUser_id={setUser_id}/>
                    <Profile username={username} isAuthenticated={isAuthenticated} user_id={user_id}/>
                </div>
            </div>
            <div id="nav-items" className="flex justify-between">
                {links.map((url) => (
                    <button key={url} 
                    className="p-1 outline outline-2 outline-white rounded-md hover:bg-white hover:text-black"
                    onClick={()=> {
                        setFilter("tag");
                        setReset(true);
                        setTag(url);
                        setSearchTerm("");
                    }}>{url}</button>
                ))}
            </div>
        </div>
    );
};

// indigo-400, orange-400, sky-400, violet-400/purple-400, bg-lime-400/75, bg-white