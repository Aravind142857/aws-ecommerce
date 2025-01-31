"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
interface loginProps {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}
const LoginButton: React.FC<loginProps> = ({setUsername}) => {
    const { data: session } = useSession();
    useEffect(() => {
        if (session?.user?.email) {
            setUsername(session.user.email);
        }
    }, [session])
    if (session) {
        return (
            <>
                <button onClick={() => signOut()}
                className="bg-blue-500 hover:bg-blue-700 text-white text-md font-bold p-1 rounded">Sign out</button>
            </>
        );
    } else {
        return (
            <button onClick={() => signIn("cognito")}
            className="bg-blue-500 hover:bg-blue-700 text-white text-md font-bold p-1 rounded">Sign in</button>
        );
    }
}
export default LoginButton;