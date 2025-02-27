import { useRouter } from "next/navigation";
import React from "react";
import { cleanSubscribeUserInfo } from "./Action";
import { useDispatch } from "react-redux";

const SubscriptionFailed = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const [counter, setCounter] = React.useState<number>(5);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, 1000);

        if (counter === 1) {
            cleanSubscribeUserInfo(dispatch);
            router.push("/signin");
        }
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-red-100">
                <div className="p-8 bg-white shadow-lg rounded-lg text-center">
                    <h1 className="text-2xl font-bold text-red-600">Payment Failed!</h1>
                    <p className="mt-2 text-gray-600">Something went wrong. Please try again or choose another payment method.</p>
                    <button className="mt-8 inline-block rounded-md bg-red-600 px-6 py-3 text-white text-lg font-semibold hover:bg-red-700">Redirecting in {counter} seconds...</button>
                </div>
            </div>
        </>
    )
}

export default SubscriptionFailed;