import { FormikHelpers } from "formik";
import { loaderListener, successUserProfileDetailReducer } from "../Slice/UserProfileSlice";
import { UserProfileValues } from "@/utils/constants";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AppDispatch } from "@/redux/store";
import { UserService } from "@/api/Services/UserService";
import Utils from "@/utils";

const userService = new UserService();

export const fetchUserProfileDetailApiCall = async (userID: number, dispatch: AppDispatch) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    )
    try {
        const response = await userService.get(userID);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch Profile details");
        } else {
            dispatch(
                successUserProfileDetailReducer({
                    data: response.data,
                })
            );
            dispatch(
                loaderListener({
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}


export const updateUserProfileDetailApiCall = async (values: UserProfileValues, setSubmitting: FormikHelpers<UserProfileValues>['setSubmitting'], dispatch: AppDispatch, cb: () => void) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    );
    const dataToSend: UserProfileValues = {
        ...values
    }
    try {
        const response = await userService.update(values.id, dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to update Profile");
        } else {
            setSubmitting(false);
            dispatch(
                successUserProfileDetailReducer({
                    data: response.data,
                    loading: false,
                })
            );
            cb();
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    } finally {
        setSubmitting(false);
    }
}