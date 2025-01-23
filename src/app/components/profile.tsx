import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";

export const Profile = () => {
    return (
        <div className="w-8 h-8">
            <IconContext.Provider value={{size: "2em"}}>
                <CgProfile />
            </IconContext.Provider>
        </div>
    );
}