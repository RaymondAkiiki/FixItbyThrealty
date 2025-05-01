import { useEffect, useState } from "react";
import axios from "axios";

const VendorListPage = () => {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: "", contact: "" });

  const fetchVendors = async () => {
    try {
      const res = await axios.get("/api/vendors");
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleAddVendor = async () => {
    try {
      await axios.post("/api/vendors", newVendor);
      setNewVendor({ name: "", contact: "" });
      fetchVendors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Vendors</h2>

      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Vendor name"
          value={newVendor.name}
          onChange={(e) =>
            setNewVendor({ ...newVendor, name: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2"
          placeholder="Contact info"
          value={newVendor.contact}
          onChange={(e) =>
            setNewVendor({ ...newVendor, contact: e.target.value })
          }
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddVendor}
        >
          Add Vendor
        </button>
      </div>

      <ul className="list-disc ml-5">
        {vendors.map((v) => (
          <li key={v._id}>
            <strong>{v.name}</strong> - {v.contact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorListPage;
