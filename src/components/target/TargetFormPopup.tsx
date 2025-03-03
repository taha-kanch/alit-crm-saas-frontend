"use client"
import { eCRUDStatus, Target } from "@/utils/constants";
import { Formik, Form as FormikForm, FormikHelpers } from "formik";
import React from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import FormInput from "../form/input/FormInput";
import { targetSchema } from "@/utils/validations";
import { useDispatch } from "react-redux";
import { updateTargetApiCall } from "./Action";

interface TargetFormProps {
    isOpen: boolean;
    onClose: () => void;
    targetData?: any,
    setStatusTarget?: any;
}

const TargetFormPopup: React.FC<TargetFormProps> = ({ isOpen, onClose, targetData, setStatusTarget }) => {

    const dispatch = useDispatch();

    const handleSubmit = async (values: Target, { setSubmitting }: FormikHelpers<Target>) => {
        try {
            updateTargetApiCall(values, setSubmitting, dispatch, (target) => {
                setStatusTarget({ primaryKey: target.id, eStatus: eCRUDStatus.Updated });
                onClose();
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} className="max-w-[400px] m-4">
                <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            {"Update Target"}
                        </h4>
                    </div>
                    <Formik
                        validationSchema={targetSchema}
                        initialValues={{
                            targetValue: targetData?.targetValue || 0,
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched }) => (
                            <FormikForm>
                                <div className="px-2 pb-3">
                                    <div className="space-y-6">
                                        <div>
                                            <Label>
                                                Target Value <span className="text-error-500">*</span>
                                            </Label>
                                            <FormInput
                                                type="Number"
                                                id="targetValue"
                                                name="targetValue"
                                                placeholder="Enter Lead Value"
                                                error={errors.targetValue && touched.targetValue ? true : false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                    <Button size="sm" variant="outline" onClick={onClose} type="button">
                                        Close
                                    </Button>
                                    <Button size="sm" type="submit">
                                        Save Changes
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

export default TargetFormPopup;