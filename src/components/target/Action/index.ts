import { TargetService } from "@/api/Services/TargetService";
import { loaderListener, successTargetDetailReducer } from "../Slice/TargetDetailSlice";
import { AppDispatch } from "@/redux/store";
import Utils from "@/utils";
import { FormikHelpers } from "formik";

const targetService = new TargetService();

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

export const fetchTargetByIdApiCall = async (dispatch: AppDispatch) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    )
    try {
        const params = `?year=${currentYear}&month=${currentMonth}`;
        const response = await targetService.getTargetByYearAndMonth(params);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch target");
        } else {
            dispatch(
                successTargetDetailReducer({
                    data: response?.data || {},
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const updateTargetApiCall = async (values: any, setSubmitting: FormikHelpers<{}>['setSubmitting'], dispatch: AppDispatch, cb: (arg: any) => void) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    );
    const dataToSend = {
        ...values,
        year: currentYear,
        month: currentMonth,
    }
    try {
        const response = await targetService.addAndUpdateTarget(dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to update target");
        } else {
            setSubmitting(false);
            dispatch(
                successTargetDetailReducer({
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