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
      title: "Choose a currency pair",
      description:
        "Select currencies you want to swap and click the Exchange button.",
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
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      title: "Enter the recipient's address",
      description:
        "The currency you want to receive will be sent to this address after the exchange.",
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
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Send and receive coins",
      description:
        "To continue, send the indicated amount of coins to the deposit address.",
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
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
      ),
      title: "That's all!",
      description:
        'The exchange status "Finished" means that the swap process is over.',
    },
  ];

  return (
    <div id="how-it-works" className="w-full relative py-10 px-4 overflow-hidden bg-black/20 backdrop-blur-sm">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col gap-5">
        {/* Title */}
        <div className="text-center text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white inline-block text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
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
    </div>
  );
};

export default HowItWorks;
