export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <form style={{ display: "flex", flexDirection: "column", maxWidth: 320, gap: 12 }}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}