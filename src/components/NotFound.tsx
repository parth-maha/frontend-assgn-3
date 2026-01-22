import React from "react";
import Navbar from "./layout/Navbar";

function NotFound() {
  return (
    <>
      <Navbar/>
      <span className="text-center flex pt-20 justify-center text-red-500">
        Page not found
      </span>
    </>
  );
}

export default NotFound;
