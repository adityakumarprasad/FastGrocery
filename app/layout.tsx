
import "./globals.css";

export const metadata = {
  title: "FastGrocery",
  description: "10 minutes grocery delivery service",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
