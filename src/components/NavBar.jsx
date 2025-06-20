import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`modern-nav fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.path}
                className="modern-nav-link px-4 py-2 font-worksans text-sm font-medium no-underline rounded-lg transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="modern-menu-btn p-2 rounded-lg transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="text-lg transition-transform duration-300" />
              ) : (
                <FaBars className="text-lg transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="modern-mobile-menu mt-2 mx-2 rounded-xl overflow-hidden">
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    to={item.path}
                    key={item.path}
                    className="modern-mobile-link block px-4 py-3 font-worksans text-sm font-medium no-underline rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: `slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${
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
