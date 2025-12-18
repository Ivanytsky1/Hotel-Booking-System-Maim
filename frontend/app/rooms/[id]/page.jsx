// app/rooms/[id]/page.jsx
import RoomCard from "@/components/rooms/RoomCard";
import RoomBookingSection from "@/components/rooms/RoomBookingSection";

async function fetchRoom(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load room from API");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Falling back to static room: fetch failed");

    const fallbackRooms = [
      { id: 1, name: "Standard Room", price: 50, description: "Cozy room for 2." },
      { id: 2, name: "Deluxe Room", price: 80, description: "Bigger room with a view." },
      { id: 3, name: "Suite", price: 120, description: "Spacious suite for families." },
    ];

    const numId = Number(id);
    return fallbackRooms.find((r) => r.id === numId) ?? null;
  }
}

export default async function RoomPage({ params }) {
  const { id } = params;
  const room = await fetchRoom(id);

  if (!room) {
    return <h1>Кімнату не знайдено</h1>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Деталі кімнати</h1>

      <RoomCard room={room} />

      {/* ✅ Client booking form */}
      <RoomBookingSection room={room} />
    </main>
  );
}
