import { Outlet } from "@remix-run/react";
import Footer from "~/components/Layout/Footer";
import Header from "~/components/Layout/Header";
import { Toaster } from "react-hot-toast";
export default function Layout() {
  return (
    <>
      <Header />
      <div className="px-4">
        <Outlet />
      </div>
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}
