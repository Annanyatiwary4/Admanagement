import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ad from "./Ad";

function Header({ ads }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg backdrop-blur-sm" : "bg-white"}`}>
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

        {/* Sign Up / Login buttons */}
        <div className="ml-6 flex space-x-3">
          <Link
            to="/login"
            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Header Ads */}
      {ads.length > 0 && (
        <div className="mt-2 container mx-auto">
          {ads.map(ad => (
            <Ad key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
