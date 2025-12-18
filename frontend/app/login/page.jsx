"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // ✅ MOCK login rules:
    // email: test@test.com
    // password: 123456
    try {
      await new Promise((r) => setTimeout(r, 400)); // маленька "імітація" запиту

      if (email.trim().toLowerCase() === "test@test.com" && password === "123456") {
        // ✅ зберігаємо "сесію"
        localStorage.setItem("mock_token", "ok");
        localStorage.setItem("mock_user", JSON.stringify({ email }));

        setMessage("✅ Успішний логін! Переходимо до кімнат...");
        router.push("/rooms");
      } else {
        setMessage("❌ Невірний email або пароль (mock: test@test.com / 123456)");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Login Page</h1>

      <form onSubmit={onSubmit} style={{ maxWidth: 420 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 10, cursor: "pointer" }}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}

      <p style={{ marginTop: 12 }}>
        Нема акаунта? <a href="/register">Register</a>
      </p>

      <p style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
        Mock дані для входу: <b>test@test.com</b> / <b>123456</b>
      </p>
    </main>
  );
}
