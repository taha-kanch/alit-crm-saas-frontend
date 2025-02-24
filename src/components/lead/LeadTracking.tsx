"use client"

import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import CreateActivityDialog from "../activities/CreateActivityDialog";

const columns = {
    new_leads: { title: "New Leads", count: 1, items: [{ id: "1", name: "Alit Technologies Pvt Ltd", person: "Burhanuddin Saify", role: "COO" }] },
    follow_ups: { title: "Follow ups", count: 0, items: [] },
    under_review: { title: "Under Review", count: 0, items: [] },
    demo: { title: "Demo", count: 0, items: [] },
    negotiation: { title: "Negotiation", count: 0, items: [] },
    won: { title: "Won", count: 0, items: [] },
    lost: { title: "Lost", count: 0, items: [] },
    unqualified: { title: "Unqualified", count: 0, items: [] }
};

export default function LeadTrackingBoard() {

    const [showActivityDialog, setShowActivityDialog] = React.useState(false);

    const openActivityDialog = () => {
        setShowActivityDialog(true);
    }
    const onCloseActivityDialog = () => {
        setShowActivityDialog(false);
    }

    return (
        <div className="p-4">
            <div className="flex gap-4 overflow-x-auto" style={{ width: "auto" }}>
                {Object.entries(columns).map(([id, column]) => (
                    <div key={id} className="bg-gray-100 p-4 rounded-lg w-64 min-h-[80vh] min-w-[300px]">
                        <h2 className="text-lg font-bold mb-2">{column.title} ({column.count})</h2>
                        {column.items.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg h-min-[100px] shadow-md mb-2 ">
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <div className="flex justify-end gap-1">
                                            <IconButton size="small" color="primary" onClick={openActivityDialog}>
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" color="secondary">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" color="default">
                                                <ArrowForwardIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <p className="text-sm">{item.person}</p>
                                    <p className="text-sm text-gray-600">{item.role}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {showActivityDialog && (
                <CreateActivityDialog
                    isOpen={showActivityDialog}
                    onClose={onCloseActivityDialog}
                />
            )}
        </div>
    );
}
