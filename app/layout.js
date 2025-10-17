import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Mazharul Islam - Machine Learning Engineer",
  description:
    "This is the portfolio of Mazharul Islam. Machine Learning Engineer focused on Computer Vision and NLP. Passionate about applying AI to solve real-world problems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Prefer a dedicated favicon.ico for best compatibility. Add public/favicon.ico to the repo. */}
  <link rel="icon" href="/favicon.ico?v=3" />
  <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
  <link rel="shortcut icon" href="/favicon.ico?v=3" />
  <link rel="apple-touch-icon" href="/favicon.ico?v=3" />
      </head>
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
