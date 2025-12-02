import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getTrocadorTrade, getTrocadorRates, type TrocadorTradeDetails } from "../services/trocadorService";
import ExchangePage from "./ExchangePage";
import TransactionStatusPage from "./TransactionStatusPage";

/**
 * Wrapper component that decides which page to show based on trade status
 * - If status is "new" → Show ExchangePage (provider selection)
 * - If status is anything else → Show TransactionStatusPage (transaction tracking)
 */
const TradePage = () => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tradeData, setTradeData] = useState<TrocadorTradeDetails | null>(null);

  useEffect(() => {
    const checkTradeStatus = async () => {
      if (!tradeId) {
        setError("No trade ID provided");
        setLoading(false);
        return;
      }

      try {
        const fetchedTradeData = await getTrocadorTrade(tradeId);
        setTradeData(fetchedTradeData);
        setStatus(fetchedTradeData.status);
        
        // If status is "new" and we don't have rate data in state
        if (fetchedTradeData.status?.toLowerCase().trim() === "new" && !location.state?.rateData) {
          // Use quotes from trade data if available
          if (fetchedTradeData.quotes) {
            
            // Convert trade data to rate response format
            const rateData = {
              trade_id: fetchedTradeData.trade_id,
              date: fetchedTradeData.date,
              ticker_from: fetchedTradeData.ticker_from,
              ticker_to: fetchedTradeData.ticker_to,
              coin_from: fetchedTradeData.coin_from,
              coin_to: fetchedTradeData.coin_to,
              network_from: fetchedTradeData.network_from,
              network_to: fetchedTradeData.network_to,
              amount_from: fetchedTradeData.amount_from,
              amount_to: fetchedTradeData.amount_to,
              provider: fetchedTradeData.provider,
              fixed: fetchedTradeData.fixed,
              payment: fetchedTradeData.payment,
              status: fetchedTradeData.status,
              quotes: fetchedTradeData.quotes,
            };
            
            // Navigate with rate data to trigger re-render
            navigate(`/exchange/${tradeId}`, {
              replace: true,
              state: { rateData }
            });
            return;
          } else {
            // Fallback: fetch rates if no quotes in trade data
            const rateData = await getTrocadorRates({
              tickerFrom: fetchedTradeData.ticker_from,
              tickerTo: fetchedTradeData.ticker_to,
              networkFrom: fetchedTradeData.network_from,
              networkTo: fetchedTradeData.network_to,
              amountFrom: fetchedTradeData.amount_from,
            });
            
            navigate(`/exchange/${tradeId}`, {
              replace: true,
              state: { rateData }
            });
            return;
          }
        }
        
        setError(null);
      } catch (err) {
        console.error("Error checking trade status:", err);
        setError("Failed to load trade");
      } finally {
        setLoading(false);
      }
    };

    checkTradeStatus();
  }, [tradeId, location.state, navigate]);

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
          <div className="text-white text-xl">Loading trade...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 w-full">
        <div className="text-red-400 text-xl">{error}</div>
        <a
          href="/"
          className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
        >
          Back to Home
        </a>
      </div>
    );
  }

  // Render ExchangePage if status is "new", otherwise show TransactionStatusPage
  const isNewStatus = status && status.toLowerCase().trim() === "new";
  
  if (isNewStatus) {
    return <ExchangePage />;
  } else {
    // Pass initial trade data to TransactionStatusPage to avoid duplicate API call
    return <TransactionStatusPage initialTradeData={tradeData} />;
  }
};

export default TradePage;

