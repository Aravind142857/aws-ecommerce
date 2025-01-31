import { IoPersonCircle } from "react-icons/io5";

interface profileProps {
    username: string;
}
const Profile: React.FC<profileProps> = ({username}) => {
    return (
        <a href="./profile" className="p-1 rounded-md hover:bg-white hover:text-black cursor-pointer self-center">
            {username?(
            <div className="w-[32px] h-[32px] rounded-full bg-slate-200 self-center">
                <h1 className=" h-full w-full text-2xl font-bold text-black text-center">{username.charAt(0).toUpperCase()}</h1>
            </div>
            )
            :
            <IoPersonCircle className="w-10 h-10 text-2xl"/>
            }
        </a>
    );
}
export default Profile;