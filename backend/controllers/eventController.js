// controllers/eventController.js

const Event = require("../models/Event");

// ✅ CREATE EVENT (admin)
exports.createEvent = async (req, res) => {
  try {

    console.log("BODY:", req.body); 

    const event = await Event.create({
      ...req.body,
        availableSeats: req.body.totalSeats, 
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET ALL EVENTS + FILTERS
exports.getAllEvents = async (req, res) => {
  try {
    const { category, location, date } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (location) filter.location = location;

    // date filter (same day events)
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.date = { $gte: start, $lte: end };
    }

    const events = await Event.find(filter).sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET EVENT BY ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE EVENT
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};