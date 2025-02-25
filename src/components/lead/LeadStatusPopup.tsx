import { FC } from "react";
import Popup from "../dialog/Popup";
import { Formik, FormikHelpers, Form as FormikForm } from "formik";
import { LeadStatus, UpdateLeadStatus } from "@/utils/constants";
import { DialogActions, DialogContent } from "@mui/material";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Radio from "../form/input/Radio";
import { updateLeadStatusSchema } from "@/utils/validations";

interface LeadStatusProps {
    isOpen: boolean,
    onClose: () => void,
    leadID?: number | null,
}

const initialValues: UpdateLeadStatus = {
    status: "",
}

const LeadStatusPopup: FC<LeadStatusProps> = ({ isOpen, onClose, leadID }) => {

    const handleSubmit = async (
        values: UpdateLeadStatus,
        { setSubmitting }: FormikHelpers<UpdateLeadStatus>
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
                maxWidth="xs"
                fullWidth={true}
                title={'Update Status'}
            >
                <Formik
                    validationSchema={updateLeadStatusSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                        <FormikForm>
                            <DialogContent>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 mt-3">
                                        <Label>Status:</Label>
                                        <div>
                                            {
                                                LeadStatus.map((item, idx) => (
                                                    <div className='mb-5' key={idx}>
                                                        <Radio
                                                            id={item.value}
                                                            name="status"
                                                            value={item.value}
                                                            checked={values.status === item.value}
                                                            onChange={(selected) => setFieldValue("status", selected)}
                                                            label={item.label}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button size="sm" variant="outline" type='button' onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button size="md" variant="primary" type='submit'>
                                    Update
                                </Button>
                            </DialogActions>
                        </FormikForm>
                    )}
                </Formik>
            </Popup>
        </>
    );

}

export default LeadStatusPopup;