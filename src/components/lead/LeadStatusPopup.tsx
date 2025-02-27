import React, { FC } from "react";
import Popup from "../dialog/Popup";
import { Formik, FormikHelpers, Form as FormikForm } from "formik";
import { eCRUDStatus, LeadStatus, UpdateLeadStatus } from "@/utils/constants";
import { DialogActions, DialogContent } from "@mui/material";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Radio from "../form/input/Radio";
import { updateLeadStatusSchema } from "@/utils/validations";
import { Modal } from "../ui/modal";
import { useDispatch } from "react-redux";
import { updateLeadApiCall } from "./Action";

interface LeadStatusProps {
    isOpen: boolean,
    onClose: () => void,
    leadData: any,
    setStatusLead: any
}

const initialValues: UpdateLeadStatus = {
    status: "",
}

const LeadStatusPopup: FC<LeadStatusProps> = ({ isOpen, onClose, leadData, setStatusLead }) => {

    const dispatch = useDispatch();

    const handleSubmit = async (
        values: UpdateLeadStatus,
        { setSubmitting }: FormikHelpers<UpdateLeadStatus>
    ) => {
        try {
            updateLeadApiCall(values, setSubmitting, dispatch, (lead) => {
                setStatusLead({ primaryKey: lead.id, eStatus: eCRUDStatus.Updated });
                onClose();
            });
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
                            {leadData.id ? "Update Lead" : "Add New Lead"}
                        </h4>
                    </div>
                    <Formik
                        validationSchema={updateLeadStatusSchema}
                        initialValues={{
                            ...leadData,
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                            <FormikForm>
                                <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3">
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
                                </div>
                                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                    <Button size="sm" variant="outline" onClick={onClose} type="button">
                                        Close
                                    </Button>
                                    <Button size="sm" type="submit">
                                        {leadData.id ? "Save Changes" : "Submit"}
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

export default LeadStatusPopup;