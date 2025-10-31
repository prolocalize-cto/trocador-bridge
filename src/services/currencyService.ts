import type { Currency } from "../types/currency";
import currencyData from "../assets/currency.json";

// Cache for currencies
let currenciesCache: Currency[] | null = null;

// Popular cryptocurrencies list (matching exact networks from currency.json)
const POPULAR_CURRENCIES = [
  { ticker: "btc", network: "Mainnet" },
  { ticker: "eth", network: "ERC20" },
  { ticker: "usdt", network: "ERC20" },
  { ticker: "sol", network: "Mainnet" },
  { ticker: "usdc", network: "ERC20" },
  { ticker: "xrp", network: "Mainnet" },
  { ticker: "doge", network: "Mainnet" },
  { ticker: "trx", network: "Mainnet" },
  { ticker: "ton", network: "Mainnet" },
];

// Map new currency format to our Currency format
const mapCurrencyData = (item: any): Currency => {
  return {
    name: item.name,
    ticker: item.ticker,
    network: item.network,
    memo: item.memo || false,
    image: item.image || "",
    minimum: item.minimum || 0,
    maximum: item.maximum || 0,
  };
};

// Main function to get currencies from local JSON
export const getCurrencies = async (): Promise<Currency[]> => {
  // Return cached currencies if available
  if (currenciesCache) {
    return currenciesCache;
  }

  try {
    // The new JSON is a direct array
    const currencyArray = Array.isArray(currencyData) ? currencyData : [];

    if (currencyArray.length > 0) {
      // Map new format to our Currency format and mark popular ones
      currenciesCache = currencyArray.map((item: any) => {
        const currency = mapCurrencyData(item);
        return {
          ...currency,
          popular: POPULAR_CURRENCIES.some(
            (pop) =>
              pop.ticker.toLowerCase() === currency.ticker.toLowerCase() &&
              pop.network.toLowerCase() === currency.network.toLowerCase()
          ),
        };
      });

      return currenciesCache;
    } else {
      throw new Error("Invalid JSON format - empty array");
    }
  } catch (error) {
    console.error("Error loading currencies from JSON:", error);
    return [];
  }
};

// Get currencies that can be used as "from" currency
export const getCurrenciesForFrom = async (): Promise<Currency[]> => {
  const currencies = await getCurrencies();
  return currencies; // All currencies are enabled in new format
};

// Get currencies that can be used as "to" currency
export const getCurrenciesForTo = async (): Promise<Currency[]> => {
  const currencies = await getCurrencies();
  return currencies; // All currencies are enabled in new format
};

// Get a specific currency by ticker
export const getCurrencyByTicker = async (
  ticker: string
): Promise<Currency | undefined> => {
  const currencies = await getCurrencies();
  return currencies.find(
    (currency) => currency.ticker.toLowerCase() === ticker.toLowerCase()
  );
};

// Clear cache (useful for testing or forcing refresh)
export const clearCurrenciesCache = (): void => {
  currenciesCache = null;
};
