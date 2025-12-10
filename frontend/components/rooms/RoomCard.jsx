// components/rooms/RoomCard.jsx

export default function RoomCard({ name, price, description }) {
  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ margin: "0 0 8px" }}>{name}</h3>
      <p style={{ margin: 0 }}>Price per night: ${price}</p>

      {description && (
        <p style={{ margin: "4px 0 0", color: "#555" }}>{description}</p>
      )}
    </div>
  );
}

