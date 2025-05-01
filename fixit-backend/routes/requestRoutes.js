const express = require('express');
const router = express.Router();
const {
  createRequest,
  getUserRequests,
  addComment,
  updateStatus,
  getFilteredRequests
} = require('../controllers/requestController');
const { protect, authorizeRoles} = require('../middleware/authMiddleware');
const requestController = require('../controllers/requestController');

// Create maintenance request
router.post('/create', protect, createRequest);

// Fetch user-related requests
router.get('/mine', protect, getUserRequests);

// Comment on request
router.post('/comment', protect, addComment);

// Update request status
router.put('/status', protect, updateStatus);

//Update route in requestRoutes.js for filter requests.
router.get('/dashboard', protect, getFilteredRequests);

// backend/routes/requestRoutes.js
router.get("/", protect,getUserRequests); // GET /api/requests

router.post("/:id/feedback", authorizeRoles, requestController.submitFeedback);


module.exports = router;
