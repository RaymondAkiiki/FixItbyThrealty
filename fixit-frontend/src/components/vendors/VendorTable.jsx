import React, { useEffect, useState } from "react";
import { getAllVendors, deleteVendor } from "../../services/vendorService";
import LoadingSpinner from "../common/LoadingSpinner";
import Pagination from "../common/Pagination";
import { useNavigate } from "react-router-dom";

const VendorTable = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await getAllVendors();
        setVendors(data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
        setError("Failed to load vendors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteVendor(id);
      setVendors((prev) => prev.filter((vendor) => vendor._id !== id));
    } catch (err) {
      console.error("Error deleting vendor:", err);
      setError("Failed to delete vendor. Please try again.");
    }
  };

  // Pagination Logic
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Vendors</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Name</th>
            <th>Contact</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentVendors.map((vendor) => (
            <tr key={vendor._id} className="border-b hover:bg-gray-100 cursor-pointer">
              <td className="py-2" onClick={() => navigate(`/vendors/${vendor._id}`)}>
                {vendor.name}
              </td>
              <td>{vendor.contact}</td>
              <td>{vendor.category}</td>
              <td>
                <button
                  onClick={() => navigate(`/vendors/edit/${vendor._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vendor._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        itemsPerPage={vendorsPerPage}
        totalItems={vendors.length}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default VendorTable;
