"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
interface loginProps {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    setUser_id: React.Dispatch<React.SetStateAction<string>>
}
const LoginButton: React.FC<loginProps> = ({setUsername, setIsAuthenticated, setUser_id}) => {
    const { data: session } = useSession();
    useEffect(() => {
        if (session?.user?.email && session.user.given_name && session.user.family_name) {
            setUsername(session.user.given_name + ' ' + session.user.family_name);
            setIsAuthenticated(true);
            setUser_id(session.user.id as string);
            fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: session.user.id,
                    email: session.user.email,
                    address: session.user.address,
                    birthdate: session.user.birthdate,
                    given_name: session.user.given_name,
                    family_name: session.user.family_name,
                    created_at: new Date().toISOString()
                })
            })
        } else {
            setUsername('');
            setIsAuthenticated(false);
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