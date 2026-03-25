import ExchangeForm from "../components/ExchangeForm";
import Partners from "../components/Partners";
import FAQ from "../components/FAQ";
import BuyCryptoSection from "../components/BuyCryptoSection";
import HowToGuide from "../components/HowToGuide";
import QuickFeatures from "../components/QuickFeatures";
const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-1 md:gap-5">
      <section
        id="swap"
        className="w-full max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-2  items-start pt-[20px] md:pt-[110px] pb-[20px] md:pb-[50px]"
      >
        {/* Left side - Promotional Section */}
        <div className="flex flex-col gap-2 md:gap-6 lg:pt-8 text-left">
          {/* Title */}
          <h1 className="font-bold leading-tight text-white text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center md:text-left">
            Safely exchange{" "}
            <span className="hidden md:contents">
              <br />
            </span>
            up to <span className="text-[#0bcfae]">2850+</span>{" "}
            <span className="hidden md:contents">
              <br />
            </span>
            cryptocurrencies{" "}
            <span className="hidden md:contents">
              <br />
            </span>
            on GhostSwap
          </h1>
          <p className="text-base md:text-lg italic text-left m-0 text-[#0bcfae] hidden md:block">
            GhostSwap - simple, secure exchange platform.
            <br />
            Quick, safe, and reliable - join the future now.
          </p>
          {/* Feature Points */}
        </div>

        {/* Right side - Exchange form */}
        <div className="flex flex-col items-center gap-4">
          <ExchangeForm />
        </div>
      </section>

      <QuickFeatures />
      <BuyCryptoSection />

      <HowToGuide />

      <FAQ />
      <Partners />
    </div>
  );
};

export default HomePage;
