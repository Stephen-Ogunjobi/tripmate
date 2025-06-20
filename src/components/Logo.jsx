import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="glass-logo flex items-center gap-2 no-underline">
      <FaPlaneDeparture className="text-xl text-secondary" />
      <h1 className="font-logo text-gray-50 text-xl m-0">TripMate</h1>
    </Link>
  );
}
