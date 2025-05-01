const express = require('express');
const router = express.Router();
const {
  createProperty,
  requestToJoin,
  approveTenant,
  searchProperties
} = require('../controllers/propertyController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// PMs or Landlords create property
router.post('/create', protect, authorizeRoles('landlord', 'property_manager'), createProperty);

// Tenants request to join
router.post('/request', protect, authorizeRoles('tenant'), requestToJoin);

// PMs/Landlords approve tenant
router.post('/approve', protect, authorizeRoles('landlord', 'property_manager'), approveTenant);

// Search by location
router.get('/search', protect, searchProperties);

module.exports = router;
