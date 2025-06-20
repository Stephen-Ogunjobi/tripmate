import React from "react";
import {
  FaPlaneDeparture,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    services: [
      { name: "Trip Planner", href: "/trip-planner" },
      { name: "Destination Explorer", href: "/destination-explorer" },
      { name: "My Trips", href: "/my-trips" },
      { name: "Travel Guides", href: "/guides" },
      { name: "Group Travel", href: "/group-travel" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Travel Insurance", href: "/insurance" },
      { name: "Booking Support", href: "/booking-support" },
      { name: "Cancellation Policy", href: "/cancellation" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refunds" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      text: "123 Travel Street, Adventure City, AC 12345",
    },
    { icon: FaPhone, text: "+1 (555) 123-4567" },
    { icon: FaEnvelope, text: "hello@tripmate.com" },
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <FaPlaneDeparture className="text-2xl text-secondary" />
              <h3 className="font-logo text-2xl font-bold">TripMate</h3>
            </div>
            <p className="font-worksans text-gray-300 leading-relaxed mb-6 max-w-sm">
              Your ultimate travel companion for planning unforgettable
              journeys. Discover amazing destinations, create perfect
              itineraries, and make memories that last a lifetime.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <IconComponent className="text-secondary mt-1 flex-shrink-0" />
                    <span className="font-worksans text-sm text-gray-300">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-secondary hover:bg-white hover:text-secondary rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <IconComponent className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-primary text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-worksans text-gray-300 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-primary text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-worksans text-gray-300 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-primary text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-worksans text-gray-300 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-primary text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-worksans text-gray-300 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-600">
          <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h4 className="font-primary text-xl font-bold mb-2">
                Stay Updated with Travel Deals
              </h4>
              <p className="font-worksans text-gray-300 text-sm mb-4 lg:mb-0">
                Get exclusive offers, travel tips, and destination inspiration
                delivered to your inbox.
              </p>
            </div>
            <div className="lg:ml-8 lg:flex-shrink-0">
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 font-worksans text-sm border-none outline-none focus:ring-2 focus:ring-secondary"
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-white hover:text-secondary text-white font-worksans font-semibold px-6 py-3 rounded-lg transition-colors duration-200 border-none cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-worksans text-sm text-gray-300">
              <span>© 2024 TripMate. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 font-worksans text-sm text-gray-300">
              <span>Made with</span>
              <FaHeart className="text-red-400 text-xs" />
              <span>for travelers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
