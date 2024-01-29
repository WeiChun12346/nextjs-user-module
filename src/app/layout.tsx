"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <main>{children}</main>
        </LocalizationProvider>
      </body>
    </html>
  );
}