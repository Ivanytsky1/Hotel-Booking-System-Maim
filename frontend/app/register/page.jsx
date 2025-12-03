export default function RegisterPage() {
  return (
    <div>
      <h1>Register Page</h1>
      <form style={{ display: "flex", flexDirection: "column", maxWidth: 320, gap: 12 }}>
        <input type="text" placeholder="Full name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}