
export interface SignupValues {
    firstName: string;
    lastName: string;
    email: string;
    password: String;
    // confirmPassword: string;
}

export interface LoginValues {
    username: string;
    password: String;
}

export interface AuthHeader {
    method: string,
    headers: {
        'Authorization'?: string,
        'Content-Type': string,
    },
    body?: string,
}

export interface SubscriptionPlan {
    active: boolean,
    description: string,
    features: [],
    id: number,
    price: number,
    pricePerMonth: number,
    subscriptionType: {
        typeName: string
    },
    typeID: number
}