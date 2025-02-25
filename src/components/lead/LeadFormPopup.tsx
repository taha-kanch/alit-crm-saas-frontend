"use client";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '../ui/button/Button';
import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import Label from '../form/Label';
import FormInput from '../form/input/FormInput';
import FormSelect from '../form/FormSelect';
import FormTextArea from '../form/input/FormTextArea';
import { NewLead } from '@/utils/constants';
import FormMultiSelect from '../form/FormMultiSelect';
import React, { FC } from 'react';
import { createNewLeadSchema } from '@/utils/validations';
import Radio from '../form/input/Radio';
import Popup from '../dialog/Popup';

const initialValues: NewLead = {
    firstName: "", lastName: "", jobTitle: "", email: "", phoneNumber: "",
    address: "", status: "", companyName: "", website: "", annualRevenue: undefined,
    numberOfEmployees: undefined, industryType: "", fax: "", interestedProducts: [],
    leadOwner: 0, city: '', state: '', country: '', postalCode: undefined,
};

interface LeadFormProps {
    isOpen: boolean,
    onClose: () => void,
    leadID?: number | null,
}

const LeadFormPopup: FC<LeadFormProps> = ({ isOpen, onClose, leadID }) => {

    const handleSubmit = async (
        values: NewLead,
        { setSubmitting }: FormikHelpers<NewLead>
    ) => {
        try {
            console.log(values);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <>
            <Popup
                isOpen={isOpen}
                onClose={onClose}
                maxWidth="md"
                fullWidth={true}
                title={leadID ? 'Edit Lead' : 'Add New Lead'}
            >
                <Formik
                    validationSchema={createNewLeadSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                        <FormikForm>
                            <DialogContent>
                                <div className="space-y-6">
                                    {/* Personal Information Section */}
                                    <div className="border-b pb-4">
                                        <h2 className="text-lg font-semibold">Personal Information</h2>
                                        <div className="grid grid-cols-2 gap-6 mt-3">
                                            <div>
                                                <Label>First Name <span className="text-error-500">*</span></Label>
                                                <FormInput
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="Enter First Name"
                                                    error={errors.firstName && touched.firstName ? true : false}
                                                />
                                            </div>
                                            <div>
                                                <Label>Last Name <span className="text-error-500">*</span></Label>
                                                <FormInput
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Enter Last Name"
                                                    error={errors.lastName && touched.lastName ? true : false}
                                                />
                                            </div>
                                            <div>
                                                <Label>Job Title <span className="text-error-500">*</span></Label>
                                                <FormInput
                                                    type="text"
                                                    id="jobTitle"
                                                    name="jobTitle"
                                                    placeholder="Enter Job Title"
                                                    error={errors.jobTitle && touched.jobTitle ? true : false}
                                                />
                                            </div>
                                            <div>
                                                <Label>Email <span className="text-error-500">*</span></Label>
                                                <FormInput
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Enter Email"
                                                    error={errors.email && touched.email ? true : false}
                                                />
                                            </div>
                                            <div>
                                                <Label>Mobile No <span className="text-error-500">*</span></Label>
                                                <FormInput
                                                    type="text"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    placeholder="Enter Mobile Number"
                                                    error={errors.phoneNumber && touched.phoneNumber ? true : false}
                                                />
                                            </div>
                                            <div>
                                                <Label>Gender</Label>
                                                <div className='flex'>
                                                    <Radio
                                                        id="male"
                                                        name="gender"
                                                        value="male"
                                                        checked={values.gender === "male"}
                                                        onChange={(selected) => setFieldValue("gender", selected)}
                                                        label="Male"
                                                    />
                                                    <Radio
                                                        id="female"
                                                        name="gender"
                                                        value="female"
                                                        checked={values.gender === "female"}
                                                        onChange={(selected) => setFieldValue("gender", selected)}
                                                        label="Female"
                                                        className='ms-4'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b pb-4">
                                    <h2 className="text-lg font-semibold">Company Information</h2>
                                    <div className="grid grid-cols-2 gap-6 mt-3">
                                        <div>
                                            <Label>Company Name <span className="text-error-500">*</span></Label>
                                            <FormInput
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                placeholder="Enter Company Name"
                                                error={errors.companyName && touched.companyName ? true : false}
                                            />
                                        </div>
                                        <div>
                                            <Label>Website</Label>
                                            <FormInput
                                                type="text"
                                                id="website"
                                                name="website"
                                                placeholder="Enter Website URL"
                                                error={errors.website && touched.website ? true : false}
                                            />
                                        </div>
                                        <div>
                                            <Label>Annual Revenue</Label>
                                            <FormInput
                                                type="Number"
                                                id="annualRevenue"
                                                name="annualRevenue"
                                                placeholder="Enter Annual Revenue"
                                                error={errors.annualRevenue && touched.annualRevenue ? true : false}
                                            />
                                        </div>
                                        <div>
                                            <Label>No of Employees <span className="text-error-500">*</span></Label>
                                            <FormInput
                                                type="text"
                                                id="numberOfEmployees"
                                                name="numberOfEmployees"
                                                placeholder="Enter Number Of Employee"
                                                error={errors.numberOfEmployees && touched.numberOfEmployees ? true : false}
                                            />
                                        </div>
                                        <div>
                                            <Label>Industry Type <span className="text-error-500">*</span></Label>
                                            <FormSelect
                                                options={[{ value: 1, label: "Alit Technologies" }]}
                                                placeholder="Select Lead"
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                className="dark:bg-dark-900"
                                                name="industryType"
                                                value={values.industryType}
                                                error={errors.industryType && touched.industryType ? true : false}
                                            />
                                        </div>
                                        <div>
                                            <Label>Fax</Label>
                                            <FormInput
                                                type="text"
                                                id="fax"
                                                name="fax"
                                                placeholder="Enter Fax Number"
                                                error={errors.fax && touched.fax ? true : false}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Lead Details Section */}
                                <div className="border-b pb-4">
                                    <h2 className="text-lg font-semibold">Lead Details</h2>
                                    <div className="grid grid-cols-2 gap-6 mt-3">
                                        <div>
                                            <Label>Lead Status <span className="text-error-500">*</span></Label>
                                            <FormSelect
                                                options={[{ value: 1, label: "Alit Technologies" }]}
                                                placeholder="Select Lead"
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                className="dark:bg-dark-900"
                                                name="status"
                                                value={values.status}
                                                error={errors.status && touched.status ? true : false}
                                            />
                                        </div>
                                        <div>
                                            <Label>Interested Product(s)</Label>
                                            <FormMultiSelect
                                                options={[{ value: "1", text: "Alit Technologies", selected: false }, { value: "2", text: "Alit Technologies", selected: false }, { value: "3", text: "Alit Technologies", selected: false }]}
                                                placeholder="Select Lead"
                                                handleChange={(selectedOptions) =>
                                                    setFieldValue("interestedProducts", selectedOptions)
                                                }
                                                name="interestedProducts"
                                                defaultSelected={values.interestedProducts}
                                            />
                                        </div>
                                        <div>
                                            <Label>Lead Owner <span className="text-error-500">*</span></Label>
                                            <FormSelect
                                                options={[{ value: 1, label: "Alit Technologies" }]}
                                                placeholder="Select Lead"
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                className="dark:bg-dark-900"
                                                name="leadOwner"
                                                value={values.leadOwner}
                                                error={errors.leadOwner && touched.leadOwner ? true : false}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div>
                                    <h2 className="text-lg font-semibold">Address Information</h2>
                                    <div className="mt-3">
                                        <Label>Address <span className="text-error-500">*</span></Label>
                                        <FormTextArea
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            name="address"
                                            rows={2}
                                            value={values.address}
                                            error={errors.address && touched.address ? true : false}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 mt-3">
                                        <div>
                                            <Label>City <span className="text-error-500">*</span></Label>
                                            <FormInput
                                                type="text"
                                                id="city"
                                                name="city"
                                                placeholder="Enter City"
                                                error={errors.city && touched.city ? true : false}
                                            />
                                        </div>
                                        <div>
                                            <Label>State <span className="text-error-500">*</span></Label>
                                            <FormInput
                                                type="text"
                                                id="state"
                                                name="state"
                                                placeholder="Enter State"
                                                error={errors.state && touched.state ? true : false}
                                            />
                                        </div>
                                        <div>
                                            <Label>Country <span className="text-error-500">*</span></Label>
                                            <FormInput
                                                type="text"
                                                id="country"
                                                name="country"
                                                placeholder="Enter Country"
                                                error={errors.country && touched.country ? true : false}
                                            />
                                        </div>
                                        <div>
                                            <Label>Postal Code <span className="text-error-500">*</span></Label>
                                            <FormInput
                                                type="number"
                                                id="postalCode"
                                                name="postalCode"
                                                placeholder="Enter Postal Code"
                                                error={errors.postalCode && touched.postalCode ? true : false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button size="sm" variant="outline" type='button' onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button size="md" variant="primary" type='submit'>
                                    {leadID ? "Update" : "Submit"}
                                </Button>
                            </DialogActions>
                        </FormikForm>
                    )}
                </Formik>
            </Popup>
        </>
    );

}

export default LeadFormPopup;