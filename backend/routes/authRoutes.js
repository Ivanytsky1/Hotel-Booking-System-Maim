const express = require("express");
const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// REGISTER CLIENT
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newClient.save();

    res.status(201).json({
      message: "Client registered successfully",
      client: {
        id: newClient._id,
        email: newClient.email,
        name: newClient.name
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN CLIENT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: client._id, email: client.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      client: {
        id: client._id,
        name: client.name,
        email: client.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
