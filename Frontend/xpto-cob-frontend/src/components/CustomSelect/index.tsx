'use client'

import React, { useRef } from "react";
import { HiChevronDown } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";



interface CustomSelectProps {
    options: any[];
    value: number | string;
    onChange: any;
    placeholder?: string;
    required: boolean;
}

export default function CustomSelect({ options, value, onChange, placeholder, required }: CustomSelectProps) {
    return (
        <div className="w-full flex items-center gap-1">
            <p>Filtrar por:</p>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-auto p-1 rounded-sm border-1 border-blue-300 bg-gray-100 dark:bg-gray-700"
                required={required}
            >
                {placeholder != null && <option value="" className="text-gray-500">{placeholder}</option>}
                {options.map((option: any) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}

            </select>
        </div>


    );
};


