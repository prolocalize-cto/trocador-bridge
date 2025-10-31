const HeroSection = () => {
  return (
    <div className="relative text-center mb-4">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-orange-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-75" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Main Title */}
      <div className="relative">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black !leading-[1.5]">
          <span className="inline-block bg-gradient-to-r from-white via-orange-100 to-purple-200 bg-clip-text text-transparent animate-gradient-x">
            Crypto Exchange
          </span>
        </h1>
        
        {/* Features */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">No Registration</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">Best Rates</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">Privacy First</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
