// app/rooms/page.jsx
import RoomCard from "../../components/rooms/RoomCard";

async function fetchRooms() {
  try {
    const res = await fetch("http://localhost:5000/api/rooms", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load rooms from API");
    }

    const data = await res.json();
    return data; // очікуємо масив кімнат
  } catch (error) {
    console.log("Falling back to static rooms list: fetch failed");

    // fallback-список, коли бекенд не доступний
    return [
      { id: 1, name: "Standard Room", price: 50, description: "Cozy room for 2." },
      { id: 2, name: "Deluxe Room", price: 80, description: "Bigger room with a view." },
      { id: 3, name: "Suite", price: 120, description: "Spacious suite for families." },
    ];
  }
}

export default async function RoomsPage() {
  const rooms = await fetchRooms();

  return (
    <div>
      <h1>Rooms List</h1>
      <p>
        Rooms are displayed as cards. If the backend is available, data is
        loaded from the API. Otherwise, a static fallback list is used.
      </p>

      {rooms.map((room, index) => (
        <a
          key={room.id ?? index}
          href={`/rooms/${room.id ?? index + 1}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <RoomCard
            name={room.name ?? "Room"}
            price={room.price ?? 0}
            description={room.description}
          />
        </a>
      ))}
    </div>
  );
}
