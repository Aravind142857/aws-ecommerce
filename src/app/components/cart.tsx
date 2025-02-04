import { IoCart, IoPersonCircle } from "react-icons/io5";

interface cartProps {
    username: string;
    isAuthenticated: boolean;
    user_id: string;
}
const Cart: React.FC<cartProps> = ({username, isAuthenticated, user_id}) => {
    return (
        <a href={isAuthenticated?`./cart/${user_id}`:"/."} className="p-1 rounded-md hover:bg-white hover:text-black cursor-pointer self-center">
            <IoCart className="text-2xl w-8 h-8" />
        </a>
    );
}
export default Cart;