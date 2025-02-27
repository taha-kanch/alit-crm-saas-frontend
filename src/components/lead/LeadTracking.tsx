"use client"

import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import ActivityFormPopup from "../activities/ActivityFormPopup";
import Button from "../ui/button/Button";
import LeadFormPopup from "./LeadFormPopup";
import LeadStatusPopup from "./LeadStatusPopup";
import { useModal } from "@/hooks/useModal";
import { fetchAllLeadApiCall } from "./Action";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import { eCRUDStatus } from "@/utils/constants";

const COLUMNS = {
    NEW: { title: "New Leads", count: 1, items: [{ id: 1, name: "Alit Technologies Pvt Ltd", person: "Burhanuddin Saify", role: "COO" }] },
    FOLLOW_UP: { title: "Follow ups", count: 0, items: [] },
    UNDER_REVIEW: { title: "Under Review", count: 0, items: [] },
    DEMO: { title: "Demo", count: 0, items: [] },
    NEGOTIATION: { title: "Negotiation", count: 0, items: [] },
    WON: { title: "Won", count: 0, items: [] },
    LOST: { title: "Lost", count: 0, items: [] },
    UNQUALIFIED: { title: "Unqualified", count: 0, items: [] }
};

export default function LeadTrackingBoard() {

    const { isOpen: isLeadOpen, openModal: openLeadModal, closeModal: closeLeadModal } = useModal();
    const { isOpen: isActivityOpen, openModal: openActivityModal, closeModal: closeActivityModal } = useModal();
    const { isOpen: isLeadStatusOpen, openModal: openLeadStatusModal, closeModal: closeLeadStatusModal } = useModal();

    const dispatch = useDispatch();
    const { leads } = useAppSelector((state) => state.leads);

    const [columns, setColumns] = React.useState({});
    const [leadData, setLeadData] = React.useState({});
    const [statusLead, setStatusLead] = React.useState({
        primaryKey: 0,
        eStatus: eCRUDStatus.None,
    });

    React.useEffect(() => {
        fetchAllLeadApiCall(dispatch);
    }, [statusLead]);

    React.useEffect(() => {
        if (leads.length > 0) {
            Object.keys(COLUMNS).forEach(status => {
                const leadsByStatus = leads.filter(lead => lead.status === status);
                COLUMNS[status].items = leadsByStatus;
                COLUMNS[status].count = leadsByStatus.length;
            });
            setColumns({ ...COLUMNS });
        }
    }, [leads]);

    return (
        <div className="p-4">

            <div className="flex justify-end mb-2">
                <Button size="sm" variant="primary" type='button' onClick={openLeadModal}>
                    Add Lead
                </Button>
            </div>
            <div className="flex gap-4 overflow-x-auto" style={{ width: "auto" }}>
                {Object.entries(columns).map(([id, column]) => (
                    <div key={id} className="bg-gray-100 p-4 rounded-lg w-64 min-h-[75vh] min-w-[300px]">
                        <h2 className="text-lg font-bold mb-2">{column.title} ({column.count})</h2>
                        {column.items.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg h-min-[100px] shadow-md mb-2 ">
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">{item.companyName}</h3>
                                        <div className="flex justify-end gap-1">
                                            <IconButton size="small" color="primary" onClick={() => {
                                                openActivityModal();
                                                setLeadData(item);
                                            }}>
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" color="secondary" onClick={() => {
                                                openLeadModal();
                                                setLeadData(item);
                                            }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" color="default" onClick={() => {
                                                openLeadStatusModal();
                                                setLeadData(item);
                                            }}>
                                                <ArrowForwardIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <p className="text-sm">{item.fullName}</p>
                                    <p className="text-sm text-gray-600">{item.jobTitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {isActivityOpen && (
                <ActivityFormPopup
                    isOpen={isActivityOpen}
                    onClose={() => {
                        setLeadData({});
                        closeActivityModal();
                    }}
                    leadsDs={leads}
                    lead={leadData}
                />
            )}
            {isLeadOpen && (
                <LeadFormPopup
                    isOpen={isLeadOpen}
                    onClose={() => {
                        setLeadData({});
                        closeLeadModal();
                    }}
                    leadData={leadData}
                    setStatusLead={setStatusLead}
                />
            )}
            {isLeadStatusOpen && (
                <LeadStatusPopup
                    isOpen={isLeadStatusOpen}
                    onClose={() => {
                        setLeadData({});
                        closeLeadStatusModal();
                    }}
                    leadData={leadData}
                    setStatusLead={setStatusLead}
                />
            )}
        </div>
    );
}
