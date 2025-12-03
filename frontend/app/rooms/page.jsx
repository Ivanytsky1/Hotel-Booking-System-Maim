import RoomCard from "../../components/rooms/RoomCard";

const mockRooms = [
  { id: 1, name: "Standard Room", price: 50 },
  { id: 2, name: "Deluxe Room", price: 80 },
  { id: 3, name: "Suite", price: 120 },
];

export default function RoomsPage() {
  return (
    <div>
      <h1>Rooms List</h1>
      <p>This is a simple static list. Later you can replace it with data from your backend.</p>
      {mockRooms.map((room) => (
        <a
          key={room.id}
          href={`/rooms/${room.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <RoomCard name={room.name} price={room.price} />
        </a>
      ))}
    </div>
  );
}