import { FetchWrapper } from "../fetchWrapper";

export class ActivityService {

    async addActivity(data: any) {
        return FetchWrapper.post(`activity`, data);
    }

    async getAllActivities() {
        return FetchWrapper.get(`activity`);
    }

    async getActivityByID(activityID: number) {
        return FetchWrapper.get(`activity/${activityID}`);
    }

    async updateActivityByID(activityID: number, data: any) {
        return FetchWrapper.put(`activity/${activityID}`, data);
    }

}