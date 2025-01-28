import { ChangeEvent, useState, SetStateAction, Dispatch, useEffect } from "react"
interface searchbarProps {
    setSearchTerm: Dispatch<SetStateAction<string>>;
    setFilter: Dispatch<SetStateAction<string>>;
    reset: boolean;
    setReset: Dispatch<SetStateAction<boolean>>;
}
export const SearchBar: React.FC<searchbarProps> = ({setSearchTerm, setFilter, reset, setReset}) => {
    const [query, setQuery] = useState<string>("");
    useEffect(()=>{
        if (reset) {
            setQuery("");
            setReset(false);
        }
    }, [reset]);

    const handleSubmit = (event: {key: any}) => {
        if (event.key === "Enter") {
            console.log("Enter key pressed");
            // if (query) {
            console.log(query);
            setFilter("search");
            setSearchTerm(query);
        // }
        }
    }
    return (
        // <div id="searchbar" className="w-[50%] h-8 bg-white mb-2"></div>
        <div className=" w-[50%]">
            <input type="text"
            placeholder="Search"
            value={query??""}
            onChange={(e: ChangeEvent<HTMLInputElement>)=>setQuery(e.target.value)}
            onKeyDown={handleSubmit}
            className="w-full h-8 mb-2 text-black px-2"/>
        </div>
    )
}