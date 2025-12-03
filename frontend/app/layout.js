export const metadata = {
  title: "Hotel Booking System",
  description: "Simple hotel booking frontend on Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <header style={{ padding: "16px 24px", background: "#111827", color: "white" }}>
          <h2 style={{ margin: 0 }}>Hotel Booking</h2>
        </header>

        <main style={{ padding: "24px" }}>
          {children}
        </main>

        <footer style={{ padding: "16px 24px", background: "#F3F4F6", marginTop: "40px", fontSize: "14px" }}>
          © 2025 Hotel Booking System
        </footer>
      </body>
    </html>
  );
}