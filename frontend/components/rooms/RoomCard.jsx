// components/rooms/RoomCard.jsx

export default function RoomCard({ room, name, price, description, imageUrl }) {
  // Універсальний варіант: підтримує і room={room}, і окремі пропси
  const data = room ?? { name, price, description, imageUrl };

  const finalName =
    data.name ?? data.title ?? `Room ${data.id ?? ""}`.trim();

  const finalPrice =
    data.price ?? data.pricePerNight ?? 0;

  // Картинка:
  // 1) якщо бекенд дає imageUrl / image → беремо її
  // 2) інакше пробуємо `/room{id}.jpg` з папки public
  const finalImage =
    data.imageUrl ??
    data.image ??
    (data.id ? `/room${data.id}.jpg` : null);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "12px",
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      {finalImage && (
        <img
          src={finalImage}
          alt={finalName}
          style={{
            width: "150px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      )}

      <div>
        <h2 style={{ marginTop: 0, marginBottom: "8px" }}>{finalName}</h2>

        <p style={{ margin: 0, fontWeight: "bold" }}>
          Price per night: ${finalPrice}
        </p>

        {data.description && (
          <p style={{ marginTop: "8px" }}>{data.description}</p>
        )}
      </div>
    </div>
  );
}
