import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-8 py-4 bg-gray-900/10 backdrop-blur-sm border-b-2 border-orange-500/70 shadow-lg">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-purple-900"
            >
              <path
                d="M12 2C8.5 2 6 4.5 6 8v6c0 1.5 1 3 2.5 3.5L8 20h2l1-2h2l1 2h2l-0.5-2.5c1.5-0.5 2.5-2 2.5-3.5V8c0-3.5-2.5-6-6-6z"
                fill="currentColor"
              />
              <circle cx="9" cy="10" r="1" fill="white" />
              <circle cx="15" cy="10" r="1" fill="white" />
              <path
                d="M9 13c0.5 1 1.5 1.5 3 1.5s2.5-0.5 3-1.5"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-white text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            GhostSwap
          </span>
        </Link>

        {/* Desktop Contact Button */}
        <Link
          to="/contact-us"
          className="hidden md:block border-2 border-orange-500 bg-orange-500/10 text-white px-6 py-2 rounded-full hover:bg-orange-500 hover:scale-105 transition-all duration-200 font-semibold text-lg shadow-lg"
        >
          Contact Us
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t-2 border-orange-500/50">
          <nav className="flex flex-col space-y-4 pt-4 justify-end items-end">
            <Link
              to="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-orange-500 border-2 border-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-200 font-semibold text-lg w-fit shadow-lg"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
