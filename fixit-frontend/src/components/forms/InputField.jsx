import React from 'react';

const InputField = ({ label, name, value, onChange, placeholder, type = "text", required = false }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
        </div>
    );
};

export default InputField;
