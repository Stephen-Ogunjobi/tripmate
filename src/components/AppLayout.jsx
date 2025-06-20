import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
