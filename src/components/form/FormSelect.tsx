import { ErrorMessage } from "formik";
import React, { useState } from "react";

interface Option {
    value: number;
    label: string;
}

interface SelectProps {
    options: Option[];
    placeholder?: string;
    handleChange: any;
    handleBlur: any;
    name: string;
    value: string;
    className?: string;
    error: boolean;
}

const FormSelect: React.FC<SelectProps> = ({
    options,
    placeholder = "Select an option",
    handleChange,
    handleBlur,
    className = "",
    value = "",
    name = "",
    error = false,

}) => {
    // Manage the selected value

    let selectClasses = `h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none dark:placeholder:text-white/30 ${className}`;

    if (error) {
        selectClasses += `bg-transparent text-gray-400 border-error-300 focus:border-error-300 focus:ring focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
    } else {
        selectClasses += `bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }

    return (

        <div className="relative">
            <select
                className={`${selectClasses} ${value
                    ? "text-gray-800 dark:text-white/90"
                    : "text-gray-400 dark:text-gray-400"
                    }`}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                name={name}
            >
                {/* Placeholder option */}
                <option
                    value=""
                    disabled
                    className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                    {placeholder}
                </option>
                {/* Map over options */}
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <ErrorMessage className="mt-1.5 text-xs text-error-500" component='p' name={name!} />
        </div>
    );
};

export default FormSelect;
