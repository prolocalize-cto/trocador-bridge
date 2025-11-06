import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layout/MainLayout";
import {
  HomePage,
  TradePage,
  ContactUsPage,
  PrivacyPolicyPage,
  NotFoundPage,
} from "./pages";
import { checkSiteEnabled, DEFAULT_ENABLED } from "./config/siteConfig";

// Allowed domains
const ALLOWED_DOMAINS = [
  "http://localhost:5173",
  "https://localhost:5173",
  "https://shield-bridge.vercel.app",
];

function App() {
  const [siteEnabled, setSiteEnabled] = useState(DEFAULT_ENABLED);
  const [isValidDomain, setIsValidDomain] = useState(true);

  useEffect(() => {
    // Check if current origin is allowed
    const currentOrigin = window.location.origin;
    const isValid = ALLOWED_DOMAINS.some(
      (domain) => currentOrigin === domain || currentOrigin.startsWith(domain)
    );
    setIsValidDomain(isValid);

    const checkStatus = async () => {
      const isEnabled = await checkSiteEnabled();
      setSiteEnabled(isEnabled);
    };

    checkStatus();
  }, []);

  // If domain is not allowed or site is disabled, show 404 page
  if (!isValidDomain || !siteEnabled) {
    return (
      <BrowserRouter>
        <MainLayout>
          <NotFoundPage />
        </MainLayout>
      </BrowserRouter>
    );
  }

  // Normal site operation
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exchange/:tradeId" element={<TradePage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
