import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Currency } from "../types/currency";
import {
  useCurrenciesForFrom,
  useCurrenciesForTo,
} from "../hooks/useCurrencies";
import CurrencySelector from "./CurrencySelector";
import ProviderList from "./ProviderList";
import {
  getTrocadorRates,
  type TrocadorRateResponse,
  type TrocadorQuote,
} from "../services/trocadorService";

// Helper to extract ticker from currency ID (ticker_network)
const getTickerFromCurrencyId = (currencyId: string): string => {
  return currencyId.split("_")[0];
};

// Helper to extract network from currency ID (ticker_network)
const getNetworkFromCurrencyId = (currencyId: string): string => {
  const parts = currencyId.split("_");
  return parts.length > 1 ? parts.slice(1).join("_") : parts[0];
};

// Default currencies to show before API loads
const DEFAULT_FROM_CURRENCIES: Currency[] = [
  {
    name: "Bitcoin",
    ticker: "btc",
    network: "Mainnet",
    memo: false,
    image: "https://trocador.app/static/img/icons/btc.svg",
    minimum: 0.001,
    maximum: 100000,
    popular: true,
  },
];

const DEFAULT_TO_CURRENCIES: Currency[] = [
  {
    name: "Ethereum",
    ticker: "eth",
    network: "ERC20",
    memo: false,
    image: "https://trocador.app/static/img/icons/eth.svg",
    minimum: 0.01,
    maximum: 100000,
    popular: true,
  },
];

type FormStep = "input" | "providers" | "confirm";

const ExchangeForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<FormStep>("input");
  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("btc_Mainnet");
  const [toCurrency, setToCurrency] = useState("eth_ERC20");
  const [recipientAddress, setRecipientAddress] = useState(""); // Will be set in confirmation step
  const [refundAddress, setRefundAddress] = useState(""); // Optional refund address
  const [showRefundAddress, setShowRefundAddress] = useState(false);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [rateResponse, setRateResponse] = useState<TrocadorRateResponse | null>(
    null
  );
  const [selectedProvider, setSelectedProvider] =
    useState<TrocadorQuote | null>(null);
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    fromAmount?: string;
  }>({});
  const [trocadorId, setTrocadorId] = useState("");
  const [showStatusForm, setShowStatusForm] = useState(false);
  const statusFormRef = useRef<HTMLDivElement>(null);

  // Scroll to form when it's opened
  useEffect(() => {
    if (showStatusForm && statusFormRef.current) {
      setTimeout(() => {
        statusFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }, [showStatusForm]);

  // Helper function to validate and format input
  const handleAmountInput = (value: string): string => {
    if (value === "") return "";

    if (value.startsWith("0") && value.length > 1 && value[1] !== ".") {
      value = value.replace(/^0+/, "");
    }

    const regex = /^\d*\.?\d*$/;
    if (!regex.test(value)) return fromAmount;

    return value;
  };

  const { currencies: apiFromCurrencies, loading: fromLoading } =
    useCurrenciesForFrom();
  const { currencies: apiToCurrencies, loading: toLoading } =
    useCurrenciesForTo();

  const fromCurrencies =
    apiFromCurrencies.length > 0 ? apiFromCurrencies : DEFAULT_FROM_CURRENCIES;
  const toCurrencies =
    apiToCurrencies.length > 0 ? apiToCurrencies : DEFAULT_TO_CURRENCIES;

  // Swap currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Search rates from Shield Swap API
  const handleSearchRates = async () => {
    // Validation
    const errors: { fromAmount?: string } = {};

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      errors.fromAmount = "Please enter a valid amount";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsLoadingRates(true);

    try {
      const fromTicker = getTickerFromCurrencyId(fromCurrency);
      const toTicker = getTickerFromCurrencyId(toCurrency);
      const fromNetwork = getNetworkFromCurrencyId(fromCurrency);
      const toNetwork = getNetworkFromCurrencyId(toCurrency);

      const response = await getTrocadorRates({
        tickerFrom: fromTicker,
        tickerTo: toTicker,
        networkFrom: fromNetwork,
        networkTo: toNetwork,
        amountFrom: parseFloat(fromAmount),
      });

      setRateResponse(response);

      // Navigate directly to exchange page with trade ID and rate data
      navigate(`/exchange/${response.trade_id}`, {
        state: { rateData: response },
      });
    } catch (error) {
      console.error("Error fetching rates:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : String(error),
        status: (error as any).status,
        errorData: (error as any).errorData,
      });
      
      // Extract error message - prioritize the actual error message from API
      let errorMessage = "Failed to fetch rates. Please try again.";
      
      if (error instanceof Error) {
        // For 400 errors, the error.message should already contain the API error message
        // But we check errorData.error first to be sure
        if ((error as any).status === 400) {
          // Check errorData.error first (most reliable)
          const apiError = (error as any).errorData?.error;
          if (apiError) {
            errorMessage = apiError;
            
            // If error mentions amount being too low, add minimum amount info
            if (apiError.toLowerCase().includes("lower than min") || 
                apiError.toLowerCase().includes("amount higher than max or lower than min")) {
              // Find the selected currency to get minimum amount
              const selectedCurrencyData = fromCurrencies.find(
                (currency) => `${currency.ticker}_${currency.network}` === fromCurrency
              );
              
              if (selectedCurrencyData && selectedCurrencyData.minimum) {
                const minAmount = selectedCurrencyData.minimum;
                const ticker = selectedCurrencyData.ticker.toUpperCase();
                errorMessage = `Amount should be bigger than ${minAmount} ${ticker}`;
              }
            }
          } else {
            // Fallback to error.message (which should also contain the API error)
            errorMessage = error.message;
          }
        } else {
          errorMessage = error.message;
        }
      }
      
      // Capitalize first letter of error message
      if (errorMessage && errorMessage.length > 0) {
        errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
      }
      
      // Show error in toast only (no form error display)
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoadingRates(false);
    }
  };

  // Handle provider selection
  const handleProviderSelect = (provider: TrocadorQuote) => {
    setSelectedProvider(provider);
    setStep("confirm");
  };

  // Handle back to input
  const handleBackToInput = () => {
    setStep("input");
    setRateResponse(null);
    setSelectedProvider(null);
  };

  // Handle back to providers
  const handleBackToProviders = () => {
    setStep("providers");
    setSelectedProvider(null);
  };

  // Handle confirm exchange
  const handleConfirmExchange = async () => {
    if (!selectedProvider || !rateResponse) return;

    // Validate recipient address
    if (!recipientAddress || recipientAddress.trim() === "") {
      toast.error("Please enter recipient address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsCreatingTransaction(true);

    try {
      // TODO: Implement actual transaction creation with Trocador
      // For now, just simulate it
      const mockTransaction = {
        id: rateResponse.trade_id,
        status: "waiting",
        payinAddress: "MOCK_PAYIN_ADDRESS",
        payoutAddress: recipientAddress,
        amountFrom: fromAmount,
        amountTo: selectedProvider.amount_to,
        currencyFrom: getTickerFromCurrencyId(fromCurrency),
        currencyTo: getTickerFromCurrencyId(toCurrency),
        provider: selectedProvider.provider,
      };

      // Store in localStorage
      localStorage.setItem(
        `transaction_${mockTransaction.id}`,
        JSON.stringify(mockTransaction)
      );

      // Navigate to exchange page with trade ID
      navigate(`/exchange/${rateResponse.trade_id}`);
    } catch (error) {
      console.error("Error creating transaction:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to create transaction. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsCreatingTransaction(false);
    }
  };

  // Render based on current step
  if (step === "providers" && rateResponse) {
    return (
      <div className="container mx-auto px-4 py-8 w-full max-w-[95%] sm:w-[600px] md:w-[650px] lg:w-[700px] xl:w-[750px]">
        <button
          onClick={handleBackToInput}
          className="mb-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
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
          quotes={rateResponse.quotes.quotes}
          onSelectProvider={handleProviderSelect}
          amountFrom={rateResponse.amount_from}
          tickerFrom={rateResponse.ticker_from}
          tickerTo={rateResponse.ticker_to}
        />
      </div>
    );
  }

  if (step === "confirm" && selectedProvider && rateResponse) {
    return (
      <div className="container mx-auto px-4 py-8 w-full max-w-[95%] sm:w-[600px] md:w-[650px] lg:w-[700px] xl:w-[750px]">
        <button
          onClick={handleBackToProviders}
          className="mb-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
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
          <h2 className="text-xl font-bold text-white text-center mb-4">
            Confirm Exchange
          </h2>

          {/* Selected Provider Info */}
          <div className="bg-black/30 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-2">Selected Provider:</p>
            <div className="flex items-center gap-3">
              <img
                src={selectedProvider.provider_logo}
                alt={selectedProvider.provider}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-white font-bold text-base">
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
              <span className="text-white font-bold text-base">
                {fromAmount}{" "}
                {getTickerFromCurrencyId(fromCurrency).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">You Get:</span>
              <span className="text-white font-bold text-base">
                {parseFloat(selectedProvider.amount_to).toFixed(6)}{" "}
                {getTickerFromCurrencyId(toCurrency).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Rate:</span>
              <span className="text-white">
                1 {getTickerFromCurrencyId(fromCurrency).toUpperCase()} ≈{" "}
                {(
                  parseFloat(selectedProvider.amount_to) /
                  parseFloat(fromAmount)
                ).toFixed(6)}{" "}
                {getTickerFromCurrencyId(toCurrency).toUpperCase()}
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
              <label className="text-gray-300 text-sm md:text-base">
                Recipient {getTickerFromCurrencyId(toCurrency).toUpperCase()}{" "}
                Address
              </label>
            </div>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder={`Enter ${getTickerFromCurrencyId(
                toCurrency
              ).toUpperCase()} address`}
              className="w-full bg-white/5 text-white p-2 rounded-xl outline-none border-2 border-white/10 hover:border-purple-500/50 focus:border-purple-500 transition-colors text-sm"
            />
          </div>

          {/* Refund Address Input (Optional) */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setShowRefundAddress(!showRefundAddress)}
              className="flex items-center gap-2 px-1 text-left"
            >
              <label className="text-gray-300 text-sm cursor-pointer">
                Refund Address <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  showRefundAddress ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showRefundAddress && (
              <input
                type="text"
                value={refundAddress}
                onChange={(e) => setRefundAddress(e.target.value)}
                placeholder={`Enter ${getTickerFromCurrencyId(fromCurrency).toUpperCase()} refund address (optional)`}
                className="w-full bg-white/5 text-white p-2 rounded-xl outline-none border-2 border-white/10 hover:border-purple-500/50 focus:border-purple-500 transition-colors text-sm"
              />
            )}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmExchange}
            disabled={isCreatingTransaction}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 md:py-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 text-base md:text-lg"
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

  // Default: Input step
  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-[95%] sm:w-[600px] md:w-[650px] lg:w-[700px] xl:w-[750px]">
      <div className="bg-[#132a4f] backdrop-blur-md rounded-3xl p-3 md:p-4 shadow-2xl border border-purple-500/30 flex flex-col gap-[10px]">
        {/* Swap Mode Header */}
        <div className="flex items-center justify-center gap-2">
          <div className="text-lg font-bold text-white">Swap Now</div>
          <div className="relative group">
            <div className="w-5 h-5 rounded-full border border-white/60 flex items-center justify-center cursor-help">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              <div className="bg-gray-900 border-2 border-orange-500 rounded-lg p-3 shadow-2xl w-64">
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-[-1px]">
                  <div className="border-8 border-transparent border-b-orange-500"></div>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  You choose the amount you'll send and get both variable and fixed quotes to choose from.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* From Amount */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            {/* <label className="text-gray-300 font-semibold text-base md:text-lg">
              You Send
            </label> */}
          </div>
          <div className="flex items-center bg-white/5 rounded-xl p-1 gap-3 border-2 border-white/10 hover:border-purple-500/50 transition-colors">
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => setFromAmount(handleAmountInput(e.target.value))}
              placeholder="You send:"
              className="flex-1 min-w-0 bg-transparent text-white text-base md:text-lg font-semibold outline-none placeholder-gray-500 py-1 text-center"
            />
            <div className="flex-shrink-0">
              <CurrencySelector
                currencies={fromCurrencies}
                selectedCurrency={fromCurrency}
                onCurrencyChange={setFromCurrency}
                disabled={fromLoading}
                title="Select Currency to Send"
                disabledCurrency={toCurrency}
              />
            </div>
          </div>
          {validationErrors.fromAmount && (
            <p className="text-red-400 text-sm px-1">
              {validationErrors.fromAmount}
            </p>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapCurrencies}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-200 shadow-lg hover:scale-110"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>

        {/* To Amount */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center bg-white/5 rounded-xl p-1 gap-3 border-2 border-white/10">
            <div className="flex-1 min-w-0 py-1 text-center">
              <span className="text-white text-base md:text-lg">
                To trade for:
              </span>
            </div>
            <div className="flex-shrink-0">
              <CurrencySelector
                currencies={toCurrencies}
                selectedCurrency={toCurrency}
                onCurrencyChange={setToCurrency}
                disabled={toLoading}
                title="Select Currency to Receive"
                disabledCurrency={fromCurrency}
              />
            </div>
          </div>
        </div>


        {/* Search Rate Button */}
        <button
          onClick={handleSearchRates}
          disabled={isLoadingRates}
          className="w-full bg-gradient-to-r mt-3 from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 text-base md:text-lg"
        >
          {isLoadingRates ? (
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
              Searching Rates...
            </span>
          ) : (
            "Search Rate"
          )}
        </button>

        {/* Check Transaction Status Form */}
        <div ref={statusFormRef} className="mt-4 overflow-hidden">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowStatusForm(!showStatusForm);
            }}
            className="w-full px-4 py-2.5 flex items-center justify-center cursor-pointer gap-1 block"
          >
            <span className="text-white text-sm md:text-base">
              Check your transaction status
            </span>
            <svg
              className={`w-4 h-4 text-white transition-transform duration-200 ${
                showStatusForm ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
          {showStatusForm && (
            <div className="px-4 pb-4 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-gray-300 text-sm">ShieldSwap ID:</label>
                <input
                  type="text"
                  value={trocadorId}
                  onChange={(e) => setTrocadorId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && trocadorId.trim()) {
                      navigate(`/exchange/${trocadorId.trim()}`);
                    }
                  }}
                  placeholder="Enter ShieldSwap ID"
                  className="w-full bg-white/5 text-white p-2 rounded-lg outline-none border-2 border-white/10 hover:border-purple-500/50 focus:border-purple-500 transition-colors text-sm"
                />
              </div>
              <button
                onClick={() => {
                  if (trocadorId.trim()) {
                    navigate(`/exchange/${trocadorId.trim()}`);
                  }
                }}
                disabled={!trocadorId.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 text-sm font-semibold"
              >
                Check
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeForm;
