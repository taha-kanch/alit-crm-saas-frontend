"use client";
import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import Button from '@/components/ui/button/Button';
import ActivityFormPopup from './ActivityFormPopup';
import { useModal } from '@/hooks/useModal';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { fetchAllActivityApiCall, updateActivityStatusApiCall } from './Action';
import { fetchAllLeadApiCall } from '../lead/Action';
import { eCRUDStatus, NewActivity } from '@/utils/constants';

const ActivityList = () => {

    const dispatch = useDispatch();
    const { isOpen: isLeadStatusOpen, openModal: openLeadStatusModal, closeModal: closeLeadStatusModal } = useModal();
    const { leads } = useAppSelector((state) => state.leads);
    const { activities } = useAppSelector((state) => state.activities);
    const [statusActivity, setStatusActivity] = React.useState({
        primaryKey: 0,
        eStatus: eCRUDStatus.None,
    });

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    React.useEffect(() => {
        fetchAllActivityApiCall(dispatch);
    }, [statusActivity]);


    React.useEffect(() => {
        fetchAllLeadApiCall(dispatch);
    }, []);

    const handleUpdateActivityStatus = async (values: NewActivity) => {
        updateActivityStatusApiCall({...values, status: "COMPLETED"}, (activityData) => {
            setStatusActivity({ primaryKey: activityData.id, eStatus: eCRUDStatus.Updated });
        });
    }

    const columns: GridColDef[] = [
        {
            field: 'lead',
            headerName: 'Lead',
            flex: 1,
            renderCell: (params) => (
                <div className='mt-2'>
                    <span className="block text-black-500 text-theme-sm dark:text-gray-400">
                        {params.value.fullName}
                    </span>
                    <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                        {params.value.jobTitle}
                    </span>
                </div>
            ),
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 0.8,
            renderCell: (params) => (
                <span className="text-black-500 text-theme-sm dark:text-gray-400">
                    {params.value}
                </span>
            ),
        },
        {
            field: 'scheduleDate',
            headerName: 'Schedule Date',
            flex: 1.2,
            renderCell: (params) => (
                <span className="text-black-500 text-theme-sm dark:text-gray-400">
                    {params.value ? new Date(params.value).toLocaleString() : ""}
                </span>
            ),
        },
        {
            field: 'title',
            headerName: 'Title',
            flex: 1.5,
            renderCell: (params) => (
                <span className="text-black-500 text-theme-sm dark:text-gray-400">
                    {params.value}
                </span>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
                <>
                    <Button
                        size="sm" variant="outline"
                        type='button' disabled={params.value == "COMPLETED"}
                        className='border border-blue-500 text-blue-500'
                        onClick={() => handleUpdateActivityStatus(params.row)}
                    >
                        Complete
                    </Button>
                </>
                // <span className="text-black-500 text-theme-sm dark:text-gray-400">
                //     {params.value}
                // </span>
            ),
        },
    ];

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90"            >
                    Activities
                </h2>
                <Button size="sm" variant="primary" type='button' onClick={openLeadStatusModal}>
                    Add Activity
                </Button>
            </div>
            <div className="space-y-6">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <div className="min-w-[1102px]">
                            <DataGrid
                                rows={activities}
                                columns={columns}
                                rowHeight={60}
                                pageSizeOptions={[5, 10]}
                                pagination
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                                slots={{ toolbar: GridToolbar }}
                                slotProps={{
                                    toolbar: {
                                        showQuickFilter: true,
                                    },
                                }}
                                sx={{
                                    border: 'none',
                                    '& .MuiDataGrid-columnHeaders': {
                                        borderBottom: '1px solid #f3f4f6',
                                        backgroundColor: 'transparent',
                                        '& .MuiDataGrid-columnHeader': {
                                            paddingX: '1.25rem',
                                            '&:focus': { outline: 'none' },
                                        },
                                        '& .MuiDataGrid-columnHeaderTitle': {
                                            fontSize: '0.75rem',
                                            fontWeight: 500,
                                            color: '#6b7280',
                                        },
                                    },
                                    '& .MuiDataGrid-cell': {
                                        paddingX: '1.25rem',
                                        border: 'none',
                                        '&:focus': { outline: 'none' },

                                        '@media (prefers-color-scheme: dark)': {
                                            color: '#9ca3af',
                                        },
                                    },
                                    '& .MuiDataGrid-row': {
                                        '&:nth-of-type(even)': { backgroundColor: 'transparent' },
                                        '&:hover': { backgroundColor: 'transparent' },
                                    },
                                    // Dark mode styles
                                    '& .MuiDataGrid-columnHeaderTitle': {
                                        '@media (prefers-color-scheme: dark)': {
                                            color: '#9ca3af',
                                        },
                                    },
                                    '& .MuiDataGrid-toolbarContainer': {
                                        padding: '10px',
                                    },
                                    '& .MuiInputBase-input': {
                                        '&:focus': { border: 'none', outline: 'none', boxShadow: 'none' },
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isLeadStatusOpen && (
                <ActivityFormPopup
                    isOpen={isLeadStatusOpen}
                    onClose={closeLeadStatusModal}
                    leadsDs={leads}
                    setStatusActivity={setStatusActivity}
                />
            )}
        </div>
    );
};

export default ActivityList;