"use client";
import Button from '../ui/button/Button';
import { ErrorMessage, Formik, Form as FormikForm, FormikHelpers } from 'formik';
import Label from '../form/Label';
import FormInput from '../form/input/FormInput';
import FormSelect from '../form/FormSelect';
import FormTextArea from '../form/input/FormTextArea';
import { createActivitySchema } from '@/utils/validations';
import { ActivityType, eCRUDStatus, NewActivity } from '@/utils/constants';
import { Modal } from '../ui/modal';
import React, { FC } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { addActivityApiCall, updateActivityApiCall } from './Action';
import { useDispatch } from 'react-redux';
import Radio from '../form/input/Radio';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './activity.css'

interface ActivityFormProps {
    isOpen: boolean;
    onClose: () => void;
    leadsDs: any[];
    activityData?: any;
    lead?: any;
    setStatusActivity?: any;
}

const ActivityFormPopup: FC<ActivityFormProps> = ({ isOpen, onClose, leadsDs, activityData, lead, setStatusActivity }) => {

    const { data: { user } } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [leadsOptionDs, setLeadsOptionDs] = React.useState([]);

    React.useEffect(() => {
        if (leadsDs.length > 0) {
            setLeadsOptionDs(() => leadsDs.map(lead => ({ value: lead.id, label: lead.fullName })));
        }
    }, [leadsDs]);

    const handleSubmit = async (
        values: NewActivity,
        { setSubmitting }: FormikHelpers<NewActivity>
    ) => {
        try {

            if(values.scheduleDate) {
                values.scheduleDate = new Date(values.scheduleDate)
            }

            if (activityData?.id) {
                updateActivityApiCall(values, setSubmitting, dispatch, () => {
                    onClose();
                });
            } else {
                addActivityApiCall(values, setSubmitting, dispatch, (activityData) => {
                    setStatusActivity({ primaryKey: activityData.id, eStatus: eCRUDStatus.Inserted });
                    onClose();
                });
            }
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
                        initialValues={{
                            leadID: lead ? lead.id : "",
                            type: "",
                            status: "",
                            scheduleDate: null,
                            title: "",
                            description: "",
                            userID: user.id,

                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                            <FormikForm>
                                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                                    <div className="space-y-6">
                                        <div>
                                            <Label>
                                                Lead <span className="text-error-500">*</span>
                                            </Label>
                                            <FormSelect
                                                options={leadsOptionDs}
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
                                                options={ActivityType}
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
                                            <div className='flex'>
                                                <Radio
                                                    id="SCHEDULED"
                                                    name="status"
                                                    value="SCHEDULED"
                                                    checked={values.status === "SCHEDULED"}
                                                    onChange={(selected) => setFieldValue("status", selected)}
                                                    label="Schedule"
                                                />
                                                <Radio
                                                    id="COMPLETED"
                                                    name="status"
                                                    value="COMPLETED"
                                                    checked={values.status === "COMPLETED"}
                                                    onChange={(selected) => setFieldValue("status", selected)}
                                                    label="Completed"
                                                    className='ms-4'
                                                />
                                            </div>
                                            <ErrorMessage className="text-xs text-error-500" component='p' name={"status"} />
                                        </div>
                                        {
                                            values.status === "SCHEDULED" && (
                                                <>
                                                    <div>
                                                        <Label htmlFor="datePicker">Schedule Date <span className="text-error-500">*</span></Label>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['DateTimePicker']}>
                                                                <DateTimePicker
                                                                    className='datepicker'
                                                                    onChange={(newValue) => {
                                                                        console.log(newValue)
                                                                        setFieldValue("scheduleDate", newValue)
                                                                    }}
                                                                    name='scheduleDate'
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </div>
                                                    <ErrorMessage className="text-xs text-error-500" component='p' name={"scheduleDate"} />
                                                </>
                                            )
                                        }
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