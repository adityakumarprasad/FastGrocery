
import "./globals.css";
import Provider from "@/Provider";

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
      <body className="w-full min-h-screen bg-linear-to-b from-green-200 to-white"
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
