import React, { useState } from "react";

interface ChartTabProps {
  leadSummaryType: string;
  setLeadSummaryType: any;
}

const ChartTab: React.FC<ChartTabProps> = ({ leadSummaryType, setLeadSummaryType }) => {
  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree"
  >("optionOne");

  const getButtonClass = (option: "MONTHLY" | "YEARLY") =>
    leadSummaryType === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => setLeadSummaryType("MONTHLY")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          "MONTHLY"
        )}`}
      >
        Monthly
      </button>

      <button
        onClick={() => setLeadSummaryType("YEARLY")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          "YEARLY"
        )}`}
      >
        Annually
      </button>

      {/* <button
        onClick={() => setSelected("optionThree")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          "optionThree"
        )}`}
      >
        Annually
      </button> */}
    </div>
  );
};

export default ChartTab;
