import HeroSection from "../components/HeroSection";
import ExchangeForm from "../components/ExchangeForm";
import HowItWorks from "../components/HowItWorks";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-1 md:gap-5 pt-10">
      <HeroSection />
      <ExchangeForm />
      <HowItWorks />
    </div>
  );
};

export default HomePage;
