import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-2 left-0 right-0 z-50 flex justify-center px-4 py-2">
      <div className="w-full max-w-[500px] bg-[#f97316] p-2 rounded-lg">
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="text-white text-xs text-left flex-1">
            By continuing to use the site you agree to the{" "}
            <Link
              to="/privacy-policy"
              className="underline hover:text-yellow-200 transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            and consent to the use of cookies
          </p>
          <button
            onClick={handleAgree}
            className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border-2 border-orange-500 transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            I agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
