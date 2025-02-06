import Link from "next/link";
export default function Cancel() {
    return (
        <div className="w-full space-y-4">
            <h1>Your payment was canceled. Please try again.</h1>
            <div>
                <Link href="/" className=" outline outline-2 outline-white text-blue-500 hover:underline">Home</Link>
                <Link href="/cart" className="outline outline-2 outline-white text-blue-500 hover:underline">Back to cart</Link>
            </div>
        </div>
    );
}