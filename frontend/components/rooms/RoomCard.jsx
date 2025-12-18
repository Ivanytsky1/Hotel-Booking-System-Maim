"use client";

export default function RoomCard({ room, name, price, description, image }) {
  // Підтримуємо обидва варіанти: або передали room, або окремі поля
  const data = room ?? { name, price, description, image };

  const title = data?.name ?? "Room";
  const cost = data?.price ?? 0;
  const desc = data?.description ?? "";

  // Якщо з API не прийшло зображення — підставимо з public
  // room1.jpg / room2.jpg / room3.jpg
  const imgSrc =
    data?.image ||
    data?.imageUrl ||
    (data?.id ? `/room${data.id}.jpg` : "/room1.jpg");

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        display: "flex",
        gap: 16,
        alignItems: "center",
      }}
    >
      <img
        src={imgSrc}
        alt={title}
        style={{
          width: 160,
          height: 100,
          objectFit: "cover",
          borderRadius: 10,
          flexShrink: 0,
        }}
        onError={(e) => {
          e.currentTarget.src = "/room1.jpg";
        }}
      />

      <div>
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>{title}</h2>

        <p style={{ margin: 0, fontWeight: "bold" }}>
          Price per night: ${cost}
        </p>

        {desc && <p style={{ marginTop: 8 }}>{desc}</p>}
      </div>
    </div>
  );
}
