"use client";

import { useMemo, useState } from "react";

const MOCK_RESERVATIONS = [
  {
    id: "R-1001",
    roomId: 1,
    roomName: "Standard Room",
    name: "Andriy",
    email: "andriy@mail.com",
    checkIn: "2025-12-20",
    checkOut: "2025-12-22",
    services: ["Breakfast", "Parking"],
    status: "Pending",
  },
  {
    id: "R-1002",
    roomId: 2,
    roomName: "Deluxe Room",
    name: "Oleh",
    email: "oleh@mail.com",
    checkIn: "2025-12-24",
    checkOut: "2025-12-27",
    services: ["Spa access"],
    status: "Confirmed",
  },
  {
    id: "R-1003",
    roomId: 3,
    roomName: "Suite",
    name: "Ira",
    email: "ira@mail.com",
    checkIn: "2025-12-29",
    checkOut: "2025-12-30",
    services: [],
    status: "Cancelled",
  },
];

export default function AdminReservationsPage() {
  // Filters
  const [q, setQ] = useState("");
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [room, setRoom] = useState("all");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return reservations.filter((r) => {
      const matchesQuery =
        !query ||
        r.name.toLowerCase().includes(query) ||
        r.email.toLowerCase().includes(query) ||
        r.id.toLowerCase().includes(query);

      const matchesRoom = room === "all" || String(r.roomId) === room;

      return matchesQuery && matchesRoom;
    });
  }, [q, room, reservations]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, totalPages]);

  // якщо змінився фільтр — скидаємо на 1 сторінку
  // (простий спосіб: коли міняєш q/room — вручну setPage(1) в onChange)

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin: All Reservations</h1>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, margin: "12px 0 16px" }}>
        <input
          placeholder="Search (name / email / id)"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          style={{ padding: 8, flex: 1 }}
        />

        <select
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
            setPage(1);
          }}
          style={{ padding: 8 }}
        >
          <option value="all">All rooms</option>
          <option value="1">Standard Room</option>
          <option value="2">Deluxe Room</option>
          <option value="3">Suite</option>
        </select>
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #e5e7eb",
        }}
      >
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            <Th>ID</Th>
            <Th>Room</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Check-in</Th>
            <Th>Check-out</Th>
            <Th>Services</Th>
            <Th>Status</Th>
          </tr>
        </thead>

        <tbody>
          {paged.map((r) => (
            <tr key={r.id} style={{ borderTop: "1px solid #e5e7eb" }}>
              <Td>{r.id}</Td>
              <Td>{r.roomName}</Td>
              <Td>{r.name}</Td>
              <Td>{r.email}</Td>
              <Td>{r.checkIn}</Td>
              <Td>{r.checkOut}</Td>
              <Td>{r.services.length ? r.services.join(", ") : "-"}</Td>
              <Td>
  <select
    value={r.status}
    onChange={(e) => {
      const newStatus = e.target.value;

      // 🔹 імітація API-запиту
      console.log("Update status:", r.id, newStatus);

      setReservations((prev) =>
        prev.map((item) =>
          item.id === r.id
            ? { ...item, status: newStatus }
            : item
        )
      );
    }}
    style={{ padding: "6px 8px" }}
  >
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</Td>
            </tr>
          ))}

          {paged.length === 0 && (
            <tr>
              <Td colSpan={8} style={{ textAlign: "center", padding: 16 }}>
                No reservations found
              </Td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 12,
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          style={{ padding: "8px 12px" }}
        >
          Prev
        </button>

        <div>
          Page <b>{page}</b> / {totalPages}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          style={{ padding: "8px 12px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th style={{ textAlign: "left", padding: 10, fontSize: 13, color: "#374151" }}>
      {children}
    </th>
  );
}

function Td({ children, ...props }) {
  return (
    <td style={{ padding: 10, fontSize: 14, color: "#111827" }} {...props}>
      {children}
    </td>
  );
}


// 2353444
