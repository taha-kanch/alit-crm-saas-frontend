"use client";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../ui/button/Button';
import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import Label from '../form/Label';
import FormInput from '../form/input/FormInput';
import Select from '../form/Select';
import FormSelect from '../form/FormSelect';
import FormTextArea from '../form/input/FormTextArea';
import { createActivitySchema } from '@/utils/validations';
import { NewActivity } from '@/utils/constants';
import Popup from '../dialog/Popup';

const initialValues = { leadID: "", type: "", status: "", title: "", description: "" };

const CreateActivityDialog = ({
    isOpen,
    onClose,
}: { isOpen: boolean, onClose: () => void }) => {

    const handleSubmit = async (
        values: NewActivity,
        { setSubmitting }: FormikHelpers<NewActivity>
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
                maxWidth="sm"
                fullWidth={true}
                title='Add Activity'
            >
                <Formik
                    validationSchema={createActivitySchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                        <FormikForm>
                            <DialogContent>
                                <div className="space-y-6">
                                    <div>
                                        <Label>
                                            Lead <span className="text-error-500">*</span>
                                        </Label>
                                        <FormSelect
                                            options={[{ value: 1, label: "Alit Technologies" }]}
                                            placeholder="Select Lead"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            className="dark:bg-dark-900"
                                            name="leadID"
                                            value={values.leadID}
                                            error={errors.leadID && touched.leadID ? true : false}
                                        />
                                    </div>
                                    <div>
                                        <Label>
                                            Activity Type <span className="text-error-500">*</span>
                                        </Label>
                                        <FormSelect
                                            options={[{ value: 1, label: "Alit Technologies" }]}
                                            placeholder="Select Type"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            className="dark:bg-dark-900"
                                            name="type"
                                            value={values.type}
                                            error={errors.type && touched.type ? true : false}
                                        />
                                    </div>
                                    <div>
                                        <Label>
                                            Status <span className="text-error-500">*</span>
                                        </Label>
                                        <FormSelect
                                            options={[{ value: 1, label: "Alit Technologies" }]}
                                            placeholder="Select Status"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            className="dark:bg-dark-900"
                                            name="status"
                                            value={values.status}
                                            error={errors.status && touched.status ? true : false}
                                        />
                                    </div>
                                    <div>
                                        <Label>
                                            Title <span className="text-error-500">*</span>
                                        </Label>
                                        <FormInput
                                            type="text"
                                            id="title"
                                            name="title"
                                            placeholder="Enter title"
                                            error={errors.title && touched.title ? true : false}
                                        />
                                    </div>
                                    <div>
                                        <Label>
                                            Description
                                        </Label>
                                        <FormTextArea
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            name="description"
                                            rows={6}
                                            value={values.description}
                                            error={errors.description && touched.description ? true : false}
                                        />
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button size="sm" variant="outline" type='button' onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button size="md" variant="primary" type='submit'>
                                    Submit
                                </Button>
                            </DialogActions>
                        </FormikForm>
                    )}
                </Formik>
            </Popup>
        </>
    );

}

export default CreateActivityDialog;