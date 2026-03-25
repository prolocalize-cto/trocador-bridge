import { Link } from "react-router-dom";
import logoImg from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="relative w-full md:mt-20 mt-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/20 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5"></div>

      <div className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-0 md:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-5 md:mb-5">
            {/* Logo & Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={logoImg} alt="Logo" className="h-10" />
                <div className="flex flex-col">
                  <span className="text-white text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-cyan-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-cyan-400 transition-all duration-300">
                    GhostSwap
                  </span>
                  <span className="text-xs text-gray-400 font-medium tracking-wider">
                    Privacy First Exchange
                  </span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                Fast, secure, and anonymous cryptocurrency exchange. Trade your
                crypto instantly with the best rates and no registration
                required.
              </p>
            </div>

            {/* Quick Links - Hidden on mobile */}
            <div className="hidden md:block">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full mr-2"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-cyan-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-cyan-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-cyan-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support - Hidden on mobile */}
            <div className="hidden md:block">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full mr-2"></span>
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://t.me/hirejoey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-cyan-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    Telegram Support
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:joeydev0x@gmail.com"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-cyan-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    Email Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media & Copyright - Hidden on mobile */}
          <div className="flex border-t border-white/5 pt-0 md:pt-8 pb-2 md:pb-0 flex-col md:flex-row justify-center items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} GhostSwap™. All Rights Reserved.
            </div>

            {/* <div className="hidden md:flex items-center space-x-3">
              <a
                href="https://t.me/hirejoey"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 hover:from-cyan-500 hover:to-cyan-600 flex items-center justify-center transition-all duration-300 group border border-white/10 hover:border-cyan-500/50 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50"
                aria-label="Telegram"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.098.155.23.171.324.016.094.037.308.02.474z" />
                </svg>
              </a>

              <a
                href="https://x.com/techaddict0x"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 hover:from-gray-800 hover:to-black flex items-center justify-center transition-all duration-300 group border border-white/10 hover:border-white/30 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="mailto:joeydev0x@gmail.com"
                className="relative w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 hover:from-cyan-400 hover:to-cyan-600 flex items-center justify-center transition-all duration-300 group border border-white/10 hover:border-cyan-400/50 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50"
                aria-label="Email"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
