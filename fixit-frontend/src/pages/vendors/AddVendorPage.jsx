import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorForm from "../../components/vendors/VendorForm";
import { addVendor } from "../../services/vendorService";
import Alert from "../../components/common/Alert";

const AddVendorPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddVendor = async (vendorData) => {
    try {
      await addVendor(vendorData);
      setSuccess("Vendor added successfully!");
      setTimeout(() => navigate("/vendors"), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Error adding vendor:", err);
      setError("Failed to add vendor. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Vendor</h2>

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <VendorForm onSubmit={handleAddVendor} />
    </div>
  );
};

export default AddVendorPage;
