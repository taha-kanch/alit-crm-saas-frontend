"use client"
import { useAppSelector } from "@/hooks/useAppSelector";
import DemographicCard from "./DemographicCard";
import { Metrics } from "./Metrics";
import MonthlyLeadChart from "./MonthlyLeadChart";
import MonthlyTarget from "./MonthlyTarget";
import UpcomingActivity from "./UpcomingActivity";
import LeadValueStatisticsChart from "./LeadValueStatisticsChart";
import React from "react";
import { fetchLeadAnalyticsApiCall, fetchLeadValueSummaryApiCall, fetchScheduledActivitiesApiCall, fetchSummaryApiCall } from "./Action";
import { useDispatch } from "react-redux";
import { eCRUDStatus } from "@/utils/constants";

export default function Dashboard() {

    const { monthlyLeadData } = useAppSelector((state) => state.leadAnalytics);
    const { leadValueSummary } = useAppSelector((state) => state.leadValueSummary);
    const { scheduledActivity } = useAppSelector((state) => state.scheduledActivity);
    const { summary } = useAppSelector((state) => state.summary);
    const dispatch = useDispatch();

    console.log(scheduledActivity);

    const [statusTarget, setStatusTarget] = React.useState({
        primaryKey: 0,
        eStatus: eCRUDStatus.None,
    });
    const [leadSummaryType, setLeadSummaryType] = React.useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    React.useEffect(() => {
        if (!currentYear) return;
        const params = `?year=${currentYear}`;
        fetchLeadAnalyticsApiCall(params, dispatch);
    }, []);

    React.useEffect(() => {
        let params;
        if (leadSummaryType === "MONTHLY") {
            params = `?type=${leadSummaryType}&year=${currentYear}`;
        } else {
            params = `?type=${leadSummaryType}`;
        }
        fetchLeadValueSummaryApiCall(params, dispatch);
    }, [leadSummaryType]);

    React.useEffect(() => {
        fetchScheduledActivitiesApiCall(dispatch);
    }, []);

    React.useEffect(() => {
        fetchSummaryApiCall(dispatch);
    }, [statusTarget]);

    return (
        <>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <Metrics summary={summary} />
                    <MonthlyLeadChart monthlyLeadData={monthlyLeadData} />
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <MonthlyTarget summary={summary} statusTarget={statusTarget} setStatusTarget={setStatusTarget} />
                </div>

                <div className="col-span-12">
                    <LeadValueStatisticsChart
                        leadValueSummary={leadValueSummary}
                        leadSummaryType={leadSummaryType}
                        setLeadSummaryType={setLeadSummaryType}
                    />
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <DemographicCard />
                </div>

                <div className="col-span-12 xl:col-span-7">
                    <UpcomingActivity activities={scheduledActivity} />
                </div>
            </div>
        </>
    );
}