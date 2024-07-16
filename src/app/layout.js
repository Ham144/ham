import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionContext from "./components/SessionContext";
import { Toaster } from "react-hot-toast";
import AuthenticationProvider, { GlobalContext } from "./components/GlobalContext";
import Providers from "./components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nasi Goreng Seller ",
  description: "Nasi goreng lezat dan enak",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {/* <GlobalProvider> */}
        <AuthenticationProvider>
          <SessionContext>
            <Providers>
              <Navbar />
              <Toaster />
              <div className="flex w-full h-[100px] ">
                {/* ini untuk menjaga semua page tidak mepet keatas dan tidak tertutup fixed navbar */}
              </div>
              <div className="
                bg-gradient-to-br from-amber-50 via-amber-50 to-red-100
                ">
                {children}
              </div>
              <Footer />
            </Providers>
          </SessionContext>
        </AuthenticationProvider>
        {/* </GlobalProvider> */}

      </body>
    </html >
  );
}
