const BuyCryptoSection = () => {
  const cryptocurrencies = [
    {
      name: "BTC",
      ticker: "btc",
      icon: "https://trocador.app/static/img/icons/btc.svg",
      link: "/#swap",
    },
    {
      name: "ETH",
      ticker: "eth",
      icon: "https://trocador.app/static/img/icons/eth.svg",
      link: "/#swap",
    },
    {
      name: "USDT",
      ticker: "usdt",
      icon: "https://trocador.app/static/img/icons/usdt.svg",
      link: "/#swap",
    },
    {
      name: "SOL",
      ticker: "sol",
      icon: "https://trocador.app/static/img/icons/sol.svg",
      link: "/#swap",
    },
    {
      name: "LTC",
      ticker: "ltc",
      icon: "https://trocador.app/static/img/icons/ltc.svg",
      link: "/#swap",
    },
    {
      name: "TON",
      ticker: "ton",
      icon: "https://trocador.app/static/img/icons/ton.svg",
      link: "/#swap",
    },
    {
      name: "XRP",
      ticker: "xrp",
      icon: "https://trocador.app/static/img/icons/xrp.svg",
      link: "/#swap",
    },
    {
      name: "ADA",
      ticker: "ada",
      icon: "https://trocador.app/static/img/icons/ada.svg",
      link: "/#swap",
    },
    {
      name: "LINK",
      ticker: "link",
      icon: "https://trocador.app/static/img/icons/link.svg",
      link: "/#swap",
    },
  ];

  const handleCryptoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("swap");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBuyCryptoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("swap");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="buy-crypto" className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid gap-8 lg:gap-10 justify-center">
        {/* Title and Description */}
        <div className="grid gap-4 place-items-center text-center">
          <h2 className="text-2xl lg:text-4xl font-semibold text-white">
            Buy Top Cryptocurrency Assets Instantly
          </h2>
          <p className="text-sm lg:text-base text-gray-300 max-w-2xl">
            Acquire hottest cryptos with various local currencies and payment
            methods. Diversify and conquer!
          </p>
        </div>

        {/* Cryptocurrency Icons */}
        <div className="flex gap-4 flex-wrap justify-center">
          {cryptocurrencies.map((crypto) => (
            <a
              key={crypto.ticker}
              href={crypto.link}
              onClick={handleCryptoClick}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-3 transition-colors cursor-pointer"
            >
              <img
                alt={crypto.name}
                loading="lazy"
                width="32"
                height="32"
                className="flex size-8 shrink-0"
                src={crypto.icon}
              />
              <span className="font-medium text-lg uppercase text-white">
                {crypto.name}
              </span>
            </a>
          ))}
        </div>

        {/* Buy Crypto Button */}
        <div className="w-fit mx-auto">
          <a href="/#swap" onClick={handleBuyCryptoClick}>
            <button className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap select-none font-semibold transition-colors disabled:pointer-events-none disabled:opacity-40 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-12 text-xl px-8 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-200">
              Swap Crypto
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BuyCryptoSection;
