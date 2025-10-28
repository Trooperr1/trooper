import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nystrom Plumbing - Professional Plumbing Services in Charlotte, NC",
  description: "Expert plumbing services in Charlotte, NC. 24/7 emergency service, licensed & insured. Specializing in repairs, installations, and maintenance.",
  keywords: "plumbing, Charlotte, NC, emergency plumber, drain cleaning, water heater",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
