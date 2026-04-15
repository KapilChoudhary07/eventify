const express = require("express");
const router = express.Router();
const{ protect, admin} = require("../middleware/auth.js")
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");



// 📃 Get all events (public)
router.get("/", getAllEvents);

// 📄 Get single event (public)
router.get("/:id", getEventById);

// ➕ Create event (admin only)
router.post("/", protect, admin, createEvent);

// ✏️ Update event (admin only)
router.put("/:id", protect, admin, updateEvent);

// ❌ Delete event (admin only)
router.delete("/:id", protect, admin, deleteEvent);

module.exports = router;