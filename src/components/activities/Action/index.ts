import { FormikHelpers } from "formik";
import { AppDispatch } from "@/redux/store";
import Utils from "@/utils";
import { loaderListener, successActivityReducer } from "../Slice/ActivitySlice";
import { loaderListener as activityDetailLoaderListener, successActivityDetailReducer } from "../Slice/ActivityDetailSlice";
import { ActivityService } from "@/api/Services/ActivityService";

const activityService = new ActivityService();

export const fetchAllActivityApiCall = async (dispatch: AppDispatch) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    )
    try {
        const response = await activityService.getAllActivities();
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch Activities");
        } else {
            dispatch(
                successActivityReducer({
                    data: response.data,
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const fetchActivityByIdApiCall = async (activityID:number, dispatch: AppDispatch) => {
    dispatch(
        activityDetailLoaderListener({
            loading: true,
        })
    )
    try {
        const response = await activityService.getActivityByID(activityID);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch Activity");
        } else {
            dispatch(
                successActivityDetailReducer({
                    data: response.data,
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const addActivityApiCall = async (values: any, setSubmitting: FormikHelpers<{}>['setSubmitting'], dispatch: AppDispatch, cb: (arg: any) => void) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    );
    const dataToSend = {
        ...values
    }
    try {
        const response = await activityService.addActivity(dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to add Activity");
        } else {
            setSubmitting(false);
            cb(response.data);
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    } finally {
        setSubmitting(false);
    }
}

export const updateActivityApiCall = async (values: any, setSubmitting: FormikHelpers<{}>['setSubmitting'], dispatch: AppDispatch, cb: (arg: any) => void) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    );
    const dataToSend = {
        ...values
    }
    try {
        const response = await activityService.updateActivityByID(values.id, dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to update Activity");
        } else {
            setSubmitting(false);
            dispatch(
                successActivityDetailReducer({
                    data: {},
                    loading: false,
                })
            );
            cb(response.data);
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    } finally {
        setSubmitting(false);
    }
}

export const updateActivityStatusApiCall = async (values: any, cb: (arg: any) => void) => {
    const dataToSend = {
        ...values
    }
    try {
        const response = await activityService.updateActivityByID(values.id, dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to update Activity");
        } else {
            cb(response.data);
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}