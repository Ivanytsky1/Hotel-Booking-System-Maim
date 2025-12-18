"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMessage("");

    // ✅ валідація
    if (!fullName.trim()) {
      setMessage("❌ Введіть Full name");
      return;
    }
    if (!email.trim()) {
      setMessage("❌ Введіть Email");
      return;
    }
    if (password.length < 4) {
      setMessage("❌ Пароль занадто короткий");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("❌ Паролі не співпадають");
      return;
    }

    setLoading(true);

    try {
      // ✅ MOCK "sending to backend"
      await new Promise((r) => setTimeout(r, 500));

      // збережемо "зареєстрованого" користувача локально (для демонстрації)
      localStorage.setItem(
        "mock_registered_user",
        JSON.stringify({ fullName, email })
      );

      setMessage("✅ Реєстрація успішна (mock). Переходимо на Login...");
      setTimeout(() => router.push("/login"), 700);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Register Page</h1>

      <form onSubmit={onSubmit} style={{ maxWidth: 560 }}>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full name"
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

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

        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          type="password"
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 10, cursor: "pointer" }}
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 12, color: message.startsWith("❌") ? "crimson" : "green" }}>
          {message}
        </p>
      )}

      <p style={{ marginTop: 12 }}>
        Вже є акаунт? <a href="/login">Login</a>
      </p>
    </main>
  );
}
