import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="modern-logo flex items-center gap-2 no-underline">
      <FaPlaneDeparture className="text-xl text-white" />
      <h1 className="font-logo text-white text-xl m-0">TripMate</h1>
    </Link>
  );
}
