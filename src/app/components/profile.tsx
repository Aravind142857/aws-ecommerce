import { IconContext } from "react-icons";
// import { CgProfile } from "react-icons/cg";
import { IoPersonCircle } from "react-icons/io5";

export const Profile = () => {
    return (
        <a href="./profile" className="p-1 rounded-md hover:bg-white hover:text-black cursor-pointer">
            <IoPersonCircle className="w-8 h-8 text-2xl"/>
        </a>
    );
}