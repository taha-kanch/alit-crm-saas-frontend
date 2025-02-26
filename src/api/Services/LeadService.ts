import { FetchWrapper } from "../fetchWrapper";

export class LeadService {

    async addLead(data: any) {
        return FetchWrapper.post(`lead`, data);
    }

    async getAllLeads() {
        return FetchWrapper.get(`lead`);
    }

    async getLeadByID(leadID: number) {
        return FetchWrapper.get(`lead/${leadID}`);
    }

    async updateLeadByID(leadID: number, data: any) {
        return FetchWrapper.put(`lead/${leadID}`, data);
    }

}