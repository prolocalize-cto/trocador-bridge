import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import {
  HomePage,
  TradePage,
  ContactUsPage,
  NotFoundPage,
} from "./pages";
import { checkSiteEnabled, DEFAULT_ENABLED } from "./config/siteConfig";

function App() {
  const [siteEnabled, setSiteEnabled] = useState(DEFAULT_ENABLED);
  useEffect(() => {
    const checkStatus = async () => {
      const isEnabled = await checkSiteEnabled();
      setSiteEnabled(isEnabled);
    };

    checkStatus();
  }, []);

  // If site is disabled, show 404 page for all routes
  if (!siteEnabled) {
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
