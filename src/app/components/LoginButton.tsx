"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <p>Welcome, {session.user?.email}</p>
                <button onClick={() => signOut()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign out</button>
            </>
        );
    } else {
        return (
            <button onClick={() => signIn("cognito")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</button>
        );
    }
}