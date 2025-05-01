const Property = require('../models/Property');
const User = require('../models/User');

// Create property (PMs/Landlords)
exports.createProperty = async (req, res) => {
  const { name, location } = req.body;
  try {
    const property = await Property.create({
      name,
      location,
      createdBy: req.user._id
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tenant requests to join
exports.requestToJoin = async (req, res) => {
  const { propertyId } = req.body;
  try {
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.pendingTenants.includes(req.user._id) || property.tenants.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already requested or linked' });
    }

    property.pendingTenants.push(req.user._id);
    await property.save();

    res.json({ message: 'Request sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve tenant (only by property creator)
exports.approveTenant = async (req, res) => {
  const { propertyId, tenantId } = req.body;
  try {
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (!property.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    if (!property.pendingTenants.includes(tenantId)) {
      return res.status(400).json({ message: 'Tenant not found in pending list' });
    }

    // Move from pending to tenants
    property.pendingTenants.pull(tenantId);
    property.tenants.push(tenantId);
    await property.save();

    // Update user
    await User.findByIdAndUpdate(tenantId, {
      approved: true,
      property: propertyId
    });

    res.json({ message: 'Tenant approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all properties (search by location)
exports.searchProperties = async (req, res) => {
  const { location } = req.query;
  try {
    const props = await Property.find({ location: { $regex: location, $options: 'i' } });
    res.json(props);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
