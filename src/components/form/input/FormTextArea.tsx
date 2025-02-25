import { ErrorMessage } from "formik";
import React from "react";

interface TextareaProps {
    placeholder?: string;
    rows?: number;
    value: string;
    handleChange: any;
    handleBlur: any;
    className?: string;
    disabled?: boolean;
    error: boolean;
    hint?: string;
    name: string;
}

const FormTextArea: React.FC<TextareaProps> = ({
    placeholder = "Enter your message",
    rows = 3,
    value = "",
    handleChange,
    handleBlur,
    className = "",
    disabled = false,
    error = false,
    hint = "",
    name = "",
}) => {

    let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none ${className}`;
    if (disabled) {
        textareaClasses += `bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
        textareaClasses += `text-error-800 border-error-500 focus:ring focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
    } else {
        textareaClasses += `bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }
    return (
        <div className="relative">
            <textarea
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                className={textareaClasses}
                name={name}
            />
            <ErrorMessage className="text-xs text-error-500" component='p' name={name!} />
        </div>
    );
};

export default FormTextArea;
