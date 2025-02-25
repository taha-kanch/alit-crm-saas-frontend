import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is required")
});

export const signupSchema = Yup.object({
    firstName: Yup.string()
        .required("First Name is required"),
    lastName: Yup.string()
        .required("Last Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
        )
        .matches(
            /[a-z]/,
            "Password must contain at least one lowercase letter"
        )
        .matches(
            /\d/,
            "Password must contain at least one number"
        )
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        )
        .required("Password is required"),
    // confirmPassword: Yup.string()
    //     .oneOf([Yup.ref("password"), null], "Passwords must match")
    //     .required("Confirm password is required"),
});

export const createActivitySchema = Yup.object().shape({
    leadID: Yup.number()
        .required("Lead is required"),
    type: Yup.string()
        .required("Activity type is required"),
    status: Yup.string()
        .required("Status is required"),
    title: Yup.string()
        .required("Title is required"),
});

export const createNewLeadSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First Name is required"),
    lastName: Yup.string()
        .required("Last Name is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    phoneNumber: Yup.string()
        .required("Mobile Number is required"),
    jobTitle: Yup.string()
        .required("Job Title is required"),
    address: Yup.string()
        .required("Address is required"),
    city: Yup.string()
        .required("City is required"),
    state: Yup.string()
        .required("State is required"),
    country: Yup.string()
        .required("Country is required"),
    postalCode: Yup.number()
        .required("Postal Code is required"),
    status: Yup.string()
        .required("Status is required"),
    companyName: Yup.number()
        .required("Company Name is required"),
    numberOfEmployees: Yup.number()
        .required("Number of Employee is required"),
    industryType: Yup.number()
        .required("Industry Type is required"),
    leadOwner: Yup.number()
        .required("Lead Owner is required"),
});

export const updateLeadStatusSchema = Yup.object().shape({
    status: Yup.string()
        .required("Status is required"),
});