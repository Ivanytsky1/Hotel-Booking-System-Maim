export default function RoomDetails({ params }) {
  return (
    <div>
      <h1>Room details</h1>
      <p>Room ID: {params.id}</p>
      <p>
        Here you can later load full room information from your backend
        (description, photos, price, capacity, etc.).
      </p>
      <a href="/rooms">Go back to rooms list</a>
    </div>
  );
}