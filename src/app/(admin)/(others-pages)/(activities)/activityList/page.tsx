"use client";
import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const rows = [
    { id: 1, lead: "Burhanuddin - Alit Tech Pvt Ltd", type: "Meeting", from: "18-Feb-2025 13:22:26", to: "18-Feb-2025 14:22:30", title: "Appointment Meet", reminder: "false", status: "Completed" },
    { id: 2, lead: "Ali Raza - Tech Solutions", type: "Call", from: "19-Feb-2025 10:00:00", to: "19-Feb-2025 10:30:00", title: "Follow-up Call", reminder: "true", status: "Pending" },
    { id: 3, lead: "Sarah Khan - Web Innovators", type: "Email", from: "20-Feb-2025 11:45:00", to: "20-Feb-2025 12:00:00", title: "Proposal Email", reminder: "false", status: "Completed" },
    { id: 4, lead: "Omar Sheikh - Digital Ventures", type: "Meeting", from: "21-Feb-2025 15:00:00", to: "21-Feb-2025 16:00:00", title: "Demo Presentation", reminder: "true", status: "In Progress" },
    { id: 5, lead: "Fatima Noor - AI Systems", type: "Call", from: "22-Feb-2025 09:30:00", to: "22-Feb-2025 10:00:00", title: "Client Discussion", reminder: "false", status: "Pending" },
    { id: 6, lead: "Ahmed Saeed - Code Wizards", type: "Meeting", from: "23-Feb-2025 13:00:00", to: "23-Feb-2025 14:00:00", title: "Project Kickoff", reminder: "true", status: "Completed" },
    { id: 7, lead: "Zainab Ali - Cloud Sphere", type: "Email", from: "24-Feb-2025 16:20:00", to: "24-Feb-2025 16:40:00", title: "Contract Signing", reminder: "false", status: "Pending" },
    { id: 8, lead: "Bilal Khan - Software Experts", type: "Call", from: "25-Feb-2025 08:30:00", to: "25-Feb-2025 09:00:00", title: "Initial Discussion", reminder: "true", status: "In Progress" },
    { id: 9, lead: "Hira Qureshi - Marketing Hub", type: "Meeting", from: "26-Feb-2025 12:15:00", to: "26-Feb-2025 13:15:00", title: "Strategy Meeting", reminder: "false", status: "Completed" },
    { id: 10, lead: "Usman Haider - Green Energy", type: "Email", from: "27-Feb-2025 17:00:00", to: "27-Feb-2025 17:20:00", title: "Service Inquiry", reminder: "true", status: "Pending" },

    { id: 11, lead: "Burhanuddin - Alit Tech Pvt Ltd", type: "Meeting", from: "18-Feb-2025 13:22:26", to: "18-Feb-2025 14:22:30", title: "Appointment Meet", reminder: "false", status: "Completed" },
    { id: 12, lead: "Ali Raza - Tech Solutions", type: "Call", from: "19-Feb-2025 10:00:00", to: "19-Feb-2025 10:30:00", title: "Follow-up Call", reminder: "true", status: "Pending" },
    { id: 13, lead: "Sarah Khan - Web Innovators", type: "Email", from: "20-Feb-2025 11:45:00", to: "20-Feb-2025 12:00:00", title: "Proposal Email", reminder: "false", status: "Completed" },
    { id: 14, lead: "Omar Sheikh - Digital Ventures", type: "Meeting", from: "21-Feb-2025 15:00:00", to: "21-Feb-2025 16:00:00", title: "Demo Presentation", reminder: "true", status: "In Progress" },
    { id: 15, lead: "Fatima Noor - AI Systems", type: "Call", from: "22-Feb-2025 09:30:00", to: "22-Feb-2025 10:00:00", title: "Client Discussion", reminder: "false", status: "Pending" },
    { id: 16, lead: "Ahmed Saeed - Code Wizards", type: "Meeting", from: "23-Feb-2025 13:00:00", to: "23-Feb-2025 14:00:00", title: "Project Kickoff", reminder: "true", status: "Completed" },
    { id: 17, lead: "Zainab Ali - Cloud Sphere", type: "Email", from: "24-Feb-2025 16:20:00", to: "24-Feb-2025 16:40:00", title: "Contract Signing", reminder: "false", status: "Pending" },
    { id: 18, lead: "Bilal Khan - Software Experts", type: "Call", from: "25-Feb-2025 08:30:00", to: "25-Feb-2025 09:00:00", title: "Initial Discussion", reminder: "true", status: "In Progress" },
    { id: 19, lead: "Hira Qureshi - Marketing Hub", type: "Meeting", from: "26-Feb-2025 12:15:00", to: "26-Feb-2025 13:15:00", title: "Strategy Meeting", reminder: "false", status: "Completed" },
    { id: 20, lead: "Usman Haider - Green Energy", type: "Email", from: "27-Feb-2025 17:00:00", to: "27-Feb-2025 17:20:00", title: "Service Inquiry", reminder: "true", status: "Pending" }
];

const DataGridTable = () => {

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    const columns: GridColDef[] = [
        {
            field: 'lead',
            headerName: 'Lead',
            flex: 1,
            renderCell: (params) => (
                <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {params.value.split(' - ')[0]}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {params.value.split(' - ')[1]}
                    </span>
                </div>
            ),
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 0.8,
            renderCell: (params) => (
                <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                    {params.value}
                </span>
            ),
        },
        {
            field: 'from',
            headerName: 'From',
            flex: 1.2,
            renderCell: (params) => (
                <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                    {params.value}
                </span>
            ),
        },
        {
            field: 'to',
            headerName: 'To',
            flex: 1.2,
            renderCell: (params) => (
                <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                    {params.value}
                </span>
            ),
        },
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
            renderCell: (params) => (
                <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                    {params.value}
                </span>
            ),
        },
        {
            field: 'reminder',
            headerName: 'Reminder',
            flex: 0.8,
            renderCell: (params) => (
                params.value === "true" ? (
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                )
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
                <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                    {params.value}
                </span>
            ),
        },
    ];

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90"            >
                    Activities
                </h2>
                <Button size="sm" variant="primary" type='button'>
                    Add Lead
                </Button>
            </div>
            <div className="space-y-6">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <div className="min-w-[1102px]">
                            <DataGrid
                                rows={rows}
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
        </div>
    );
};

export default DataGridTable;