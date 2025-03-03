"use client";
// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { MoreDotIcon } from "@/icons";
import React from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useModal } from "@/hooks/useModal";
import TargetFormPopup from "../target/TargetFormPopup";
import { eCRUDStatus } from "@/utils/constants";
import { fetchTargetByIdApiCall } from "../target/Action";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#465FFF"],
  chart: {
    fontFamily: "Outfit, sans-serif",
    type: "radialBar",
    height: 330,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -85,
      endAngle: 85,
      hollow: {
        size: "80%",
      },
      track: {
        background: "#E4E7EC",
        strokeWidth: "100%",
        margin: 5, // margin is in pixels
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: "36px",
          fontWeight: "600",
          offsetY: -40,
          color: "#1D2939",
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#465FFF"],
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Progress"],
};

interface MonthlyTargetProps {
  summary: any;
  setStatusTarget: any;
  statusTarget: any;
}

const MonthlyTarget: React.FC<MonthlyTargetProps> = ({ summary, setStatusTarget, statusTarget }) => {

  const { isOpen: isTargetOpen, openModal: openTargetModal, closeModal: closeTargetModal } = useModal();
  const { targetDetail } = useAppSelector((state) => state.targetDetail);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);
  const [series, setSeries] = React.useState([0]);

  React.useEffect(() => {
    if (summary.totalLeadValueOfMonth && summary.currentMonthTarget) {
      const acheivedTargetPer: number = (summary.totalLeadValueOfMonth / summary.currentMonthTarget) * 100;
      setSeries([acheivedTargetPer.toFixed(2)]);
    }
  }, [summary]);

  React.useEffect(() => {
    fetchTargetByIdApiCall(dispatch);
  }, [statusTarget]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <>

      <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Monthly Target
              </h3>
              <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
                Target you’ve set for each month
              </p>
            </div>
            <div className="relative inline-block">
              <button onClick={toggleDropdown} className="dropdown-toggle">
                <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
              </button>
              <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="w-40 p-2"
              >
                <DropdownItem
                  tag="button"
                  onItemClick={() => {
                    openTargetModal();
                    closeDropdown();
                  }}
                  className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  Update Target
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
          <div className="relative ">
            <div className="max-h-[330px]">
              <ReactApexChart
                options={options}
                series={series}
                type="radialBar"
                height={330}
              />
            </div>

            {/* <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            +10%
          </span> */}
          </div>
          <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
            {
              summary.totalLeadValueOfToday > summary.totalLeadValueOfYesterday ?
                `You earned $${summary.totalLeadValueOfToday} today, it's higher than yesterday. Keep up your good work!` :
                summary.totalLeadValueOfToday < summary.totalLeadValueOfYesterday ?
                  `You earned $${summary.totalLeadValueOfToday} today, which is lower than yesterday. Let’s aim higher tomorrow!` :
                  `You earned $${summary.totalLeadValueOfToday} today, the same as yesterday. Stay consistent and keep pushing!`
            }
          </p>
        </div>

        <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Target
            </p>
            <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
              ${summary.currentMonthTarget}
            </p>
          </div>

          <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Achieved
            </p>
            <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
              ${summary.totalLeadValueOfMonth}
              {/* <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                fill="#039855"
              />
            </svg> */}
            </p>
          </div>

          <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Today
            </p>
            <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
              ${summary.totalLeadValueOfToday}
              {/* <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                fill="#039855"
              />
            </svg> */}
            </p>
          </div>
        </div>
      </div>
      {isTargetOpen && (
        <TargetFormPopup
          isOpen={isTargetOpen}
          onClose={closeTargetModal}
          targetData={targetDetail}
          setStatusTarget={setStatusTarget}
        />
      )}
    </>
  );
}

export default MonthlyTarget;
