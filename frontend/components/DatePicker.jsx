"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingDatePicker({ onChange }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const today = new Date();

  const isValid = !!(checkIn && checkOut && checkOut > checkIn);

  function emit(nextIn, nextOut) {
    onChange?.({
      checkIn: nextIn,
      checkOut: nextOut,
      isValid: !!(nextIn && nextOut && nextOut > nextIn),
    });
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>Вибір дат</h3>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div>
          <b>Check-in</b>
          <br />
          <DatePicker
            selected={checkIn}
            onChange={(d) => {
              setCheckIn(d);

              // якщо check-out став некоректним — скидаємо
              if (checkOut && d && checkOut <= d) {
                setCheckOut(null);
                emit(d, null);
              } else {
                emit(d, checkOut);
              }
            }}
            minDate={today}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select"
          />
        </div>

        <div>
          <b>Check-out</b>
          <br />
          <DatePicker
            selected={checkOut}
            onChange={(d) => {
              setCheckOut(d);
              emit(checkIn, d);
            }}
            minDate={checkIn || today}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select"
          />
        </div>
      </div>

      {!isValid && checkIn && checkOut && (
        <p style={{ color: "crimson", marginTop: 10 }}>
          Check-out має бути пізніше за check-in
        </p>
      )}
    </div>
  );
}
