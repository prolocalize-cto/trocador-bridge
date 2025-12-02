const FeaturesGrid = () => {
  const features = [
    {
      id: 1,
      title: "Best Exchange Rates",
      description:
        "We find the best rate from multiple trading platforms at the moment of your swap, guaranteeing you the lowest fees on the market!",
      bgColor: "bg-green-500/20",
      imageUrl:
        "https://pretty-picture-g2.s3.eu-central-1.amazonaws.com/bento_var4_1st_card_circles_f16dd7fe83.svg",
      colSpan: "lg:col-span-8",
      aspect: "lg:aspect-[846/400]",
    },
    {
      id: 2,
      title: "Light-speed transactions",
      description:
        "You can exchange Bitcoin and all the popular altcoins at lightning speed.",
      bgColor: "bg-cyan-500/10",
      imageUrl: null,
      colSpan: "lg:col-span-4",
      aspect: "lg:aspect-[410/400]",
    },
    {
      id: 3,
      title: "Diverse asset portfolio",
      description:
        "On GhostSwap you can convert BTC and over 300 other cryptocurrencies without any limits and restrictions.",
      bgColor: "bg-cyan-500/10",
      // imageUrl:
      //   "https://pretty-picture-g2.s3.eu-central-1.amazonaws.com/bento_var4_3d_card_circles_c1fc9a8145.svg",
      imageUrl: null,
      colSpan: "lg:col-span-4",
      aspect: "lg:aspect-[410/400]",
    },
    {
      id: 4,
      title: "No need for an account",
      description:
        "Ranked among the best, our platform lets you exchange Bitcoin and other cryptocurrencies privately.",
      bgColor: "bg-cyan-500/20",
      imageUrl:
        "https://pretty-picture-g2.s3.eu-central-1.amazonaws.com/bento_var4_4s_card_circles_987642fa67.svg",
      colSpan: "lg:col-span-4",
      aspect: "lg:aspect-[410/400]",
    },
    {
      id: 5,
      title: "Top-Tier Security",
      description:
        "We are non-custodial. Your funds are sent instantly and securely to your wallet immediately after the exchange.",
      bgColor: "bg-cyan-500/10",
      imageUrl:
        "https://pretty-picture-g2.s3.eu-central-1.amazonaws.com/bento_var4_5th_card_circles_4ec0384cef.svg",
      colSpan: "lg:col-span-4",
      aspect: "lg:aspect-[410/400]",
    },
    {
      id: 6,
      title: "Flexible Rates",
      description:
        "Maximum profit at floating rates, or a guaranteed amount at a fixed rate—choose your priority.",
      bgColor: "bg-cyan-500/10",
      imageUrl: null,
      colSpan: "lg:col-span-6",
      aspect: "lg:aspect-[410/400]",
    },
    {
      id: 7,
      title: "Immediate Assistance",
      description:
        "Get fast help with any questions about your online crypto exchange 24/7.",
      bgColor: "bg-cyan-500/20",
      imageUrl:
        "https://pretty-picture-g2.s3.eu-central-1.amazonaws.com/bento_var4_7th_card_circles_bf2247eb68.svg",
      colSpan: "lg:col-span-6",
      aspect: "lg:aspect-[846/400]",
    },
  ];

  return (
    <section
      id="features"
      className="w-full max-w-7xl mx-auto px-4 py-8 lg:py-14"
    >
      <div>
        {/* Title */}
        <div className="mb-4 lg:mb-6">
          <h2 className="text-xl lg:text-3xl font-medium lg:font-semibold text-center text-white">
            What makes us the Best
          </h2>
        </div>

        {/* Features Grid */}
        <div className="relative w-full">
          <div className="select-none overflow-hidden">
            <ul className="grid gap-2 lg:grid-cols-12 lg:gap-2 auto-rows-auto">
              {features.map((feature) => (
                <li
                  key={feature.id}
                  className={`min-w-0 shrink-0 grow-0 basis-full ${feature.colSpan}`}
                >
                  <div
                    className={`relative z-0 rounded-3xl p-6 xl:p-8 overflow-hidden ${feature.bgColor}`}
                  >
                    {/* Background Image */}
                    {feature.imageUrl && (
                      <img
                        alt=""
                        loading="lazy"
                        width="800"
                        height="800"
                        decoding="async"
                        className={`pointer-events-none z-0 hidden lg:block absolute ${
                          feature.id === 1
                            ? "top-0 left-0 w-[600px] h-[600px] -translate-x-[35%] -translate-y-[35%] object-contain"
                            : feature.id === 7
                            ? "bottom-0 right-0 w-[600px] h-[600px] translate-x-[20%] translate-y-[45%] object-contain"
                            : "hidden"
                        }`}
                        src={feature.imageUrl}
                      />
                    )}

                    {/* Content */}
                    <div className="w-full z-50 flex flex-col relative">
                      <h3 className="text-pretty font-semibold text-2xl lg:text-xl xl:text-2xl text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-balance xl:text-lg text-lg lg:text-sm text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
