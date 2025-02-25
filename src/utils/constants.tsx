
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

export interface NewActivity {
    leadID: string,
    type: string,
    status: string,
    title: string,
    description: string
}

export interface NewLead {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    jobTitle: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: number | undefined;
    gender?: string;
    status: string;
    companyName: string;
    website?: string;
    annualRevenue?: number;
    numberOfEmployees: number | undefined;
    industryType: string;
    fax?: string;
    interestedProducts?: string[];
    leadOwner: number;
}

export interface UpdateLeadStatus {
    status: string;
}

export interface LeadStatusOption {
    label: string;
    value: "NEW" | "FOLLOW_UP" | "UNDER_REVIEW" | "DEMO" | "NEGOTIATION" | "WON" | "LOST" | "UNQUALIFIED";
};

export const LeadStatus: LeadStatusOption[] = [
    { label: "New", value: "NEW" },
    { label: "Follow up", value: "FOLLOW_UP" },
    { label: "Under Review", value: "UNDER_REVIEW" },
    { label: "Demo", value: "DEMO" },
    { label: "Negotiation", value: "NEGOTIATION" },
    { label: "Won", value: "WON" },
    { label: "Lost", value: "LOST" },
    { label: "Unqualified", value: "UNQUALIFIED" },
]