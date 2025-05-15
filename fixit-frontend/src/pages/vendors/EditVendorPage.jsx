import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VendorForm from "../../components/vendors/VendorForm";
import { getVendorById, updateVendor } from "../../services/vendorService";
import Alert from "../../components/common/Alert";

const EditVendorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const data = await getVendorById(id);
        setVendor(data);
      } catch (err) {
        console.error("Error fetching vendor:", err);
        setError("Failed to load vendor data. Please try again.");
      }
    };

    fetchVendor();
  }, [id]);

  const handleUpdateVendor = async (vendorData) => {
    try {
      await updateVendor(id, vendorData);
      setSuccess("Vendor updated successfully!");
      setTimeout(() => navigate("/vendors"), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Error updating vendor:", err);
      setError("Failed to update vendor. Please try again.");
    }
  };

  if (!vendor) return <p>Loading vendor data...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Vendor</h2>

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <VendorForm initialData={vendor} onSubmit={handleUpdateVendor} />
    </div>
  );
};

export default EditVendorPage;
