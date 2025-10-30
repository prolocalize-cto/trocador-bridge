import { useState, useEffect, Fragment, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { List } from "react-window";
import type { Currency } from "../types/currency";
import { getCurrencyId } from "./CurrencySelector";

// List item types for virtual scrolling
type ListItem =
  | { type: "header"; label: string; key: string }
  | { type: "currency"; currency: Currency; key: string };

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currencies: Currency[];
  selectedCurrency: string;
  onSelectCurrency: (ticker: string) => void;
  title: string;
  disabledCurrency?: string; // Currency that should be disabled (already selected in other field)
}

const CurrencyModal = ({
  isOpen,
  onClose,
  currencies,
  selectedCurrency,
  onSelectCurrency,
  title,
  disabledCurrency,
}: CurrencyModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and sort currencies, then create list items with headers
  const listItems = useMemo(() => {
    console.log("🔄 Virtual List: Processing currencies...", currencies.length);
    
    let filtered: Currency[];
    
    if (!searchTerm.trim()) {
      filtered = currencies;
    } else {
      filtered = currencies.filter(
        (currency) =>
          currency.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
          currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          currency.network.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort: popular currencies first, then alphabetically by ticker
    const sorted = [...filtered].sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.ticker.localeCompare(b.ticker);
    });

    // Build list items with headers
    const items: ListItem[] = [];
    let addedPopularHeader = false;
    let addedOtherHeader = false;

    sorted.forEach((currency) => {
      if (!searchTerm.trim()) {
        // Add "Popular Cryptocurrencies" header
        if (currency.popular && !addedPopularHeader) {
          items.push({
            type: "header",
            label: "Popular Cryptocurrencies",
            key: "header-popular",
          });
          addedPopularHeader = true;
        }
        
        // Add "Other Cryptocurrencies" header
        if (!currency.popular && !addedOtherHeader && addedPopularHeader) {
          items.push({
            type: "header",
            label: "Other Cryptocurrencies",
            key: "header-other",
          });
          addedOtherHeader = true;
        }
      }

      items.push({
        type: "currency",
        currency,
        key: `${currency.ticker}-${currency.network}`,
      });
    });

    console.log(`✅ Virtual List: Prepared ${items.length} items (only ~6-8 will render at once)`);
    return items;
  }, [searchTerm, currencies]);

  // Reset search when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleCurrencySelect = (currency: Currency) => {
    // Pass unique currency ID (ticker_network) instead of just ticker
    onSelectCurrency(getCurrencyId(currency.ticker, currency.network));
    onClose();
  };

  const getNetworkColor = (network: string) => {
    const colors: { [key: string]: string } = {
      ETH: "bg-blue-500",
      BSC: "bg-yellow-500",
      POLYGON: "bg-purple-500",
      ARBITRUM: "bg-blue-600",
      OPTIMISM: "bg-red-500",
      AVALANCHE: "bg-red-600",
      TRON: "bg-red-700",
      SOL: "bg-purple-600",
      NEAR: "bg-gray-500",
      TON: "bg-blue-700",
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

  // Row renderer for virtual list
  const RowComponent = ({ 
    index, 
    style,
    ariaAttributes 
  }: { 
    index: number; 
    style: React.CSSProperties;
    ariaAttributes: {
      "aria-posinset": number;
      "aria-setsize": number;
      role: "listitem";
    };
  }) => {
    const item = listItems[index];

    if (item.type === "header") {
      return (
        <div
          style={style}
          {...ariaAttributes}
          className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center"
        >
          {item.label}
        </div>
      );
    }

    const { currency } = item;
    const currencyId = getCurrencyId(currency.ticker, currency.network);
    const isDisabled = !!(disabledCurrency && currencyId === disabledCurrency);
    const isSelected = selectedCurrency === currencyId;

    return (
      <div style={style} {...ariaAttributes} className="px-2">
        <button
          onClick={() => !isDisabled && handleCurrencySelect(currency)}
          disabled={isDisabled}
          className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 mb-2 ${
            isDisabled
              ? "bg-[#2a2d3e] opacity-50 cursor-not-allowed"
              : isSelected
              ? "bg-[#374151] border-2 border-blue-400"
              : "bg-[#374151] hover:bg-[#3741512e]"
          }`}
        >
          {/* Currency Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden mr-4 flex-shrink-0 ${isDisabled ? "opacity-50" : ""}`}>
            <img
              src={currency.image}
              alt={currency.name}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">${currency.ticker
                    .charAt(0)
                    .toUpperCase()}</div>`;
                }
              }}
            />
          </div>

          {/* Currency Info */}
          <div className="flex-1 text-left">
            <div className="flex items-center gap-3 mb-1">
              <span className={`font-bold text-lg ${isDisabled ? "text-gray-500" : "text-gray-300"}`}>
                {currency.ticker.toUpperCase()}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getNetworkColor(
                  currency.network
                )} ${isDisabled ? "opacity-50" : ""}`}
              >
                {currency.network.toUpperCase()}
              </span>
            </div>
            <div className={`text-sm ${isDisabled ? "text-gray-600" : "text-gray-500"}`}>
              {currency.name}
            </div>
          </div>

          {/* Selection Indicator */}
          {isSelected && !isDisabled && (
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            </div>
          )}
          
          {/* Disabled Indicator */}
          {isDisabled && (
            <div className="text-xs text-gray-600 italic">
              Already selected
            </div>
          )}
        </button>
      </div>
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal Panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md max-h-[80vh] flex flex-col transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-gray-800 rounded-t-2xl">
                  <Dialog.Title className="text-xl font-bold text-white">
                    {title}
                  </Dialog.Title>
                  <svg
                    className="w-6 h-6 cursor-pointer text-white"
                    onClick={onClose}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>

                {/* Search Bar */}
                <div className="p-6 bg-gray-800">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search cryptocurrency..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Currency List with Virtual Scrolling */}
                <div className="flex-1 bg-[#1f2937] rounded-b-2xl">
                  {listItems.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                      No currencies found
                    </div>
                  ) : (
                    <List
                      defaultHeight={500}
                      rowCount={listItems.length}
                      rowHeight={90}
                      rowComponent={RowComponent}
                      rowProps={{}}
                      className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                      style={{ height: 500, width: "100%" }}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CurrencyModal;
