import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Outlet context={{}} />
      </div>
    </>
  );
}

export default Layout;
