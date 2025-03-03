import { FetchWrapper } from "../fetchWrapper";

export class DashboardService {

    async getSummary() {
        return FetchWrapper.get(`dashboard/summary`);
    }

    async getLeadAnalytics(params: string) {
        return FetchWrapper.get(`dashboard/leads-analytics${params}`);
    }

    async getLeadValueSummary(params: string) {
        return FetchWrapper.get(`dashboard/lead-value-summary${params}`);
    }

    async getScheduledActivities() {
        return FetchWrapper.get(`dashboard/activities/upcoming`);
    }

}