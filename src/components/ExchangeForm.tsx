import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Currency } from "../types/currency";
import {
  useCurrenciesForFrom,
  useCurrenciesForTo,
} from "../hooks/useCurrencies";
import CurrencySelector from "./CurrencySelector";
import { 
  getExchangeAmount, 
  createTransaction
} from "../services/exchangeService";

// Helper to extract ticker from currency ID (ticker_network)
const getTickerFromCurrencyId = (currencyId: string): string => {
  return currencyId.split('_')[0];
};

// Helper to extract network from currency ID (ticker_network)
const getNetworkFromCurrencyId = (currencyId: string): string => {
  const parts = currencyId.split('_');
  return parts.length > 1 ? parts.slice(1).join('_') : parts[0];
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

const ExchangeForm = () => {
  const navigate = useNavigate();
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("btc_MAINNET"); // BTC on Mainnet network
  const [toCurrency, setToCurrency] = useState("eth_ERC20"); // ETH on ERC20 network
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<string>("");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [transactionError, setTransactionError] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<{
    fromAmount?: string;
    recipientAddress?: string;
  }>({});

  // Helper function to format numbers by removing trailing zeros
  const formatNumber = (value: string): string => {
    if (!value || value === "") return "";
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    // Remove trailing zeros and unnecessary decimal point
    return num.toString();
  };

  // Helper function to validate and format input
  const handleAmountInput = (value: string): string => {
    // Allow empty string
    if (value === "") return "";
    
    // Remove leading zeros except for decimals like "0.123"
    if (value.startsWith("0") && value.length > 1 && value[1] !== ".") {
      value = value.replace(/^0+/, "");
    }
    
    // Only allow numbers and one decimal point
    const regex = /^\d*\.?\d*$/;
    if (!regex.test(value)) return fromAmount;
    
    return value;
  };

  const { currencies: apiFromCurrencies, loading: fromLoading } =
    useCurrenciesForFrom();
  const { currencies: apiToCurrencies, loading: toLoading } =
    useCurrenciesForTo();

  // Use default currencies until API loads
  const fromCurrencies =
    apiFromCurrencies.length > 0 ? apiFromCurrencies : DEFAULT_FROM_CURRENCIES;
  const toCurrencies =
    apiToCurrencies.length > 0 ? apiToCurrencies : DEFAULT_TO_CURRENCIES;

  // Fetch exchange rate
  const fetchExchangeRate = useCallback(async () => {
    if (
      !fromAmount ||
      parseFloat(fromAmount) <= 0 ||
      !fromCurrency ||
      !toCurrency
    ) {
      setToAmount("");
      return;
    }

    setIsLoadingPrice(true);
    try {
      // Extract ticker and network from currency ID for API call
      const fromTicker = getTickerFromCurrencyId(fromCurrency);
      const toTicker = getTickerFromCurrencyId(toCurrency);
      const fromNetwork = getNetworkFromCurrencyId(fromCurrency);
      const toNetwork = getNetworkFromCurrencyId(toCurrency);
      
      const result = await getExchangeAmount({
        from: fromTicker,
        to: toTicker,
        amountFrom: fromAmount,
        networkFrom: fromNetwork,
        networkTo: toNetwork,
      });

      console.log("result ===============>", result);

      if (result) {
        setToAmount(formatNumber(result.amountTo));
        setExchangeRate(result.rate);
        setMinAmount(formatNumber(result.minFrom));
        setMaxAmount(formatNumber(result.maxFrom));
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setToAmount("");
    } finally {
      setIsLoadingPrice(false);
    }
  }, [fromAmount, fromCurrency, toCurrency]);

  // Fetch exchange rate when amount or currencies change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchExchangeRate();
    }, 500); // Debounce for 500ms

    return () => clearTimeout(debounceTimer);
  }, [fetchExchangeRate]);

  const handleSwap = () => {
    const tempAmount = fromAmount;
    const tempCurrency = fromCurrency;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
  };

  // Validate form inputs
  const validateForm = (): boolean => {
    const errors: { fromAmount?: string; recipientAddress?: string } = {};

    // Validate amount
    if (!fromAmount || fromAmount === "") {
      errors.fromAmount = "Please enter an amount";
    } else {
      const amount = parseFloat(fromAmount);
      if (isNaN(amount) || amount <= 0) {
        errors.fromAmount = "Please enter a valid amount";
      } else if (minAmount && amount < parseFloat(minAmount)) {
        errors.fromAmount = `Minimum amount is ${minAmount} ${getTickerFromCurrencyId(fromCurrency).toUpperCase()}`;
      } else if (maxAmount && amount > parseFloat(maxAmount)) {
        errors.fromAmount = `Maximum amount is ${maxAmount} ${getTickerFromCurrencyId(fromCurrency).toUpperCase()}`;
      }
    }

    // Validate recipient address
    if (!recipientAddress || recipientAddress.trim() === "") {
      errors.recipientAddress = "Please enter a recipient wallet address";
    } else if (recipientAddress.length < 10) {
      errors.recipientAddress = "Please enter a valid wallet address";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle confirm exchange button click
  const handleConfirmExchange = async () => {
    // Clear previous errors
    setTransactionError("");
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsCreatingTransaction(true);

    try {
      // Extract ticker and network from currency ID for API call
      const fromTicker = getTickerFromCurrencyId(fromCurrency);
      const toTicker = getTickerFromCurrencyId(toCurrency);
      const fromNetwork = getNetworkFromCurrencyId(fromCurrency);
      const toNetwork = getNetworkFromCurrencyId(toCurrency);
      
      const transaction = await createTransaction({
        from: fromTicker,
        to: toTicker,
        amountFrom: fromAmount,
        address: recipientAddress,
        networkFrom: fromNetwork,
        networkTo: toNetwork,
      });

      console.log("✅ Transaction created successfully:", transaction);
      
      // Save transaction to localStorage for the status page
      localStorage.setItem(`transaction_${transaction.id}`, JSON.stringify(transaction));
      
      // Navigate to the transaction status page
      navigate(`/txs?id=${transaction.id}`);
    } catch (error) {
      console.error("❌ Error creating transaction:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create transaction. Please try again.";
      setTransactionError(errorMessage);
    } finally {
      setIsCreatingTransaction(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-white/20 w-full max-w-[95%] sm:w-[600px] md:w-[650px] lg:w-[700px] xl:w-[750px] mx-auto flex flex-col gap-5">
      {/* You Send */}
      <div>
        <label className="block text-white/80 text-base md:text-lg font-medium mb-3 text-left">
          You Send
        </label>
        <div className={`bg-white/10 rounded-xl py-1 px-4 pr-2 border ${validationErrors.fromAmount ? 'border-red-500' : 'border-white/20'}`}>
          <div className="flex items-center justify-between">
            <input
              type="text"
              inputMode="decimal"
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(handleAmountInput(e.target.value));
                // Clear validation error when user types
                if (validationErrors.fromAmount) {
                  setValidationErrors({ ...validationErrors, fromAmount: undefined });
                }
              }}
              className="bg-transparent text-white text-lg md:text-xl font-semibold w-full outline-none placeholder-gray-400"
              placeholder="0.1"
            />
            <div className="ml-4 flex-shrink-0">
              <CurrencySelector
                currencies={fromCurrencies}
                selectedCurrency={fromCurrency}
                onCurrencyChange={setFromCurrency}
                disabled={fromLoading}
                title="Select Cryptocurrency to Send"
                disabledCurrency={toCurrency}
              />
            </div>
          </div>
        </div>
        {validationErrors.fromAmount && (
          <div className="mt-1 text-xs text-red-400 text-left">
            {validationErrors.fromAmount}
          </div>
        )}
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSwap}
          className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
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

      {/* You Get */}
      <div>
        <label className="block text-white/80 text-base md:text-lg font-medium mb-3 text-left">
          You Get
        </label>
        <div className="bg-white/10 rounded-xl py-1 px-4 pr-2 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center w-full min-w-0">
              <input
                type="text"
                inputMode="decimal"
                value={toAmount}
                className="bg-transparent text-white text-lg md:text-xl font-semibold w-full outline-none placeholder-gray-400 min-w-0 flex-shrink"
                placeholder="0.00"
                readOnly
              />
              {isLoadingPrice && (
                <div className="ml-2 flex-shrink-0">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="ml-4 flex-shrink-0">
              <CurrencySelector
                currencies={toCurrencies}
                selectedCurrency={toCurrency}
                onCurrencyChange={setToCurrency}
                disabled={toLoading}
                title="Select Cryptocurrency to Receive"
                disabledCurrency={fromCurrency}
              />
            </div>
          </div>
        </div>
        {/* Exchange Rate Info */}
        {exchangeRate && (
          <div className="mt-2 text-xs text-white/60 text-left">
            Rate: 1 {getTickerFromCurrencyId(fromCurrency).toUpperCase()} ≈{" "}
            {formatNumber(parseFloat(exchangeRate).toFixed(8))} {getTickerFromCurrencyId(toCurrency).toUpperCase()}
          </div>
        )}
        {/* Min/Max Info */}
        {minAmount && maxAmount && (
          <div className="mt-1 text-xs text-white/60 text-left">
            Min: {minAmount} {getTickerFromCurrencyId(fromCurrency).toUpperCase()} • Max: {maxAmount}{" "}
            {getTickerFromCurrencyId(fromCurrency).toUpperCase()}
          </div>
        )}
      </div>

      {/* Recipient Wallet */}
      <div>
        <label className="block text-white/80 text-base md:text-lg font-medium mb-3 text-left">
          Recipient Wallet
        </label>
        <div className={`bg-white/10 rounded-xl p-3 border ${validationErrors.recipientAddress ? 'border-red-500' : 'border-white/20'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex-shrink-0"></div>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => {
                setRecipientAddress(e.target.value);
                // Clear validation error when user types
                if (validationErrors.recipientAddress) {
                  setValidationErrors({ ...validationErrors, recipientAddress: undefined });
                }
                // Clear transaction error when user modifies input
                if (transactionError) {
                  setTransactionError("");
                }
              }}
              placeholder="Enter the payout address"
              className="bg-transparent text-white placeholder-white/60 w-full outline-none text-base md:text-lg"
            />
          </div>
        </div>
        {validationErrors.recipientAddress && (
          <div className="mt-1 text-xs text-red-400 text-left">
            {validationErrors.recipientAddress}
          </div>
        )}
      </div>

      {/* Transaction Error */}
      {transactionError && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3">
          <div className="flex items-start space-x-2">
            <svg
              className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-red-400">{transactionError}</div>
          </div>
        </div>
      )}

      {/* Confirm Exchange Button */}
      <button
        onClick={handleConfirmExchange}
        disabled={isCreatingTransaction || isLoadingPrice}
        className={`w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg md:text-xl ${
          isCreatingTransaction || isLoadingPrice
            ? "opacity-50 cursor-not-allowed"
            : "hover:from-pink-500 hover:to-purple-600 transform hover:scale-105"
        }`}
      >
        {isCreatingTransaction ? (
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Creating Transaction...</span>
          </div>
        ) : (
          "Confirm Exchange"
        )}
      </button>

      {/* How to Exchange Link */}
      <div className="text-center">
        <a
          href="#how-it-works"
          className="text-white/60 hover:text-white text-sm underline cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          How to Exchange?
        </a>
      </div>
    </div>
  );
};

export default ExchangeForm;
