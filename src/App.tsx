import "./App.css";
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
import { initFluid } from "smokey-fluid-cursor";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    initFluid({
      splatRadius: 0.05, // Smaller effect size
      colorUpdateSpeed: 0,
      backColor: {
        r: 100,
        g: 0,
        b: 0,
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <canvas id="smokey-fluid-canvas"></canvas>
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
