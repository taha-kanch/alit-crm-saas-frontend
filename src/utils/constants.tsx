
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

export interface UserProfileValues {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    facebook: string;
    instagram: string;
    xcom: string;
    linkedIn: string;
    city: string,
    address: string;
    state: string;
    country: string;
    postalCode: number;
}

export interface LeadValues {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phoneNumber: string;
    gender: string;
    address: string;
    status: string;
    companyName: string;
    website: string;
    annualRevenue: number,
    numberOfEmployees: number,
    industryType: string;
    fax: string;
    interestedProducts: string[],
    leadOwner: number,
    city: string,
    state: string,
    country: string,
    postalCode: number,
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
export interface InterestedProductOption {
    label: string;
    value: "SOFTWARE" | "HARDWARE" | "SERVICE";
};
export interface IndustryTypeOption {
    label: string;
    value: "IT" | "FINANCE" | "HEALTHCARE" | "EDUCATION";
};
interface Option {
    value: number | string;
    label: string;
}

export const LeadStatus: Option[] = [
    { label: "New", value: "NEW" },
    { label: "Follow up", value: "FOLLOW_UP" },
    { label: "Under Review", value: "UNDER_REVIEW" },
    { label: "Demo", value: "DEMO" },
    { label: "Negotiation", value: "NEGOTIATION" },
    { label: "Won", value: "WON" },
    { label: "Lost", value: "LOST" },
    { label: "Unqualified", value: "UNQUALIFIED" },
]

export const InterestedProduct: Option[] = [
    { label: "Software", value: "SOFTWARE" },
    { label: "Hardware", value: "HARDWARE" },
    { label: "Service", value: "SERVICE" },
]

export const IndustryType: Option[] = [
    { label: "IT", value: "IT" },
    { label: "Finance", value: "FINANCE" },
    { label: "Healthcare", value: "HEALTHCARE" },
    { label: "Education", value: "EDUCATION" },
]

export const eCRUDStatus = {
    None: 0,
    Inserted: 1,
    Updated: 2,
    Deleted: 3
};