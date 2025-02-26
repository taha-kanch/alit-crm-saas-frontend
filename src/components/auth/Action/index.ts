import { AuthService } from "@/api/Services/AuthService";
import { AppDispatch } from "@/redux/store";
import { LoginValues, SignupValues } from "@/utils/constants";
import { FormikHelpers } from "formik";
import { signin } from "../Slice/authSlice";
import Utils from "@/utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
            dispatch(signin({ data: response.data }));
            localStorage.setItem('accessToken', response.data.token);
            router.push("/");
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
        console.log(response)
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "SignUp failed");
        } else {
            Utils.showAlert(1, "Signup Succesfully");
        }
    } catch (error) {
        Utils.showAlert(2, "SignUp failed");
        dispatch(signin({ data: {} }))
    } finally {
        setSubmitting(false);
    }
}

export const logout = (router: AppRouterInstance, dispatch: AppDispatch) => {
    localStorage.clear();
    router.push("/signin");
    dispatch(signin({ data: {} }));
}