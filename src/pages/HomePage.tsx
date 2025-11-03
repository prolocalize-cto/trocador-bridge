import ExchangeForm from "../components/ExchangeForm";
import HowItWorks from "../components/HowItWorks";
import FeedbackBanner from "../components/FeedbackBanner";
import Partners from "../components/Partners";
import FAQ from "../components/FAQ";
import rocketImg from "../assets/images/rocket.webp";
import lightningImg from "../assets/images/lightning.webp";
import shieldCheckImg from "../assets/images/shield_check.webp";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-1 md:gap-5">
      <section id="swap" className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-[50px] md:py-[100px]">
        {/* Left side - Promotional Section */}
        <div className="flex flex-col gap-6 lg:pt-8">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Instant
            <br />
            Cryptocurrency
            <br />
            Exchange
          </h1>

          {/* Feature Points */}
          <div className="flex flex-col gap-4 mt-4">
            {/* Lightning-fast swaps */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <img
                  src={rocketImg}
                  alt="Rocket"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <p className="text-gray-200 text-[24px]">
                Lightning-fast swaps with no delays
              </p>
            </div>

            {/* Unbeatable rates */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <img
                  src={lightningImg}
                  alt="Lightning"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <p className="text-gray-200 text-[24px]">
                Unbeatable rates, no compromises
              </p>
            </div>

            {/* High limits and security */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <img
                  src={shieldCheckImg}
                  alt="Shield Check"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <p className="text-gray-200 text-[24px]">
                High limits and ultimate security
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Exchange form */}
        <div className="flex flex-col items-center gap-4">
          <ExchangeForm />
        </div>
      </section>

      <FeedbackBanner />
      
      <HowItWorks />

      <Partners />

      <FAQ />
    </div>
  );
};

export default HomePage;
