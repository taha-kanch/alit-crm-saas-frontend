import { FetchWrapper } from "../fetchWrapper";

export class TargetService {

    async addAndUpdateTarget(data: any) {
        return FetchWrapper.post(`target`, data);
    }

    async getTargetByYearAndMonth(params: string) {
        return FetchWrapper.get(`target${params}`);
    }
}