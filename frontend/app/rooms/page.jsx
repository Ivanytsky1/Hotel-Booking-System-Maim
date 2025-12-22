"use client";

import { useEffect, useState } from "react";
import RoomCard from "../../components/rooms/RoomCard";
import BookingDatePicker from "../../components/DatePicker";
import BookingForm from "../../components/BookingForm";

const FALLBACK = [
  { id: 1, name: "Standard Room", price: 50, description: "Cozy room for 2." },
  { id: 2, name: "Deluxe Room", price: 80, description: "Bigger room with a view." },
  { id: 3, name: "Suite", price: 120, description: "Spacious suite for families." },
];

function fmt(d) {
  if (!d) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function RoomsPage() {
  const [booking, setBooking] = useState({
    checkIn: null,
    checkOut: null,
    isValid: false,
  });

  const [rooms, setRooms] = useState(FALLBACK);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadRoomsByDates(checkIn, checkOut) {
    setLoading(true);
    setMessage("");

    try {
      const url = `http://localhost:5000/api/rooms?checkIn=${encodeURIComponent(
        fmt(checkIn)
      )}&checkOut=${encodeURIComponent(fmt(checkOut))}`;

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("API not ok");

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("API returned non-array");

      setRooms(data);

      if (data.length === 0) {
        setMessage("No rooms available");
      }
    } catch (e) {
      setRooms(FALLBACK);
      setMessage("Backend unavailable or filter not supported — showing fallback list");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (booking.isValid) {
      loadRoomsByDates(booking.checkIn, booking.checkOut);
    } else {
      setRooms(FALLBACK);
      setMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.isValid, booking.checkIn, booking.checkOut]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Rooms List</h1>

      <BookingDatePicker onChange={setBooking} />

      {loading && (
        <p style={{ marginTop: 12 }}>
          <b>Loading...</b>
        </p>
      )}

      {message && <p style={{ marginTop: 12 }}>{message}</p>}

            <div style={{ marginTop: 16 }}>
        {rooms.map((room, index) => (
          <a
            key={room.id ?? index}
            href={`/rooms/${room.id ?? index + 1}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <RoomCard room={room} />
          </a>
        ))}
      </div>

      <hr style={{ margin: "32px 0" }} />

      

      

    </div>
  );
}

