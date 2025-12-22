"use client";

import BookingForm from "@/components/BookingForm";

export default function RoomBookingSection({ room }) {
  return (
    <section style={{ marginTop: 32 }}>
      <h2>Book this room</h2>

      <BookingForm roomId={room.id} />
    </section>
  );
}
