import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Ad from "./Ad";

function Header({ ads, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultAvatar = "https://i.pravatar.cc/40";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg backdrop-blur-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">TheToolX</Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link to="/tools" className="hover:underline">Tools</Link>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </nav>

        {/* User Section */}
        <div className="ml-6 flex items-center space-x-3 relative" ref={dropdownRef}>
          {user ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user.avatar || defaultAvatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
              <span className="text-gray-700 font-medium">Welcome, {user.username}</span>
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100 transition">Login</Link>
              <Link to="/signup" className="bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-300 transition">Sign Up</Link>
            </>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && user && (
            <div className="absolute right-0 mt-10 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

     
    </header>
  );
}

export default Header;
