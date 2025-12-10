const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// ROUTES
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/auth", require("./routes/authRoutes"));

// Booking Routes (Task 5 + Full Booking API)
app.use("/api", require("./routes/bookingRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
