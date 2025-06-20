import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/trip-planner",
      label: "Trip Planner",
    },
    {
      path: "/my-trips",
      label: "My Trips",
    },
    {
      path: "/destination-explorer",
      label: "Destination Explorer",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.path}
                className="glass-button px-5 py-3 font-worksans nav-text-glass text-sm font-medium no-underline inline-block transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="glass-button p-3 nav-text-glass cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="text-lg transition-transform duration-300 rotate-90" />
              ) : (
                <FaBars className="text-lg transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="glass-mobile-menu mt-3 mx-2">
              <div className="px-6 py-5 space-y-3">
                {navItems.map((item, index) => (
                  <Link
                    to={item.path}
                    key={item.path}
                    className="glass-button block px-5 py-4 font-worksans nav-text-glass text-sm font-medium no-underline text-center transform transition-all duration-300 hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: `slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${
                        index * 50
                      }ms both`,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
