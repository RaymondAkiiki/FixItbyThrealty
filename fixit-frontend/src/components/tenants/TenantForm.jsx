// TenantForm.jsx - Form for adding/editing tenants
import React, { useState, useEffect } from 'react';

const TenantForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', unit: '' });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '', unit: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full mb-4 p-2 border rounded" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full mb-4 p-2 border rounded" required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full mb-4 p-2 border rounded" required />
      <input type="text" name="unit" value={formData.unit} onChange={handleChange} placeholder="Unit" className="w-full mb-4 p-2 border rounded" required />
      <div className="flex gap-4">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">Save</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>
      </div>
    </form>
  );
};

export default TenantForm;
