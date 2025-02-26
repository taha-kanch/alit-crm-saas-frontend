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
import { Modal } from '../ui/modal';

const initialValues = { leadID: "", type: "", status: "", title: "", description: "" };

const ActivityFormPopup = ({
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
            <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
                <div className=" relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            {"Add Activity"}
                        </h4>
                    </div>
                    <Formik
                        validationSchema={createActivitySchema}
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                            <FormikForm>
                                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
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
                                </div>
                                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                    <Button size="sm" variant="outline" onClick={onClose} type="button">
                                        Close
                                    </Button>
                                    <Button size="sm" type="submit">
                                        {"Submit"}
                                    </Button>
                                </div>
                            </FormikForm>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    );

}

export default ActivityFormPopup;