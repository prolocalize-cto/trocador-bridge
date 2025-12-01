import { useState } from "react";
import type { Currency } from "../types/currency";
import CurrencyModal from "./CurrencyModal";

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: string;
  onCurrencyChange: (currencyId: string) => void;
  disabled?: boolean;
  title: string;
  disabledCurrency?: string; // Currency that should be disabled in the modal
}

// Helper function to create unique currency ID (ticker_network)
// Preserves original network case for API compatibility
export const getCurrencyId = (ticker: string, network: string) => {
  return `${ticker.toLowerCase()}_${network}`;
};

// Helper function to parse currency ID back to ticker and network
const parseCurrencyId = (currencyId: string): { ticker: string; network: string } => {
  const parts = currencyId.split('_');
  if (parts.length >= 2) {
    const ticker = parts[0];
    const network = parts.slice(1).join('_'); // Handle networks with underscores
    return { ticker, network };
  }
  // Fallback for old format (just ticker)
  return { ticker: currencyId, network: '' };
};

const CurrencySelector = ({
  currencies,
  selectedCurrency,
  onCurrencyChange,
  disabled = false,
  title,
  disabledCurrency,
}: CurrencySelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Parse the selected currency ID to get ticker and network
  const { ticker: selectedTicker, network: selectedNetwork } = parseCurrencyId(selectedCurrency);
  
  // Find the selected currency by both ticker AND network
  const selectedCurrencyData = currencies.find(
    (c) => c.ticker.toLowerCase() === selectedTicker.toLowerCase() && 
           (selectedNetwork === '' || c.network === selectedNetwork)
  ) || currencies.find((c) => c.ticker.toLowerCase() === selectedTicker.toLowerCase());

  const getNetworkColor = (network: string) => {
    const colors: { [key: string]: string } = {
      ETH: "bg-purple-500",
      BSC: "bg-yellow-500",
      POLYGON: "bg-purple-500",
      ARBITRUM: "bg-purple-600",
      OPTIMISM: "bg-red-500",
      AVALANCHE: "bg-red-600",
      TRON: "bg-red-700",
      SOL: "bg-purple-600",
      NEAR: "bg-gray-500",
      TON: "bg-purple-700",
      XDC: "bg-green-500",
      RONIN: "bg-orange-500",
      XEC: "bg-orange-600",
      XTZ: "bg-gray-600",
      LIQUID: "bg-gray-400",
      AVAXC: "bg-red-500",
      TRX: "bg-red-600",
      BTC: "bg-orange-500",
      DOGE: "bg-yellow-600",
      DEFAULT: "bg-gray-500",
    };
    return colors[network.toUpperCase()] || colors["DEFAULT"];
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
        className="flex items-center px-[2px] py-[1px] justify-between w-full bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-1">
          {selectedCurrencyData && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={selectedCurrencyData.image}
                alt={selectedCurrencyData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="w-full h-full rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-sm">${selectedCurrencyData.ticker
                      .charAt(0)
                      .toUpperCase()}</div>`;
                  }
                }}
              />
            </div>
          )}
          <div className="flex items-start gap-1 items-center">
            <span className="text-white text-base">
              {selectedCurrencyData?.ticker.toUpperCase() || "Select"}
            </span>
            {selectedCurrencyData && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getNetworkColor(
                  selectedCurrencyData.network
                )}`}
              >
                {selectedCurrencyData.network.toUpperCase()}
              </span>
            )}
          </div>
        </div>
        <svg
          className="w-5 h-5 text-gray-400"
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

      <CurrencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={onCurrencyChange}
        title={title}
        disabledCurrency={disabledCurrency}
      />
    </>
  );
};

export default CurrencySelector;
