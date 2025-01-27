import { Avenir } from "@/fonts/fonts";
import "./globals.css";

export const metadata = {
  title: "ATP - Tarifario Web",
  description: "Tarifario web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Avenir.className}>{children}</body>
    </html>
  );
}
