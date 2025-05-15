import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VendorCard from "../../components/vendors/VendorCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { getVendorById, deleteVendor } from "../../services/vendorService";

const VendorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const data = await getVendorById(id);
        setVendor(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load vendor details.");
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteVendor(id);
      navigate("/vendors");
    } catch (err) {
      setError("Failed to delete vendor.");
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) return <p className="text-red-600">{error}</p>;

  if (!vendor) return <p>Vendor not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <VendorCard vendor={vendor} />
      <div className="flex space-x-4 mt-4">
        <Button onClick={() => navigate(`/vendors/${id}/edit`)} variant="primary">
          Edit Vendor
        </Button>
        <Button onClick={() => setShowDeleteModal(true)} variant="danger">
          Delete Vendor
        </Button>
      </div>

      {showDeleteModal && (
        <Modal
          title="Delete Vendor"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        >
          Are you sure you want to delete this vendor? This action cannot be undone.
        </Modal>
      )}
    </div>
  );
};

export default VendorDetailsPage;
