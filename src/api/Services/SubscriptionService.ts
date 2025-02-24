import { FetchWrapper } from "../fetchWrapper";

export class SubscriptionService {
    private API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    async getSubscriptions() {
        return FetchWrapper.get(`${this.API_BASE_URL}/subscription`);
    }

    async createStripeCheckoutSession(data: Record<string, any>) {
        return FetchWrapper.post(`${this.API_BASE_URL}/stripe/create-checkout-session`, data);
    }

    async confirmPayment(data: Record<string, any>) {
        return FetchWrapper.post(`${this.API_BASE_URL}/stripe/confirm-payment`, data);
    }
}
