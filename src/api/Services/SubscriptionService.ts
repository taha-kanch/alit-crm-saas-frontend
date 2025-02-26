import { FetchWrapper } from "../fetchWrapper";

export class SubscriptionService {

    async getSubscriptions() {
        return FetchWrapper.get(`subscription`);
    }

    async createStripeCheckoutSession(data: Record<string, any>) {
        return FetchWrapper.post(`stripe/create-checkout-session`, data);
    }

    async confirmPayment(data: Record<string, any>) {
        return FetchWrapper.post(`stripe/confirm-payment`, data);
    }
}
