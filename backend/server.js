const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/auth", require("./routes/authRoutes"));



// Default route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
