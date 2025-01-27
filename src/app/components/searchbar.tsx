import { ChangeEvent, useState, SetStateAction, Dispatch } from "react"
interface searchbarProps {
    setSearchTerm: Dispatch<SetStateAction<string>>;
}
export const SearchBar: React.FC<searchbarProps> = ({setSearchTerm}) => {
    const [query, setQuery] = useState<string>("");
    const handleSubmit = (event: {key: any}) => {
        if (event.key === "Enter") {
            console.log("Enter key pressed");
            if (query) {
                console.log(query);
                setSearchTerm(query);
            }
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