import { useState } from "react";
import type { TrocadorQuote } from "../services/trocadorService";

interface ProviderListProps {
  quotes: TrocadorQuote[];
  onSelectProvider: (provider: TrocadorQuote) => void;
  amountFrom: number;
  tickerFrom: string;
  tickerTo: string;
}

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
      B: "bg-blue-500",
      C: "bg-yellow-500",
      D: "bg-red-500",
    };
    return colors[rating] || "bg-gray-500";
  };

  const handleProviderSelect = (quote: TrocadorQuote) => {
    setSelectedProvider(quote.provider);
    onSelectProvider(quote);
  };

  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-purple-500/30">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-purple-400"
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
        <h2 className="text-2xl font-bold text-white mb-2">
          Choose your Exchange and Rate:
        </h2>
        <p className="text-gray-400 text-sm">
          All transactions are covered by the Trocador Guarantee
        </p>
      </div>

      {/* Rate Type Toggle */}
      <div className="flex gap-2 mb-6 bg-black/30 p-1 rounded-xl">
        <button
          onClick={() => setRateType("floating")}
          className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
            rateType === "floating"
              ? "bg-purple-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Floating Rate
        </button>
        <button
          onClick={() => setRateType("fixed")}
          className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
            rateType === "fixed"
              ? "bg-purple-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Fixed Rate
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-black/40 rounded-t-xl text-sm font-semibold text-gray-300">
        <div className="col-span-3">Exchange</div>
        <div className="col-span-2 text-center">Rate</div>
        <div className="col-span-2 text-center">Spread</div>
        <div className="col-span-2 text-center">ETA</div>
        <div className="col-span-2 text-center">Privacy</div>
        <div className="col-span-1"></div>
      </div>

      {/* Provider List */}
      <div className="space-y-2">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No providers available for {rateType} rate</p>
          </div>
        ) : (
          filteredQuotes.map((quote, index) => (
            <div
              key={`${quote.provider}-${index}`}
              onClick={() => handleProviderSelect(quote)}
              className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedProvider === quote.provider
                  ? "bg-orange-500/20 border-2 border-orange-500"
                  : "bg-gray-800/50 hover:bg-gray-700/50 border-2 border-transparent"
              }`}
            >
              {/* Exchange (with logo) */}
              <div className="col-span-1 md:col-span-3 flex items-center gap-3">
                <img
                  src={quote.provider_logo}
                  alt={quote.provider}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                <span className="text-white font-semibold">
                  {quote.provider}
                </span>
              </div>

              {/* Rate */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                <div className="text-left md:text-center">
                  <p className="text-sm text-gray-400 md:hidden">Rate:</p>
                  <p className="text-white font-medium">
                    ≈{parseFloat(quote.amount_to).toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Spread */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                <div className="text-left md:text-center">
                  <p className="text-sm text-gray-400 md:hidden">Spread:</p>
                  <p
                    className={`font-medium ${
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
                  <p className="text-sm text-gray-400 md:hidden">ETA:</p>
                  <p className="text-white font-medium">{quote.eta}min</p>
                </div>
              </div>

              {/* Privacy (KYC) */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400 md:hidden">Privacy:</p>
                  <div
                    className={`w-7 h-7 rounded-full ${getKYCColor(
                      quote.kycrating
                    )} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {quote.kycrating}
                  </div>
                  {quote.insurance > 0 && (
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Selection Indicator */}
              <div className="col-span-1 md:col-span-1 flex items-center justify-end">
                {selectedProvider === quote.provider && (
                  <svg
                    className="w-6 h-6 text-orange-500"
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
        <div className="mt-6 p-4 bg-black/30 rounded-xl text-sm text-gray-300">
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

