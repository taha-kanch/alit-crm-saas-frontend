import { FormikHelpers } from "formik";
import { AppDispatch } from "@/redux/store";
import { SubscriptionService } from "@/api/Services/SubscriptionService";
import Utils from "@/utils";
import { loaderListener, successSubscriptionReducer } from "../Slice/SubscriptionSlice";
import { successSubscribeUserReducer } from "../Slice/SubscribeUserSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { signin } from "@/components/auth/Slice/authSlice";

const subscriptionService = new SubscriptionService();

export const fetchAllSubscriptionApiCall = async (dispatch: AppDispatch) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    )
    try {
        const response = await subscriptionService.getSubscriptions();
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch subscriptions");
        } else {
            dispatch(
                successSubscriptionReducer({
                    data: response.data,
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const confirmPaymentApiCall = async (values: any, dispatch: AppDispatch, openFromPage: string, cb: () => void, authData?: any) => {
    const dataToSend = {
        ...values
    }
    try {
        const response = await subscriptionService.confirmPayment(dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to confirm payment");
        } else {
            if (openFromPage === "signin") {
                dispatch(signin({ data: authData }));
                localStorage.setItem('accessToken', authData.token);
            }
            cb();
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const createStripeCheckoutSessionApiCall = async (values: any) => {
    const dataToSend = {
        ...values
    }
    try {
        const response = await subscriptionService.createStripeCheckoutSession(dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to create stripe checkout session");
        } else {
            const { sessionUrl } = response.data;
            if (sessionUrl) {
                window.location.href = sessionUrl;
            }
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const cleanSubscribeUserInfo = (dispatch: AppDispatch) => {
    dispatch(
        successSubscribeUserReducer({
            data: {},
            loading: false,
        })
    );
}