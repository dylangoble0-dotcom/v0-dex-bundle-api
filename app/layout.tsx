import "./globals.css";
import "../styles/global.css";

export const metadata = {
  title: "XO Development",
  description: "Occult-Tech Cloud Automation & Infrastructure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}