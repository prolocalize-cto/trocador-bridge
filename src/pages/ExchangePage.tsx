import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import {
  type TrocadorRateResponse,
  type TrocadorQuote,
  confirmTrocadorTrade,
} from "../services/trocadorService";
import ProviderList from "../components/ProviderList";

type ExchangeStep = "providers" | "confirm";

const ExchangePage = () => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState<ExchangeStep>("providers");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rateData, setRateData] = useState<TrocadorRateResponse | null>(null);
  const [selectedProvider, setSelectedProvider] =
    useState<TrocadorQuote | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [transactionError, setTransactionError] = useState<string>("");

  useEffect(() => {
    const loadTrade = async () => {
      if (!tradeId) {
        setError("No trade ID provided");
        setLoading(false);
        return;
      }

      try {
        // Check if rate data was passed via navigation state
        const stateData = location.state?.rateData as
          | TrocadorRateResponse
          | undefined;
        if (stateData) {
          setRateData(stateData);
          setError(null);
        } else {
          // No rate data available - need to start new exchange
          setError(
            "Provider selection not available. Please start a new exchange."
          );
        }
      } catch (err) {
        console.error("Error loading trade:", err);
        setError("Failed to load trade details");
      } finally {
        setLoading(false);
      }
    };

    loadTrade();
  }, [tradeId, location.state]);

  const handleProviderSelect = (provider: TrocadorQuote) => {
    setSelectedProvider(provider);
    setStep("confirm");
  };

  const handleBackToProviders = () => {
    setStep("providers");
    setSelectedProvider(null);
  };

  const handleConfirmExchange = async () => {
    if (!selectedProvider || !rateData || !tradeId) return;

    // Validate recipient address
    if (!recipientAddress || recipientAddress.trim() === "") {
      setTransactionError("Please enter recipient address");
      return;
    }

    setIsCreatingTransaction(true);
    setTransactionError("");

    try {
      // Call Trocador API to confirm trade
      await confirmTrocadorTrade({
        tradeId: tradeId,
        tickerFrom: rateData.ticker_from,
        tickerTo: rateData.ticker_to,
        networkFrom: rateData.network_from,
        networkTo: rateData.network_to,
        amountFrom: rateData.amount_from,
        address: recipientAddress,
        provider: selectedProvider.provider,
        fixed: rateData.fixed,
      });
      
      // Reload page to show transaction status (status will now be "waiting")
      window.location.href = `/exchange/${tradeId}`;
    } catch (error) {
      console.error("Error creating transaction:", error);
      setTransactionError(
        error instanceof Error
          ? error.message
          : "Failed to create transaction. Please try again."
      );
    } finally {
      setIsCreatingTransaction(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-12 w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <div className="text-white text-xl">Loading exchange details...</div>
        </div>
      </div>
    );
  }

  if (error || !rateData) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 w-full">
        <div className="text-red-400 text-xl">
          {error || "Exchange not found"}
        </div>
        <Link
          to="/"
          className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Show provider selection
  if (step === "providers" && rateData.quotes?.quotes) {
    return (
      <div className="container mx-auto px-4 py-8 w-full max-w-6xl">
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-black/80 hover:text-black transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Exchange Form
        </button>
        <ProviderList
          quotes={rateData.quotes.quotes}
          onSelectProvider={handleProviderSelect}
          amountFrom={rateData.amount_from}
          tickerFrom={rateData.ticker_from}
          tickerTo={rateData.ticker_to}
        />
      </div>
    );
  }

  // Show confirmation form
  if (step === "confirm" && selectedProvider) {
    return (
      <div className="container mx-auto px-4 py-8 w-full max-w-[95%] sm:w-[600px] md:w-[650px] lg:w-[700px] xl:w-[750px]">
        <button
          onClick={handleBackToProviders}
          className="mb-4 flex items-center gap-2 text-black/80 hover:text-black transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Provider List
        </button>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border border-purple-500/30 flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Confirm Exchange
          </h2>

          {/* Selected Provider Info */}
          <div className="bg-black/30 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-2">Selected Provider:</p>
            <div className="flex items-center gap-3">
              {selectedProvider.provider_logo ? (
                <img
                  src={selectedProvider.provider_logo}
                  alt={selectedProvider.provider}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Replace failed image with default icon
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const defaultIcon = document.createElement('div');
                      defaultIcon.className = 'w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg';
                      defaultIcon.textContent = selectedProvider.provider.charAt(0).toUpperCase();
                      parent.insertBefore(defaultIcon, target);
                    }
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {selectedProvider.provider.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-white font-bold text-lg">
                  {selectedProvider.provider}
                </p>
                <p className="text-sm text-gray-400">
                  ETA: {selectedProvider.eta} min
                </p>
              </div>
            </div>
          </div>

          {/* Exchange Summary */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">You Send:</span>
              <span className="text-white font-bold text-lg">
                {rateData.amount_from} {rateData.ticker_from.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">You Get:</span>
              <span className="text-white font-bold text-lg">
                {parseFloat(selectedProvider.amount_to).toFixed(6)}{" "}
                {rateData.ticker_to.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Rate:</span>
              <span className="text-white">
                1 {rateData.ticker_from.toUpperCase()} ≈{" "}
                {(
                  parseFloat(selectedProvider.amount_to) / rateData.amount_from
                ).toFixed(6)}{" "}
                {rateData.ticker_to.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Spread:</span>
              <span
                className={`font-medium ${
                  parseFloat(selectedProvider.USD_total_cost_percentage) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {selectedProvider.USD_total_cost_percentage}%
              </span>
            </div>
          </div>

          {/* Recipient Address Input */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-1">
              <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-black">!</span>
              </div>
              <label className="text-gray-300 font-semibold text-base md:text-lg">
                Recipient {rateData.ticker_to.toUpperCase()} Address
              </label>
            </div>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder={`Enter ${rateData.ticker_to.toUpperCase()} address`}
              className="w-full bg-white/5 text-white p-3 rounded-xl outline-none border-2 border-white/10 hover:border-purple-500/50 focus:border-purple-500 transition-colors text-base md:text-lg"
            />
          </div>

          {/* Error Message */}
          {transactionError && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
              <p className="text-red-400 text-sm">{transactionError}</p>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirmExchange}
            disabled={isCreatingTransaction}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-5 md:py-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/50 text-lg md:text-xl"
          >
            {isCreatingTransaction ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating Transaction...
              </span>
            ) : (
              "Confirm Exchange"
            )}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ExchangePage;
