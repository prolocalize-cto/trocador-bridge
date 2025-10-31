import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-orange-500/30' 
        : 'bg-gray-900/60 backdrop-blur-md border-b border-orange-500/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
            </div>
            <div className="flex flex-col">
              <span className="text-white text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-orange-100 to-purple-200 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-purple-300 transition-all duration-300">
                GhostSwap
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wider">Privacy First Exchange</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'text-orange-400 bg-orange-500/10' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link
              to="/contact-us"
              className={`relative px-6 py-2.5 rounded-full font-semibold overflow-hidden group transition-all duration-300 ${
                location.pathname === '/contact-us'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50'
                  : 'bg-gradient-to-r from-orange-500/20 to-purple-600/20 text-white hover:from-orange-500 hover:to-orange-600 hover:shadow-lg hover:shadow-orange-500/50 border border-orange-500/50'
              }`}
            >
              <span className="relative z-10">Contact Us</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-4 bg-gray-900/95 backdrop-blur-xl border-t border-orange-500/20">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'text-orange-400 bg-orange-500/20' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link
              to="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold text-center shadow-lg shadow-orange-500/30"
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
