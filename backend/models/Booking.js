const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    check_in_date: {
      type: Date,
      required: true,
    },
    
    total_price: {
      type: Number,
      required: true,
    },

    check_out_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.check_in_date;
        },
        message: "Check-out date must be later than check-in date",
      },
    },


    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
