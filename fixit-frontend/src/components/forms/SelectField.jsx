import React from 'react';

const SelectField = ({ label, name, value, onChange, options, required = false }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
