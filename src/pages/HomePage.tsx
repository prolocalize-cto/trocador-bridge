import ExchangeForm from "../components/ExchangeForm";
import Partners from "../components/Partners";
import FAQ from "../components/FAQ";
import BuyCryptoSection from "../components/BuyCryptoSection";
import HowToGuide from "../components/HowToGuide";
import FeaturesGrid from "../components/FeaturesGrid";
import rocketImg from "../assets/images/rocket.webp";
import lightningImg from "../assets/images/lightning.webp";
import shieldCheckImg from "../assets/images/shield_check.webp";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-1 md:gap-5">
      <section
        id="swap"
        className="w-full max-w-[1000px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-2  items-start pt-[20px] md:pt-[110px] pb-[20px] md:pb-[50px]"
      >
        {/* Left side - Promotional Section */}
        <div className="flex flex-col gap-2 md:gap-6 lg:pt-8 text-center md:text-left">
          {/* Title */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
            Instant{" "}
            <span className="hidden md:contents">
              <br />
            </span>
            Cryptocurrency{" "}
            <span className="hidden md:contents">
              <br />
            </span>
            Exchange
          </h1>
          {/* Feature Points */}
          <div className="flex flex-col gap-1 md:gap-4 mt-4 items-center md:items-start">
            {/* Lightning-fast swaps */}
            <div className="flex items-start gap-2 md:gap-3 w-[300px] md:w-auto">
              <div className="flex-shrink-0 mt-1">
                <img
                  src={rocketImg}
                  alt="Rocket"
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </div>
              <p className="text-gray-200 text-base md:text-xl">
                Lightning-fast swaps with no delays
              </p>
            </div>

            {/* Unbeatable rates */}
            <div className="flex items-start gap-2 md:gap-3 w-[300px] md:w-auto">
              <div className="flex-shrink-0 mt-1">
                <img
                  src={lightningImg}
                  alt="Lightning"
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </div>
              <p className="text-gray-200 text-base md:text-xl">
                Unbeatable rates, no compromises
              </p>
            </div>

            {/* High limits and security */}
            <div className="flex items-start gap-2 md:gap-3 w-[300px] md:w-auto">
              <div className="flex-shrink-0 mt-1">
                <img
                  src={shieldCheckImg}
                  alt="Shield Check"
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </div>
              <p className="text-gray-200 text-base md:text-xl">
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

      <FeaturesGrid />
      <BuyCryptoSection />

      <HowToGuide />

      <FAQ />
      <Partners />
    </div>
  );
};

export default HomePage;
