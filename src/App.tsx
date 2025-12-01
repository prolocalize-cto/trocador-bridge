import "./App.css";
import "./smoke.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Load smoke.js script from public folder
    const script = document.createElement("script");
    script.src = "/smoke.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <BrowserRouter>
      <div id="fluid-container">
        <canvas id="fluid"></canvas>
      </div>
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
