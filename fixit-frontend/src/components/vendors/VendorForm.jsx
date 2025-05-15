// VendorForm.jsx - Form for adding/editing vendors
import React, { useState } from "react";

const VendorForm = ({ onSubmit, initialData = {} }) => {
  const [vendorData, setVendorData] = useState({
    name: initialData.name || "",
    contact: initialData.contact || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vendorData);
    setVendorData({ name: "", contact: "", email: "", phone: "", address: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
      <input
        type="text"
        name="name"
        value={vendorData.name}
        placeholder="Vendor Name"
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        name="contact"
        value={vendorData.contact}
        placeholder="Contact Name"
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={vendorData.email}
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        name="phone"
        value={vendorData.phone}
        placeholder="Phone"
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        name="address"
        value={vendorData.address}
        placeholder="Address"
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Submit</button>
    </form>
  );
};

export default VendorForm;
