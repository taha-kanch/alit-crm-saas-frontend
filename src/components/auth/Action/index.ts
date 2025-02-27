import { AuthService } from "@/api/Services/AuthService";
import { AppDispatch } from "@/redux/store";
import { LoginValues, SignupValues } from "@/utils/constants";
import { FormikHelpers } from "formik";
import { signin } from "../Slice/authSlice";
import Utils from "@/utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { loaderListener, successSubscribeUserReducer } from "@/components/subscription/Slice/SubscribeUserSlice";

const authService = new AuthService();

export const login = async (values: LoginValues, setSubmitting: FormikHelpers<LoginValues>['setSubmitting'], router: AppRouterInstance, dispatch: AppDispatch) => {
    const { username, password } = values
    const dataToSend = {
        username,
        password,
    }
    try {
        const response = await authService.login(dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Invalid Credentials");
        } else {
            if(response.data.user.subscriptionID) {
                dispatch(signin({ data: response.data }));
                localStorage.setItem('accessToken', response.data.token);
                router.push("/");
            } else {
                dispatch(
                    successSubscribeUserReducer({
                        data: response.data,
                        loading: false,
                        openFromPage: 'signin',
                    })
                );
                router.push("/subscription");
            }
        }
    } catch (error) {
        Utils.showAlert(2, "Invalid Credentials")
        dispatch(signin({ data: {} }))
    } finally {
        setSubmitting(false);
    }
}

export const signup = async (values: SignupValues, setSubmitting: FormikHelpers<LoginValues>['setSubmitting'], router: AppRouterInstance, dispatch: AppDispatch) => {
    const dataToSend = {
        ...values,
    };
    try {
        const response = await authService.signup(dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "SignUp failed");
        } else {
            dispatch(
                successSubscribeUserReducer({
                    data: response.data,
                    loading: false,
                    openFromPage: 'signup',
                })
            );
            router.push("/subscription");
        }
    } catch (error) {
        Utils.showAlert(2, "SignUp failed");
        dispatch(signin({ data: {} }))
        dispatch(
            loaderListener({
                loading: false,
            })
        );
    } finally {
        setSubmitting(false);
    }
}

export const logout = (router: AppRouterInstance, dispatch: AppDispatch) => {
    localStorage.clear();
    router.push("/signin");
    dispatch(signin({ data: {} }));
}