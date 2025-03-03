import { AppDispatch } from "@/redux/store";
import Utils from "@/utils";
import { loaderListener as leadAnalyticsLoaderListener, successLeadAnalyticsReducer } from "../Slice/LeadAnalyticsSlice";
import { loaderListener as leadValueSummaryLoaderListener, successLeadValueSummaryReducer } from "../Slice/LeadValueSummarySlice";
import { loaderListener as leadValueScheduleActivityLoaderListener, successScheduledActivityReducer } from "../Slice/ScheduledActivitySlice";
import { loaderListener as summaryLoaderListener, successSummaryReducer } from "../Slice/SummarySlice";
import { DashboardService } from "@/api/Services/DashboardService";

const dashboardService = new DashboardService();

export const fetchLeadAnalyticsApiCall = async (params: string, dispatch: AppDispatch) => {
    dispatch(
        leadAnalyticsLoaderListener({
            loading: true,
        })
    )
    try {
        const response = await dashboardService.getLeadAnalytics(params);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch lead analytics");
        } else {
            dispatch(
                successLeadAnalyticsReducer({
                    data: response.data,
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const fetchLeadValueSummaryApiCall = async (params: string, dispatch: AppDispatch) => {
    dispatch(
        leadValueSummaryLoaderListener({
            loading: true,
        })
    )
    try {
        const response = await dashboardService.getLeadValueSummary(params);
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch lead value summary");
        } else {
            dispatch(
                successLeadValueSummaryReducer({
                    data: response.data,
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const fetchScheduledActivitiesApiCall = async (dispatch: AppDispatch) => {
    dispatch(
        leadValueScheduleActivityLoaderListener({
            loading: true,
        })
    )
    try {
        const response = await dashboardService.getScheduledActivities();
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch scheduled activities");
        } else {
            dispatch(
                successScheduledActivityReducer({
                    data: response.data,
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}

export const fetchSummaryApiCall = async (dispatch: AppDispatch) => {
    dispatch(
        summaryLoaderListener({
            loading: true,
        })
    )
    try {
        const response = await dashboardService.getSummary();
        if (!response.isOk) {
            Utils.showAlert(2, response.data?.message || "Unable to fetch summary");
        } else {
            dispatch(
                successSummaryReducer({
                    data: response.data,
                    loading: false,
                })
            );
        }
    } catch (error) {
        Utils.showAlert(2, "Something went wrong");
    }
}