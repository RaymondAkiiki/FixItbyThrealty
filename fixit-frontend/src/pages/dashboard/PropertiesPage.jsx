
import React, { useEffect, useState } from 'react';
import PropertyTable from '../../components/properties/PropertyTable';
import PropertyCard from '../../components/properties/PropertyCard';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import { getAllProperties, deleteProperty } from '../../services/propertyService';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    try {
      await deleteProperty(propertyId);
      setProperties(properties.filter((property) => property._id !== propertyId));
    } catch (err) {
      setError('Failed to delete property');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Button text="Add Property" onClick={() => console.log('Add Property')} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PropertyTable properties={properties} onDelete={handleDelete} />
      )}
      <Pagination totalItems={properties.length} itemsPerPage={10} />
    </div>
  );
};

export default PropertiesPage;
