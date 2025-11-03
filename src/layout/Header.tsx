import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/images/logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f1b34] backdrop-blur-xl shadow-2xl border-b border-orange-500/30"
          : "bg-[#0f1b34] backdrop-blur-md border-b border-orange-500/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[100px]">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden">
                <img
                  src={logoImg}
                  alt="ShieldSwap Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-orange-100 to-purple-200 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-purple-300 transition-all duration-300">
                ShieldSwap
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wider">
                Privacy First Exchange
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <a
              href="/#swap"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  window.location.href = "/#swap";
                } else {
                  const element = document.getElementById("swap");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Swap
            </a>
            <a
              href="/#features"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  window.location.href = "/#features";
                } else {
                  const element = document.getElementById("features");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Features
            </a>
            <a
              href="/#buy-crypto"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  window.location.href = "/#buy-crypto";
                } else {
                  const element = document.getElementById("buy-crypto");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Buy Crypto
            </a>
            <a
              href="/#partners"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  window.location.href = "/#partners";
                } else {
                  const element = document.getElementById("partners");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Partners
            </a>
            <a
              href="/#guide"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  window.location.href = "/#guide";
                } else {
                  const element = document.getElementById("guide");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Guide
            </a>
            <a
              href="/#faq"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  window.location.href = "/#faq";
                } else {
                  const element = document.getElementById("faq");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              FAQ
            </a>
            <Link
              to="/contact-us"
              className={`relative px-6 py-2.5 rounded-full font-semibold overflow-hidden group transition-all duration-300 ${
                location.pathname === "/contact-us"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                  : "bg-blue-600/30 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50"
              }`}
            >
              <span className="relative z-10 text-white font-semibold">
                Contact Us
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 flex items-center justify-center z-50 p-0"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 text-white transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 bg-gray-900/95 backdrop-blur-xl border-t border-orange-500/20">
          <nav className="flex flex-col space-y-3">
            <a
              href="/#swap"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (location.pathname !== "/") {
                  window.location.href = "/#swap";
                } else {
                  const element = document.getElementById("swap");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Swap
            </a>
            <a
              href="/#features"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (location.pathname !== "/") {
                  window.location.href = "/#features";
                } else {
                  const element = document.getElementById("features");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Features
            </a>
            <a
              href="/#buy-crypto"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (location.pathname !== "/") {
                  window.location.href = "/#buy-crypto";
                } else {
                  const element = document.getElementById("buy-crypto");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Buy Crypto
            </a>
            <a
              href="/#partners"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (location.pathname !== "/") {
                  window.location.href = "/#partners";
                } else {
                  const element = document.getElementById("partners");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Partners
            </a>
            <a
              href="/#guide"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (location.pathname !== "/") {
                  window.location.href = "/#guide";
                } else {
                  const element = document.getElementById("guide");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Guide
            </a>
            <a
              href="/#faq"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (location.pathname !== "/") {
                  window.location.href = "/#faq";
                } else {
                  const element = document.getElementById("faq");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
            >
              FAQ
            </a>
            <Link
              to="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-blue-600/30 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-all duration-200 font-semibold text-center shadow-lg shadow-blue-500/30"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
