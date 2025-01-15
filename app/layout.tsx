import {
  avenirLight,
  avenirMedium,
  avenirHeavy,
  avenirBold,
} from "@/fonts/fonts";
import "./globals.css";

export const metadata = {
  title: "ATP Solutions - Tarifario",
  description: "Tarifario web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${avenirLight.variable} ${avenirMedium.variable} ${avenirHeavy.variable} ${avenirBold.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
