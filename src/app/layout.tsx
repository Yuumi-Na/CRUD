import Navbar from "../components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <header className="siteHeader">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}