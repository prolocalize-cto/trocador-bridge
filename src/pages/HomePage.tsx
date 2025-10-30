import HeroSection from "../components/HeroSection";
import ExchangeForm from "../components/ExchangeForm";
import HowItWorks from "../components/HowItWorks";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-1 md:gap-10 pt-10">
      <HeroSection />
      <ExchangeForm />
      {/* <iframe
        src="https://trocador.app/widget/?ref=mM6ZubbqSW"
        width="100%"
        height="500px"
        scrolling="no"
      ></iframe> */}
      <HowItWorks />
    </div>
  );
};

export default HomePage;
