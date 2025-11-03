const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      title: "Select & Search",
      description:
        "Select whether you want to make a standard swap or a payment, choose the cryptos you wish to swap between and the amount. Then click 'Exchange' and wait for a few seconds while we find you the best rates.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Choose & Confirm",
      description:
        "Choose your rate and exchange between the options available, fill in the address in which you want to receive your funds and click 'Confirm Exchange'. Make sure you choose the correct network for coins that have multiple options.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Send & Receive",
      description:
        "An address will be generated, to which you must send the amount you chose. Use your cryptocurrency wallet to make the transfer. You can check the status of your transaction on the same screen. Soon you'll receive your desired crypto in the address you provided.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full relative py-10 px-4 overflow-hidden "
    >
      {/* Decorative elements */}

      <div className="relative max-w-7xl mx-auto flex flex-col gap-10">
        {/* Title */}
        <div className="text-center text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white inline-block text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Card */}
              <div className="relative bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-gray-900/70 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
                    {step.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {step.description}
                  </p>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-400/30 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
