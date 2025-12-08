const express = require("express");
const BookingService = require("../models/BookingService");

const router = express.Router();

// ADD SERVICE TO BOOKING
router.post("/", async (req, res) => {
  try {
    const newRecord = new BookingService(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET SERVICES FOR BOOKING
router.get("/:bookingId", async (req, res) => {
  try {
    const items = await BookingService.find({
      bookingId: req.params.bookingId,
    }).populate("serviceId");

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
