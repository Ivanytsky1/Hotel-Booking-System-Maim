const express = require("express");
const Booking = require("../models/Booking");
const Room = require("../models/Room");

const router = express.Router();

// ============================
// POST /booking — create booking
// ============================
router.post("/booking", async (req, res) => {
  try {
    const { room_id, user_id, check_in_date, check_out_date, total_price } = req.body;

    if (!room_id || !user_id || !check_in_date || !check_out_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date);

    if (isNaN(checkIn) || isNaN(checkOut)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    if (checkOut <= checkIn) {
      return res.status(400).json({
        error: "Check-out date must be later than check-in date"
      });
    }

    const room = await Room.findById(room_id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const overlappingBooking = await Booking.findOne({
      room_id: room_id,
      check_in_date: { $lt: checkOut },
      check_out_date: { $gt: checkIn },
    });

    if (overlappingBooking) {
      return res.status(400).json({ error: "Room is not available for selected dates" });
    }

    const newBooking = new Booking({
      room_id,
      user_id,
      check_in_date: checkIn,
      check_out_date: checkOut,
      total_price,
      services: [],     // ← Додаємо поле для сервісів
      status: "pending",
    });

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      message: "Booking created successfully",
      booking_id: savedBooking._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


// ========================================
// POST /booking/:id/services — Task 5 (US9)
// ========================================
router.post("/booking/:id/services", async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        error: "Service name and price are required"
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Add service
    booking.services.push({ name, price });

    // Update price
    booking.total_price += price;

    await booking.save();

    res.status(200).json({
      message: "Service added successfully",
      booking,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
