"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* 🔹 Список додаткових сервісів (Task 6) */
const SERVICES = [
  "Breakfast",
  "Airport transfer",
  "Parking",
  "Spa access",
];

export default function BookingForm({ roomId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    checkIn: null,
    checkOut: null,
    services: [],
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking data:", {
      roomId,
      ...form,
    });

    setSuccess(true);
  };

  if (success) {
    return (
      <div style={successStyle}>
        ✅ Reservation successful!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {/* Name */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Name</label>
        <input
          required
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={inputStyle}
        />
      </div>

      {/* Email */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={inputStyle}
        />
      </div>

      {/* Dates */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Check-in</label>
          <DatePicker
            selected={form.checkIn}
            onChange={(date) =>
              setForm({ ...form, checkIn: date })
            }
            placeholderText="Select"
            dateFormat="yyyy-MM-dd"
            customInput={<input style={inputStyle} />}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Check-out</label>
          <DatePicker
            selected={form.checkOut}
            onChange={(date) =>
              setForm({ ...form, checkOut: date })
            }
            placeholderText="Select"
            dateFormat="yyyy-MM-dd"
            customInput={<input style={inputStyle} />}
          />
        </div>
      </div>

      {/* 🔹 Services (Task 6) */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Additional services</label>

        {SERVICES.map((service) => (
          <label
            key={service}
            style={serviceItemStyle}
          >
            <input
              type="checkbox"
              checked={form.services.includes(service)}
              onChange={(e) => {
                setForm({
                  ...form,
                  services: e.target.checked
                    ? [...form.services, service]
                    : form.services.filter(
                        (s) => s !== service
                      ),
                });
              }}
            />
            {service}
          </label>
        ))}
      </div>

      {/* Submit */}
      <button type="submit" style={buttonStyle}>
        Book room
      </button>
    </form>
  );
}

/* ===== styles ===== */

const formStyle = {
  marginTop: 24,
  padding: "24px 26px",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  background: "#fafafa",
  maxWidth: 440,
};

const fieldStyle = {
  marginBottom: 16,
};

const labelStyle = {
  display: "block",
  fontSize: 13,
  marginBottom: 6,
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "9px 0px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
};

const serviceItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  marginBottom: 6,
  color: "#374151",
};

const buttonStyle = {
  width: "100%",
  padding: "11px 0",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#fff",
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
};

const successStyle = {
  marginTop: 16,
  padding: 16,
  border: "1px solid #d1fae5",
  background: "#ecfdf5",
  borderRadius: 8,
  color: "#065f46",
};
