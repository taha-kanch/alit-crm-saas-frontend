import { FormikHelpers } from "formik";
import { AppDispatch } from "@/redux/store";
import { LeadService } from "@/api/Services/LeadService";
import Utils from "@/utils";
import { loaderListener, successLeadReducer } from "../Slice/LeadSlice";
import { loaderListener as leadDetailLoaderListener, successLeadDetailReducer } from "../Slice/LeadDetailSlice";

const leadService = new LeadService();

export const fetchAllLeadApiCall = async (dispatch: AppDispatch) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    )
    try {
        const response = await leadService.getAllLeads();
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch leads");
        } else {
            dispatch(
                successLeadReducer({
                    data: response.data,
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const fetchLeadByIdApiCall = async (leadID:number, dispatch: AppDispatch) => {
    dispatch(
        leadDetailLoaderListener({
            loading: true,
        })
    )
    try {
        const response = await leadService.getLeadByID(leadID);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch lead");
        } else {
            dispatch(
                successLeadDetailReducer({
                    data: response.data,
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const addLeadApiCall = async (values: any, setSubmitting: FormikHelpers<{}>['setSubmitting'], dispatch: AppDispatch, cb: () => void) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    );
    const dataToSend = {
        ...values
    }
    try {
        const response = await leadService.addLead(dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to add Lead");
        } else {
            setSubmitting(false);
            cb();
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    } finally {
        setSubmitting(false);
    }
}

export const updateLeadApiCall = async (values: any, setSubmitting: FormikHelpers<{}>['setSubmitting'], dispatch: AppDispatch, cb: () => void) => {
    dispatch(
        loaderListener({
            loading: true,
        })
    );
    const dataToSend = {
        ...values
    }
    try {
        const response = await leadService.updateLeadByID(values.id, dataToSend);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to update Lead");
        } else {
            setSubmitting(false);
            dispatch(
                successLeadDetailReducer({
                    data: {},
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