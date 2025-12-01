import { useState } from "react";
import type { TrocadorQuote } from "../services/trocadorService";

interface ProviderListProps {
  quotes: TrocadorQuote[];
  onSelectProvider: (provider: TrocadorQuote) => void;
  amountFrom: number;
  tickerFrom: string;
  tickerTo: string;
}

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "center" | "left";
}

const Tooltip = ({ content, children, position = "center" }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center group">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={`absolute w-80 z-50 ${
            position === "left"
              ? "right-full top-0 mr-2"
              : "top-full left-1/2 transform -translate-x-1/2 mt-2"
          }`}
        >
          <div className="bg-gray-900 border-2 border-orange-500 rounded-lg p-4 shadow-2xl text-left">
            {/* Arrow */}
            {position === "left" ? (
              <div className="absolute left-full top-4 ml-[-1px]">
                <div className="border-8 border-transparent border-l-orange-500"></div>
              </div>
            ) : (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-[-1px]">
                <div className="border-8 border-transparent border-b-orange-500"></div>
              </div>
            )}
            <div className="text-white text-sm leading-relaxed">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProviderList = ({
  quotes,
  onSelectProvider,
  amountFrom,
  tickerFrom,
  tickerTo,
}: ProviderListProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [rateType, setRateType] = useState<"floating" | "fixed">("floating");

  // Filter quotes based on rate type
  const filteredQuotes = quotes.filter((quote) => {
    if (rateType === "floating") {
      return quote.fixed === "False";
    } else {
      return quote.fixed === "True";
    }
  });

  const getKYCColor = (rating: string) => {
    const colors: { [key: string]: string } = {
      A: "bg-green-500",
      B: "bg-green-500",
      C: "bg-yellow-500",
      D: "bg-red-500",
    };
    return colors[rating] || "bg-gray-500";
  };

  const getKYCText = (rating: string) => {
    const texts: { [key: string]: string } = {
      A: "This exchange uses its own liquidity and is privacy-friendly.",
      B: "This exchange refunds transactions that fail their AML check. In very rare cases funds may be blocked if a legal order demands it or stolen coins are involved. Past history at Shield Swap is very good.",
      C: "This exchange usually refunds transactions that fail their AML check, but if the deposit triggers their Liquidity Provider's AML system, funds may be blocked until KYC/SoF verification is passed.",
      D: "This exchange blocks transactions that fail their AML check until KYC/SoF verification is passed.",
    };
    return texts[rating] || "";
  };

  const getLogPolicyText = (policy: string) => {
    const texts: { [key: string]: string } = {
      A: "No logs policy.",
      B: "Requires IP log stored at Trocador. Only to be provided on an individual basis if requested by law enforcement.",
      C: "Logs stored at exchange.",
      D: "Extensive logs stored at exchange.",
    };
    return texts[policy] || "";
  };

  const handleProviderSelect = (quote: TrocadorQuote) => {
    setSelectedProvider(quote.provider);
    onSelectProvider(quote);
  };

  return (
    <div className="w-full bg-[#2a1a4f]/90 backdrop-blur-md rounded-2xl p-2 md:p-6 shadow-2xl border border-purple-500/30 max-h-[800px] md:max-h-[800px] flex flex-col">
      {/* Header */}
      <div className="text-center mb-1 md:mb-2 flex-shrink-0">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 md:w-6 md:h-6 text-purple-400"
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
          </div>
        </div>
        <h2 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">
          Choose your Exchange and Rate:
        </h2>
        {/* <p className="text-gray-400 text-xs md:text-sm">
          All transactions are covered by the Shield Swap Guarantee
        </p> */}
      </div>

      {/* Rate Type Toggle */}
      <div className="flex gap-1 md:gap-2 mb-2 md:mb-4 p-1 rounded-xl flex-shrink-0 mx-auto">
        <button
          onClick={() => setRateType("floating")}
          className={`flex-1 py-1.5 md:py-2 rounded-lg font-semibold transition-all duration-200 w-[130px] md:w-[150px] text-xs md:text-base ${
            rateType === "floating"
              ? "bg-purple-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Floating Rate
        </button>
        <button
          onClick={() => setRateType("fixed")}
          className={`flex-1 py-1.5 md:py-2 rounded-lg font-semibold transition-all duration-200 w-[130px] md:w-[150px] text-xs md:text-base ${
            rateType === "fixed"
              ? "bg-purple-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Fixed Rate
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-[#2a1a4f]/60 rounded-t-xl text-sm font-semibold text-gray-300">
        <div className="col-span-3">Exchange</div>

        {/* Rate with Tooltip */}
        <div className="col-span-2 text-center flex items-center justify-center gap-1">
          Rate
          <Tooltip
            content={
              <div>
                <p>
                  Rates are automatically adjusted to more accurately predict
                  the final amount you'll receive. This takes into account each
                  exchange's recent trades and their deviation from the
                  predicted rate.
                </p>
                <p className="mt-2">
                  The amount shown in the next screen is not adjusted, and will
                  show the actual rate provided by the exchange.
                </p>
              </div>
            }
          >
            <svg
              className="w-4 h-4 text-gray-400 hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </Tooltip>
        </div>

        {/* Spread with Tooltip */}
        <div className="col-span-2 text-center flex items-center justify-center gap-1">
          Spread
          <Tooltip
            content={
              <p>
                Spread is the difference between each rate and the best rate
                found. It is shown to aid you in comparing and choosing rates.
              </p>
            }
          >
            <svg
              className="w-4 h-4 text-gray-400 hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </Tooltip>
        </div>

        {/* ETA with Tooltip */}
        <div className="col-span-2 text-center flex items-center justify-center gap-1">
          ETA
          <Tooltip
            content={
              <p>
                We track recent swap times for each exchange in order to help
                inform users of what they can expect. Actual swap times may vary
                depending on the network speeds of your specific coin pair.
              </p>
            }
          >
            <svg
              className="w-4 h-4 text-gray-400 hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </Tooltip>
        </div>

        {/* Privacy with Tooltip */}
        <div className="col-span-2 text-center flex items-center justify-center gap-1">
          Privacy
          <Tooltip
            content={
              <div>
                <p className="mb-3">
                  This rating takes in consideration the exchange's KYC/AML
                  policies and their past history in GhostSwap. Log policy
                  information can be seen by hovering/clicking their rating.
                </p>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      A
                    </div>
                    <p className="text-xs">
                      This exchange uses its own liquidity and is
                      privacy-friendly.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      B
                    </div>
                    <p className="text-xs">
                      This exchange refunds transactions that fail their AML
                      check. In very rare cases funds may be blocked if a legal
                      order demands it or stolen coins are involved. Past
                      history at Shield Swap is very good.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      C
                    </div>
                    <p className="text-xs">
                      This exchange usually refunds transactions that fail their
                      AML check, but if the deposit triggers their Liquidity
                      Provider's AML system, funds may be blocked until KYC/SoF
                      verification is passed.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      D
                    </div>
                    <p className="text-xs">
                      This exchange blocks transactions that fail their AML
                      check until KYC/SoF verification is passed.
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-green-400 text-xs font-semibold">
                  Current Reported KYC Cases: &lt;0.1%
                </p>
              </div>
            }
          >
            <svg
              className="w-4 h-4 text-gray-400 hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </Tooltip>
        </div>

        <div className="col-span-1"></div>
      </div>

      {/* Provider List - Scrollable */}
      <div className="space-y-1.5 md:space-y-2 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No providers available for {rateType} rate</p>
          </div>
        ) : (
          filteredQuotes.map((quote, index) => (
            <div
              key={`${quote.provider}-${index}`}
              onClick={() => handleProviderSelect(quote)}
              className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-2 md:p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedProvider === quote.provider
                  ? "bg-orange-500/20 border-2 border-orange-500"
                  : "bg-[#2a1a4f]/40 hover:bg-[#2a1a4f]/60 border-2 border-transparent"
              }`}
            >
              {/* Exchange (with logo) */}
              <div className="col-span-2 md:col-span-3 flex items-center gap-2 md:gap-3">
                {quote.provider_logo ? (
                  <img
                    src={quote.provider_logo}
                    alt={quote.provider}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Replace failed image with default icon
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        const defaultIcon = document.createElement("div");
                        defaultIcon.className =
                          "w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs md:text-sm";
                        defaultIcon.textContent = quote.provider
                          .charAt(0)
                          .toUpperCase();
                        parent.insertBefore(defaultIcon, target);
                      }
                    }}
                  />
                ) : (
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg">
                    {quote.provider.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-white font-semibold text-sm md:text-base">
                  {quote.provider}
                </span>
              </div>

              {/* Rate */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                <div className="text-left md:text-center">
                  <p className="text-xs text-gray-400 md:hidden">Rate:</p>
                  <p className="text-white font-medium text-sm md:text-base">
                    ≈{parseFloat(quote.amount_to).toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Spread */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                <div className="text-left md:text-center">
                  <p className="text-xs text-gray-400 md:hidden">Spread:</p>
                  <p
                    className={`font-medium text-sm md:text-base ${
                      parseFloat(quote.USD_total_cost_percentage) >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {quote.USD_total_cost_percentage}%
                  </p>
                </div>
              </div>

              {/* ETA */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                <div className="text-left md:text-center">
                  <p className="text-xs text-gray-400 md:hidden">ETA:</p>
                  <p className="text-white font-medium text-sm md:text-base">
                    {quote.eta}min
                  </p>
                </div>
              </div>

              {/* Privacy (KYC) */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <p className="text-xs text-gray-400 md:hidden">Privacy:</p>

                  {/* KYC Rating Badge with Tooltip */}
                  <Tooltip
                    position="left"
                    content={
                      <div className="space-y-2">
                        <p>{getKYCText(quote.kycrating)}</p>
                        {quote.logpolicy && (
                          <p className="text-gray-300 text-xs mt-2 pt-2 border-t border-gray-700">
                            <span className="font-semibold">Log Policy:</span>{" "}
                            {getLogPolicyText(quote.logpolicy)}
                          </p>
                        )}
                      </div>
                    }
                  >
                    <div
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full ${getKYCColor(
                        quote.kycrating
                      )} flex items-center justify-center text-white text-xs font-bold cursor-help`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {quote.kycrating}
                    </div>
                  </Tooltip>

                  {/* Insurance Shield with Tooltip - Always shown */}
                  <Tooltip
                    position="left"
                    content={
                      <p>
                        This transaction is {quote.insurance}% insured by
                        GhostSwap.
                      </p>
                    }
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-white cursor-help"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </Tooltip>
                </div>
              </div>

              {/* Selection Indicator */}
              <div className="col-span-1 md:col-span-1 flex items-center justify-end">
                {selectedProvider === quote.provider && (
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Info */}
      {filteredQuotes.length > 0 && (
        <div className="mt-2 md:mt-4 p-2 md:p-3 bg-[#2a1a4f]/50 rounded-xl text-xs md:text-sm text-gray-300 flex-shrink-0">
          <p>
            <span className="font-semibold text-white">Trade Summary:</span>{" "}
            {amountFrom} {tickerFrom.toUpperCase()} →{" "}
            {filteredQuotes[0]?.amount_to} {tickerTo.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProviderList;
