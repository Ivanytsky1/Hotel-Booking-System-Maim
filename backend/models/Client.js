const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true }
});

module.exports = mongoose.model("Client", ClientSchema);
