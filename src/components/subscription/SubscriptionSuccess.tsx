import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cleanSubscribeUserInfo, confirmPaymentApiCall } from "./Action";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAppSelector } from "@/hooks/useAppSelector";

const SubscriptionSuccess = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const { subscribeUser, openFromPage } = useAppSelector((state) => state.subscribeUser);

    const [loading, setLoading] = React.useState(true);
    const [counter, setCounter] = React.useState<number | null>(null);

    React.useEffect(() => {
        confirmPaymentApiCall({ session_id: sessionId }, dispatch, openFromPage!, () => {
            setLoading(false);
            setCounter(5);
        }, subscribeUser);
    }, []);

    React.useEffect(() => {
        if (counter === null || counter === 0) return;
        const timer = setInterval(() => {
            setCounter((prev) => (prev !== null ? prev - 1 : null));
        }, 1000);

        if (counter === 1) {
            if(openFromPage === "signin") {
                router.push("/");
            } else {
                router.push("/signin");
            }
            cleanSubscribeUserInfo(dispatch);
        }
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            <div className={`flex items-center justify-center h-screen ${loading ? "bg-gray-100" : "bg-green-100"}`}>
                <div className="p-8 bg-white shadow-lg rounded-lg text-center">
                    {
                        loading ? (
                            <div className="flex flex-col items-center">
                                <CircularProgress />
                                <p className="mt-4 text-gray-700">Confirming your payment...</p>
                            </div>
                        ) : (
                            <>
                                <CheckCircleIcon className="text-green-500" fontSize="large" />
                                <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
                                <p className="mt-6 text-lg text-gray-600">Thank you for your purchase. You can now sign in and start using our services.</p>
                                <button className="mt-8 inline-block rounded-md bg-indigo-600 px-6 py-3 text-white text-lg font-semibold hover:bg-indigo-700">Redirecting in {counter} seconds...</button>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default SubscriptionSuccess;