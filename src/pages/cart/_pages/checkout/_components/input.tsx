import React from "react";

interface InputGroupProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    children?: React.ReactNode; // dùng cho select
}

const InputGroup = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    required = false,
    disabled = false,
    children
}: InputGroupProps) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            {children ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none bg-white appearance-none cursor-pointer hover:border-gray-400"
                    required={required}
                    disabled={disabled}
                >
                    {children}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none"
                    required={required}
                    disabled={disabled}
                />
            )}
        </div>
    );
};

export default InputGroup;
