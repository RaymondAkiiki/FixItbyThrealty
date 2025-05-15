import React, { useState } from 'react';

const AuthForm = ({ title, fields, onSubmit, buttonText }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
            {fields.map((field) => (
                <div key={field.name} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required={field.required}
                    />
                </div>
            ))}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                {buttonText}
            </button>
        </form>
    );
};

export default AuthForm;
