// /src/pages/dashboard/Vendors.jsx
import React, { useState, useEffect } from "react";
import VendorService from "../../services/VendorService";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: "", type: "", contact: "" });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorList = await VendorService.getVendors();
        setVendors(vendorList);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleAddVendor = async () => {
    try {
      await VendorService.addVendor(newVendor);
      setVendors([...vendors, newVendor]);
      setNewVendor({ name: "", type: "", contact: "" });
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Vendors</h1>
      <div className="mb-4">
        <h3 className="text-xl">Add New Vendor</h3>
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Vendor Name"
          value={newVendor.name}
          onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Vendor Type"
          value={newVendor.type}
          onChange={(e) => setNewVendor({ ...newVendor, type: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Vendor Contact"
          value={newVendor.contact}
          onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAddVendor}>
          Add Vendor
        </button>
      </div>

      <div>
        <h3 className="text-xl">Existing Vendors</h3>
        <ul className="list-disc pl-5">
          {vendors.map((vendor, index) => (
            <li key={index}>
              {vendor.name} - {vendor.type} - {vendor.contact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// VendorsPage.jsx
export default function VendorsPage() {
  return <div>Vendors Page</div>;
}
