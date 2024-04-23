import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionContext from "./components/SessionContext";
import GlobalProvider from "./components/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionContext>
          <GlobalProvider>
            <Navbar />
            {children}
            <Footer />
          </GlobalProvider>
        </SessionContext>
      </body>
    </html>
  );
}
