import customerServiceImg from "../assets/images/features/customer-service.png";
import clockImg from "../assets/images/features/clock.png";
import priceDownImg from "../assets/images/features/price-down.png";
import infiniteImg from "../assets/images/features/infinite.png";

const QuickFeatures = () => {
  const features = [
    {
      id: 1,
      title: "24/7 SUPPORT",
      description:
        "Day or night, our friendly team is ready to answer your questions and solve any problems you have.",
      icon: customerServiceImg,
    },
    {
      id: 2,
      title: "QUICK EXCHANGES",
      description:
        "Our platform doesn't waste time, so you can exchange cryptocurrencies quickly and catch the best deals.",
      icon: clockImg,
    },
    {
      id: 3,
      title: "LOW FEES",
      description:
        "Save more of your money with our low fees. We make exchanging cheap so you can do more with your crypto.",
      icon: priceDownImg,
    },
    {
      id: 4,
      title: "NO LIMITS",
      description:
        "GhostSwap has no limits and secured the opportunity for extremely large exchanges",
      icon: infiniteImg,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6" id="features">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="relative rounded-2xl p-5 bg-[#0a1a1e]/80 border border-brand/30 hover:border-brand/50 transition-all duration-300"
          >
            {/* Gradient border effect at bottom */}
            <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-brand/60 to-transparent rounded-full" />

            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 text-left">
                <h3 className="text-white font-bold text-base mb-2 tracking-wide text-left">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed text-left">
                  {feature.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickFeatures;
