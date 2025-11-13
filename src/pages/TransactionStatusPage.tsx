import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { type TransactionDetails } from "../services/exchangeService";
import { getTrocadorTrade, type TrocadorTradeDetails } from "../services/trocadorService";
import QRCode from "react-qr-code";

const statusSteps = [
  {
    id: "waiting",
    label: "Awaiting deposit",
    statuses: ["waiting", "new"],
  },
  { id: "confirming", label: "Confirming", statuses: ["confirming"] },
  { id: "sending", label: "Sending to you", statuses: ["sending"] },
  { id: "finished", label: "Finished", statuses: ["finished"] },
];

const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "finished":
      return "bg-green-500/20 text-green-400 border-green-400/50";
    case "confirming":
    case "sending":
      return "bg-blue-500/20 text-blue-400 border-blue-400/50";
    case "failed":
    case "expired":
    case "halted":
      return "bg-red-500/20 text-red-400 border-red-400/50";
    case "refunded":
      return "bg-orange-500/20 text-orange-400 border-orange-400/50";
    case "paid partially":
      return "bg-purple-500/20 text-purple-400 border-purple-400/50";
    case "waiting":
    case "new":
    default:
      return "bg-yellow-500/20 text-yellow-400 border-yellow-400/50";
  }
};

const getStatusMessage = (status: string) => {
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "new":
      return "Rates available, swap not created yet";
    case "waiting":
      return "Swap created, awaiting your deposit";
    case "confirming":
      return "Deposit detected and being confirmed";
    case "sending":
      return "Deposit confirmed, provider is sending coins";
    case "paid partially":
      return "Partial deposit detected - please contact support";
    case "finished":
      return "Exchange complete! 🎉";
    case "failed":
      return "Something went wrong - please contact support";
    case "expired":
      return "Payment time expired";
    case "halted":
      return "Exchange halted - please contact support";
    case "refunded":
      return "Exchange refunded by provider";
    default:
      return status;
  }
};

interface TransactionStatusPageProps {
  initialTradeData?: TrocadorTradeDetails | null;
}

const TransactionStatusPage = ({ initialTradeData }: TransactionStatusPageProps = {}) => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const transactionId = tradeId;
  const [transaction, setTransaction] = useState<TransactionDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expiryTime, setExpiryTime] = useState<Date | null>(null);
  const transactionRef = useRef<TransactionDetails | null>(null);
  const isInitialLoadRef = useRef(true);
  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loadTransactionRef = useRef<((isPolling?: boolean) => Promise<void>) | null>(null);
  const initialLoadTriggeredRef = useRef(false);

  // Helper function to map TrocadorTradeDetails to TransactionDetails
  const mapTradeDataToTransaction = useCallback((tradeData: TrocadorTradeDetails): TransactionDetails => {
    return {
      id: tradeData.trade_id || transactionId || "",
      type: tradeData.fixed ? "fixed" : "float",
      rate:
        tradeData.amount_from > 0
          ? (tradeData.amount_to / tradeData.amount_from).toFixed(8)
          : "0",
      status: tradeData.status || "waiting",
      payTill: tradeData.details?.expiresAt || null,
      payinAddress:
        tradeData.address_provider || tradeData.address_from || "",
      payoutAddress: tradeData.address_user || tradeData.address_to || "",
      amountExpectedFrom: (tradeData.amount_from || 0).toString(),
      amountExpectedTo: (tradeData.amount_to || 0).toString(),
      amountFrom: (tradeData.amount_from || 0).toString(),
      amountTo: (tradeData.amount_to || 0).toString(),
      currencyFrom: tradeData.ticker_from || "",
      currencyTo: tradeData.ticker_to || "",
      networkFrom: tradeData.network_from || "",
      networkTo: tradeData.network_to || "",
      networkFee: undefined,
      payinConfirmations: 0,
      provider: tradeData.provider || "",
    };
  }, [transactionId]);

  const loadTransaction = useCallback(async (isPolling = false) => {
    if (!transactionId) {
      setLoading(false);
      return;
    }

    // Prevent multiple simultaneous initial loads - use atomic check
    if (!isPolling) {
      if (isLoadingRef.current || hasLoadedRef.current) {
        return; // Already loading or already loaded
      }
      isLoadingRef.current = true;
    }

    try {
      // Fetch trade data from Trocador API
      const tradeData = await getTrocadorTrade(transactionId);

      // Set expiry time if available (nested in details object)
      if (tradeData.details?.expiresAt) {
        const expiry = new Date(tradeData.details.expiresAt);
        setExpiryTime(expiry);
      } else {
        setExpiryTime(null);
      }

      // Map Trocador response to TransactionDetails format
      const mappedTransaction: TransactionDetails = {
        id: tradeData.trade_id || transactionId,
        type: tradeData.fixed ? "fixed" : "float",
        rate:
          tradeData.amount_from > 0
            ? (tradeData.amount_to / tradeData.amount_from).toFixed(8)
            : "0",
        status: tradeData.status || "waiting",
        payTill: tradeData.details?.expiresAt || null,
        payinAddress:
          tradeData.address_provider || tradeData.address_from || "",
        payoutAddress: tradeData.address_user || tradeData.address_to || "",
        amountExpectedFrom: (tradeData.amount_from || 0).toString(),
        amountExpectedTo: (tradeData.amount_to || 0).toString(),
        amountFrom: (tradeData.amount_from || 0).toString(),
        amountTo: (tradeData.amount_to || 0).toString(),
        currencyFrom: tradeData.ticker_from || "",
        currencyTo: tradeData.ticker_to || "",
        networkFrom: tradeData.network_from || "",
        networkTo: tradeData.network_to || "",
        networkFee: undefined,
        payinConfirmations: 0,
        provider: tradeData.provider || "",
      };

      transactionRef.current = mappedTransaction;
      setTransaction(mappedTransaction);
      setError(null); // Clear any previous errors
      
      // ALWAYS clear loading state immediately on successful response
      // This ensures data is shown as soon as we get it, even if other requests are pending
      if (isInitialLoadRef.current) {
        isInitialLoadRef.current = false;
        isLoadingRef.current = false;
        hasLoadedRef.current = true; // Mark as successfully loaded
        setLoading(false); // Show data immediately - CRITICAL: do this immediately
      }
    } catch (err) {
      console.error("Error loading transaction:", err);
      
      // Check if it's a 429 error (rate limit)
      const is429Error = err instanceof Error && 
        (err.message.includes("429") || 
         (err as any).status === 429);
      
      // For 429 errors during polling, just log and continue showing current data
      if (is429Error && isPolling) {
        console.warn("Rate limited (429) during polling, keeping current data");
        return;
      }
      
      // For 429 errors on initial load - if we already have data, keep it and don't show error
      if (is429Error && isInitialLoadRef.current) {
        if (transactionRef.current) {
          // We have data from a previous successful request, keep it
          console.warn("Rate limited (429) on initial load, but have data from previous request");
          isInitialLoadRef.current = false;
          isLoadingRef.current = false;
          hasLoadedRef.current = true;
          setLoading(false); // Show existing data
          // Don't set error - we have valid data
          return;
        } else {
          // No data yet, but it's a 429 - wait for next successful request
          console.warn("Rate limited (429) on initial load, no data yet");
          isLoadingRef.current = false;
          // Don't set error yet, wait for successful response
          return;
        }
      }
      
      // For non-429 errors on initial load without data, set error
      // BUT: if we already have transaction data, don't overwrite it with error
      if (!isPolling) {
        // Only update state if we don't have data yet
        if (!transactionRef.current) {
          // Only set error if we don't have any data
          setError(
            `Failed to load transaction details: ${
              err instanceof Error ? err.message : "Unknown error"
            }`
          );
          // Only clear loading if we don't have data
          if (isInitialLoadRef.current) {
            isInitialLoadRef.current = false;
            isLoadingRef.current = false;
            setLoading(false);
          }
        } else {
          // We have data, just clear the loading flags but don't change UI
          if (isInitialLoadRef.current) {
            isInitialLoadRef.current = false;
            isLoadingRef.current = false;
            hasLoadedRef.current = true;
            setLoading(false); // Ensure loading is cleared
          }
        }
      }
    } finally {
      if (isPolling) {
        isLoadingRef.current = false;
      }
    }
  }, [transactionId]);

  // Store the latest loadTransaction function in a ref
  loadTransactionRef.current = loadTransaction;

  // Use initial trade data if provided (from TradePage) to avoid duplicate API call
  useEffect(() => {
    if (initialTradeData && isInitialLoadRef.current) {
      // Map the initial trade data to transaction format
      const mappedTransaction = mapTradeDataToTransaction(initialTradeData);
      
      // Set expiry time if available
      if (initialTradeData.details?.expiresAt) {
        const expiry = new Date(initialTradeData.details.expiresAt);
        setExpiryTime(expiry);
      } else {
        setExpiryTime(null);
      }

      transactionRef.current = mappedTransaction;
      setTransaction(mappedTransaction);
      setError(null);
      setLoading(false);
      isInitialLoadRef.current = false;
      isLoadingRef.current = false;
      hasLoadedRef.current = true;
      initialLoadTriggeredRef.current = true; // Mark as triggered to prevent API call
    }
  }, [initialTradeData, mapTradeDataToTransaction]);

  useEffect(() => {
    // Reset refs when transactionId changes
    isInitialLoadRef.current = !initialTradeData; // Don't reset if we have initial data
    if (!initialTradeData) {
      transactionRef.current = null;
      isLoadingRef.current = false;
      hasLoadedRef.current = false;
      initialLoadTriggeredRef.current = false;
      setLoading(true);
      setError(null);
      setTransaction(null);
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Initial load - only once (synchronous atomic check with additional flag)
    // Skip if we already have initial trade data
    if (!initialTradeData && !initialLoadTriggeredRef.current && !hasLoadedRef.current && !isLoadingRef.current) {
      // Set ALL flags BEFORE calling to prevent race conditions
      initialLoadTriggeredRef.current = true;
      isLoadingRef.current = true;
      hasLoadedRef.current = false; // Ensure it's false
      
      // Call loadTransaction directly (it will handle the async part)
      loadTransactionRef.current?.(false).catch(() => {
        // If the call fails before setting isLoadingRef, reset it
        if (isInitialLoadRef.current && !transactionRef.current) {
          isLoadingRef.current = false;
          initialLoadTriggeredRef.current = false;
        }
      });
    }

    // Poll for updates every 10 seconds
    intervalRef.current = setInterval(() => {
      if (loadTransactionRef.current) {
        loadTransactionRef.current(true);
      }
    }, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [transactionId, initialTradeData]); // Include initialTradeData in dependencies

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Generate wallet-compatible QR code URI based on network
  const qrValue = useMemo(() => {
    if (!transaction || !transaction.payinAddress) return "";

    const address = transaction.payinAddress;
    const amount = transaction.amountExpectedFrom;
    const network = transaction.networkFrom?.toUpperCase() || "";
    const ticker = transaction.currencyFrom?.toUpperCase() || "";

    // Convert amount to proper format (remove trailing zeros, use appropriate decimals)
    const formatAmount = (amt: string): string => {
      const num = parseFloat(amt);
      if (isNaN(num)) return amt;
      // For Bitcoin and similar, use 8 decimals max
      if (network === "MAINNET" && ticker === "BTC") {
        return num.toFixed(8).replace(/\.?0+$/, "");
      }
      // For Ethereum and tokens, use 18 decimals max
      if (network === "ERC20" || network === "BEP20") {
        return num.toFixed(18).replace(/\.?0+$/, "");
      }
      // For Solana, use 9 decimals
      if (network === "SOL" || (network === "MAINNET" && ticker === "SOL")) {
        return num.toFixed(9).replace(/\.?0+$/, "");
      }
      // Default: keep original but remove trailing zeros
      return num.toString().replace(/\.?0+$/, "");
    };

    const formattedAmount = formatAmount(amount);

    // Generate URI based on network type
    switch (network) {
      case "MAINNET":
        if (ticker === "BTC") {
          // Bitcoin URI scheme
          return `bitcoin:${address}?amount=${formattedAmount}`;
        } else if (ticker === "SOL") {
          // Solana - some wallets support solana: URI
          return `solana:${address}?amount=${formattedAmount}`;
        } else if (ticker === "TRX" || ticker === "TRON") {
          // Tron
          return `tron:${address}?amount=${formattedAmount}`;
        } else if (ticker === "DOGE") {
          // Dogecoin
          return `dogecoin:${address}?amount=${formattedAmount}`;
        } else if (ticker === "XRP") {
          // XRP - some wallets support xrp: URI
          return `xrp:${address}?amount=${formattedAmount}`;
        }
        // For other Mainnet coins, use address only (wallets may not support URI)
        return address;

      case "ERC20":
        // Ethereum and ERC20 tokens
        if (ticker === "ETH") {
          // Native ETH
          return `ethereum:${address}?value=${formattedAmount}`;
        } else {
          // ERC20 token - use ethereum: URI with value=0 and amount parameter
          // Note: For full token support, we'd need the token contract address
          // But Trust Wallet can sometimes infer from amount + network
          return `ethereum:${address}?value=0&amount=${formattedAmount}`;
        }

      case "BEP20":
        // Binance Smart Chain - similar to Ethereum
        if (ticker === "BNB") {
          return `bsc:${address}?value=${formattedAmount}`;
        } else {
          // BEP20 token
          return `bsc:${address}?value=0&amount=${formattedAmount}`;
        }

      case "ARBITRUM":
        // Arbitrum - use Ethereum format
        return `ethereum:${address}?value=${ticker === "ETH" ? formattedAmount : "0"}&amount=${formattedAmount}`;

      case "AVAXC":
      case "AVALANCHE":
        // Avalanche C-Chain
        return `avalanche:${address}?value=${ticker === "AVAX" ? formattedAmount : "0"}&amount=${formattedAmount}`;

      case "POLYGON":
        // Polygon
        return `polygon:${address}?value=${ticker === "MATIC" ? formattedAmount : "0"}&amount=${formattedAmount}`;

      case "SOL":
        // Solana
        return `solana:${address}?amount=${formattedAmount}`;

      default:
        // For unsupported networks, return plain address
        // Most wallets can still scan and recognize the address format
        return address;
    }
  }, [transaction]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const getCurrentStepIndex = (status: string) => {
    const index = statusSteps.findIndex((step) =>
      step.statuses.includes(status.toLowerCase())
    );
    return index !== -1 ? index : 0;
  };

  const formatUTCTime = (date: Date) => {
    return date.toISOString().replace("T", " ").substring(0, 19) + " UTC";
  };

  const getTimeRemaining = () => {
    if (!expiryTime) return null;

    const now = currentTime.getTime();
    const expiry = expiryTime.getTime();
    const diff = expiry - now;

    if (diff <= 0) return { expired: true, hours: 0, minutes: 0, seconds: 0 };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { expired: false, hours, minutes, seconds };
  };

  const timeRemaining = getTimeRemaining();

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
          <div className="text-white text-xl">Loading transaction...</div>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 w-full">
        <div className="text-red-400 text-xl">
          {error || "Transaction not found"}
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

  const currentStepIndex = getCurrentStepIndex(transaction.status);

  return (
    <div className="container mx-auto px-4 py-4 max-w-[800px] flex flex-col gap-4">
      {/* Header Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-white/80 font-medium">Exchange ID:</span>
            <span className="text-white font-mono text-sm md:text-base">
              {transaction.id}
            </span>
            <div
              className={`px-3 py-1 rounded-full border text-xs font-semibold uppercase ${getStatusColor(
                transaction.status
              )}`}
            >
              {transaction.status}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(transaction.id, "id")}
              className="text-blue-400 hover:text-blue-300 transition-colors p-2"
              title="Copy Exchange ID"
            >
              {copiedAddress === "id" ? (
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
            <Link
              to="/contact-us"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Need help?
            </Link>
          </div>
        </div>
      </div>

      {/* Time Information Card */}
      {transaction.status !== "finished" &&
        transaction.status !== "expired" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div
              className={`grid grid-cols-1 ${
                expiryTime ? "md:grid-cols-3" : "md:grid-cols-1"
              } gap-4`}
            >
              {/* Current Time */}
              <div className="flex flex-col">
                <span className="text-white/60 text-xs uppercase font-semibold mb-1">
                  Current Time (UTC)
                </span>
                <span className="text-white text-lg font-mono">
                  {formatUTCTime(currentTime)}
                </span>
              </div>

              {/* Expiry Time - Only show if available */}
              {expiryTime && (
                <>
                  <div className="flex flex-col">
                    <span className="text-white/60 text-xs uppercase font-semibold mb-1">
                      Expires At (UTC)
                    </span>
                    <span className="text-white text-lg font-mono">
                      {formatUTCTime(expiryTime)}
                    </span>
                  </div>

                  {/* Time Remaining */}
                  <div className="flex flex-col">
                    <span className="text-white/60 text-xs uppercase font-semibold mb-1">
                      Time Remaining
                    </span>
                    {timeRemaining && !timeRemaining.expired ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-lg font-mono font-bold ${
                            timeRemaining.hours === 0 &&
                            timeRemaining.minutes < 10
                              ? "text-red-400 animate-pulse"
                              : timeRemaining.hours === 0 &&
                                timeRemaining.minutes < 30
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {String(timeRemaining.hours).padStart(2, "0")}:
                          {String(timeRemaining.minutes).padStart(2, "0")}:
                          {String(timeRemaining.seconds).padStart(2, "0")}
                        </span>
                        {timeRemaining.hours === 0 &&
                          timeRemaining.minutes < 10 && (
                            <span className="text-red-400 text-xs animate-pulse">
                              ⚠️ Hurry!
                            </span>
                          )}
                      </div>
                    ) : (
                      <span className="text-red-400 text-lg font-bold">
                        EXPIRED
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      {/* Main Content Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 md:p-4 border border-white/20">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {currentStepIndex === statusSteps.length - 1
              ? "Exchange Complete! 🎉"
              : transaction.status === "expired"
              ? "Awaiting Deposit"
              : transaction.status === "failed" ||
                transaction.status === "halted"
              ? "Exchange Issue"
              : transaction.status === "refunded"
              ? "Exchange Refunded"
              : "Awaiting Deposit"}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {getStatusMessage(transaction.status)}
          </p>
        </div>

        {/* Error/Warning Alert for problematic statuses */}
        {(transaction.status === "failed" ||
          transaction.status === "expired" ||
          transaction.status === "halted" ||
          transaction.status === "refunded" ||
          transaction.status === "paid partially") && (
          <div
            className={`rounded-xl p-5 mb-6 border ${
              transaction.status === "refunded"
                ? "bg-orange-500/10 border-orange-400/30"
                : transaction.status === "paid partially"
                ? "bg-purple-500/10 border-purple-400/30"
                : "bg-red-500/10 border-red-400/30"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  transaction.status === "refunded"
                    ? "bg-orange-400/20"
                    : transaction.status === "paid partially"
                    ? "bg-purple-400/20"
                    : "bg-red-400/20"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    transaction.status === "refunded"
                      ? "text-orange-400"
                      : transaction.status === "paid partially"
                      ? "text-purple-400"
                      : "text-red-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold mb-1 ${
                    transaction.status === "refunded"
                      ? "text-orange-400"
                      : transaction.status === "paid partially"
                      ? "text-purple-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.status === "failed" && "Exchange Failed"}
                  {transaction.status === "expired" &&
                    "⏰ This Exchange Has Expired"}
                  {transaction.status === "halted" && "Exchange Halted"}
                  {transaction.status === "refunded" && "Exchange Refunded"}
                  {transaction.status === "paid partially" &&
                    "Partial Payment Detected"}
                </h3>
                <p className="text-white/80 text-sm">
                  {transaction.status === "expired"
                    ? "The payment window for this exchange has expired. You can still send the deposit to the address below, but you'll need to contact support to process it manually, or start a new exchange."
                    : transaction.status === "paid partially"
                    ? "You sent less than the required amount. Please contact support for assistance."
                    : "Please contact support with your exchange ID for assistance."}
                </p>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-1 mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Send Deposit Section */}
        <div
          className={`bg-gradient-to-br rounded-xl p-5 border mb-6 ${
            transaction.status === "expired"
              ? "from-red-500/20 to-orange-500/20 border-red-400/30"
              : "from-purple-500/20 to-pink-500/20 border-purple-400/30"
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-400"
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
              </div>
              <div>
                <div className="text-white/80 text-sm font-medium">
                  Send deposit:
                </div>
                <div className="text-white text-xl font-bold">
                  {transaction.amountExpectedFrom}{" "}
                  <span className="text-yellow-400">
                    {transaction.networkFrom
                      ? `${transaction.networkFrom.toUpperCase()} ${transaction.currencyFrom.toUpperCase()}`
                      : transaction.currencyFrom.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            {transaction.status === "expired" && (
              <div className="px-3 py-1 bg-red-500/20 border border-red-400/50 rounded-full">
                <span className="text-red-400 text-xs font-bold">EXPIRED</span>
              </div>
            )}
          </div>

          {/* Deposit Address */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/80 text-sm mb-3 font-medium text-center md:text-left">
              Scan this QR code to deposit{" "}
              {transaction.networkFrom && (
                <span className="text-yellow-400">
                  {transaction.networkFrom.toUpperCase()}{" "}
                  {transaction.currencyFrom.toUpperCase()}
                </span>
              )}
              :
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <QRCode
                  value={qrValue}
                  size={180}
                  fgColor="#0f1b34"
                  bgColor="#ffffff"
                />
              </div>
              <div className="flex-1 w-full">
                <div className="text-white/80 text-xs uppercase font-semibold mb-2 text-center md:text-left">
                  Or copy address manually
                </div>
                <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/20 rounded-xl p-3">
                  <code className="text-white text-xs md:text-sm font-mono break-all">
                    {transaction.payinAddress}
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(transaction.payinAddress, "deposit")
                    }
                    className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0 p-2"
                    title="Copy Address"
                  >
                    {copiedAddress === "deposit" ? (
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="mt-3 text-xs text-white/60 text-center md:text-left">
                  ⚠️ Send only{" "}
                  {transaction.networkFrom
                    ? `${transaction.networkFrom.toUpperCase()} ${transaction.currencyFrom.toUpperCase()}`
                    : transaction.currencyFrom.toUpperCase()}{" "}
                  to this address. Sending any other currency or network will
                  result in permanent loss.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                style={{
                  width: `${
                    (currentStepIndex / (statusSteps.length - 1)) * 100
                  }%`,
                }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isFinished =
                  index === currentStepIndex &&
                  index === statusSteps.length - 1;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted || isFinished
                          ? "bg-gradient-to-br from-green-400 to-green-600"
                          : isCurrent
                          ? "bg-gradient-to-br from-blue-400 to-purple-600 animate-pulse"
                          : "bg-white/10"
                      }`}
                    >
                      {isCompleted || isFinished ? (
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : isCurrent ? (
                        <svg
                          className="w-6 h-6 text-white animate-spin"
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
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-white/30" />
                      )}
                    </div>
                    <div
                      className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                        isCurrent ? "text-white" : "text-white/60"
                      }`}
                    >
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* You will receive Section */}
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-5 border border-blue-400/30 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-400"
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
            <div>
              <div className="text-white/80 text-sm font-medium">
                You will receive:
              </div>
              <div className="text-white text-xl font-bold">
                {transaction.amountExpectedTo}{" "}
                <span className="text-green-400">
                  {transaction.networkTo
                    ? `${transaction.networkTo.toUpperCase()} ${transaction.currencyTo.toUpperCase()}`
                    : transaction.currencyTo.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Recipient Address */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/80 text-sm mb-2 font-medium">
              Recipient address:
            </div>
            <div className="flex items-center justify-between gap-3">
              <code className="text-white text-xs md:text-sm font-mono break-all">
                {transaction.payoutAddress}
              </code>
              <button
                onClick={() =>
                  copyToClipboard(transaction.payoutAddress, "recipient")
                }
                className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0 p-2"
                title="Copy Address"
              >
                {copiedAddress === "recipient" ? (
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="mt-4 space-y-2">
            {transaction.networkFee && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Network fee:</span>
                <span className="text-white/80">
                  {transaction.networkFee}{" "}
                  {transaction.currencyTo.toUpperCase()}
                </span>
              </div>
            )}
            {transaction.amountFrom !== "0" && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Deposited:</span>
                <span className="text-green-400 font-medium">
                  {transaction.amountFrom}{" "}
                  {transaction.currencyFrom.toUpperCase()}
                </span>
              </div>
            )}
            {transaction.payinConfirmations > 0 && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Confirmations:</span>
                <span className="text-blue-400 font-medium">
                  {transaction.payinConfirmations}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-500/10 backdrop-blur-lg rounded-xl p-4 border border-blue-400/30">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-white/80">
            <p className="font-medium mb-1">Important Information:</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-white/60">
              <li>
                Please send the exact amount shown above to complete the
                exchange
              </li>
              <li>
                The exchange will be processed automatically after deposit
                confirmation
              </li>
              <li>You can bookmark this page to track your exchange status</li>
              <li>
                Contact support if you have any issues with your transaction
              </li>
              <li className="text-red-400 font-semibold">
                Do NOT send funds from mixers, gambling or with high AML risk to
                this exchange!
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* New Swap Button - Only show when transaction is finished */}
      {currentStepIndex === statusSteps.length - 1 && (
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Swap
          </Link>
        </div>
      )}
    </div>
  );
};

export default TransactionStatusPage;
