const express = require("express");
const Booking = require("../models/Booking");
const Room = require("../models/Room");

const router = express.Router();

// POST /booking — create a booking
router.post("/booking", async (req, res) => {
  try {
    // 1. Get data from request body
    const { room_id, user_id, check_in_date, check_out_date, total_price } = req.body;

    // 2. Check required fields
    if (!room_id || !user_id || !check_in_date || !check_out_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 3. Validate dates
    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date);

    if (isNaN(checkIn) || isNaN(checkOut)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    if (checkOut <= checkIn) {
      return res
        .status(400)
        .json({ error: "Check-out date must be later than check-in date" });
    }

    // 4. Check if room exists
    const room = await Room.findById(room_id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // 5. Availability check — find overlapping bookings
    const overlappingBooking = await Booking.findOne({
      room_id: room_id,
      check_in_date: { $lt: checkOut },
      check_out_date: { $gt: checkIn },
    });

    if (overlappingBooking) {
      return res.status(400).json({ error: "Room is not available for selected dates" });
    }

    // 6. Create new booking
    const newBooking = new Booking({
      room_id,
      user_id,
      check_in_date: checkIn,
      check_out_date: checkOut,
      total_price,
      status: "pending",
    });

    const savedBooking = await newBooking.save();

    // 7. Return success response
    return res.status(201).json({
      message: "Booking created successfully",
      booking_id: savedBooking._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
