// Trocador API service
// Use Vite proxy in development to avoid CORS issues
const TROCADOR_API_BASE = import.meta.env.DEV 
  ? "/api/trocador" 
  : "https://api.trocador.app";
const TROCADOR_API_KEY = "1LSAndusd1FAicVo4CzYTwGJhD5FBz";

export interface TrocadorQuote {
  provider: string;
  kycrating: string;
  logpolicy: string;
  insurance: number;
  fixed: string;
  amount_to: string;
  unadjusted_amount_to?: number;
  waste: string;
  eta: number;
  provider_logo: string;
  amount_to_USD: string;
  amount_from_USD: string;
  USD_total_cost_percentage: string;
  partner?: string;
}

export interface TrocadorRateResponse {
  trade_id: string;
  date: string;
  ticker_from: string;
  ticker_to: string;
  coin_from: string;
  coin_to: string;
  network_from: string;
  network_to: string;
  amount_from: number;
  amount_to: number;
  provider: string;
  fixed: boolean;
  payment: boolean;
  status: string;
  quotes: {
    quotes: TrocadorQuote[];
    min_deposit: number;
    max_deposit: number;
    kyc_list: string[];
    logpolicy_list: string[];
    markup: boolean;
    best_only: boolean;
  };
}

export interface GetRateParams {
  tickerFrom: string;
  tickerTo: string;
  networkFrom: string;
  networkTo: string;
  amountFrom: number;
}

export interface ConfirmTradeParams {
  tradeId: string;
  tickerFrom: string;
  tickerTo: string;
  networkFrom: string;
  networkTo: string;
  amountFrom: number;
  address: string;
  provider: string;
  fixed: boolean;
}

export interface TrocadorTradeDetails {
  trade_id: string;
  date: string;
  ticker_from: string;
  ticker_to: string;
  coin_from: string;
  coin_to: string;
  network_from: string;
  network_to: string;
  amount_from: number;
  amount_to: number;
  address_from: string;
  address_to: string;
  address_user: string;
  address_provider: string;
  provider: string;
  fixed: boolean;
  payment: boolean;
  status: string;
  hash_in?: string;
  hash_out?: string;
  url_status?: string;
  details?: {
    expiresAt?: string;
    hashout?: string | null;
    support?: any;
    amount_btc?: number;
    original_eta?: number;
    original_amount_from_USD?: number;
    original_amount_to_USD?: number;
    original_USD_total_cost_percentage?: number;
    original_waste?: number;
    marketrate_creation?: number;
    estimation_creation_diff?: number;
    provider_logo?: string;
  };
  quotes?: {
    quotes: TrocadorQuote[];
    min_deposit: number;
    max_deposit: number;
    kyc_list: string[];
    logpolicy_list: string[];
    markup: boolean;
    best_only: boolean;
  };
}

/**
 * Fetch available exchange providers and their rates from Trocador
 */
export const getTrocadorRates = async (
  params: GetRateParams
): Promise<TrocadorRateResponse> => {
  const { tickerFrom, tickerTo, networkFrom, networkTo, amountFrom } = params;

  const url = `${TROCADOR_API_BASE}/new_rate?ticker_from=${tickerFrom}&ticker_to=${tickerTo}&network_from=${networkFrom}&network_to=${networkTo}&amount_from=${amountFrom}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "API-Key": TROCADOR_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Trocador API error: ${response.status}`);
    }

    const data: TrocadorRateResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Trocador rates:", error);
    throw error;
  }
};

/**
 * Confirm trade with recipient address and provider
 */
export const confirmTrocadorTrade = async (
  params: ConfirmTradeParams
): Promise<TrocadorTradeDetails> => {
  const {
    tradeId,
    tickerFrom,
    tickerTo,
    networkFrom,
    networkTo,
    amountFrom,
    address,
    provider,
    fixed,
  } = params;

  const url = `${TROCADOR_API_BASE}/new_trade?id=${tradeId}&ticker_from=${tickerFrom}&ticker_to=${tickerTo}&network_from=${networkFrom}&network_to=${networkTo}&amount_from=${amountFrom}&address=${address}&provider=${provider}&fixed=${fixed}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "API-Key": TROCADOR_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Trocador API error: ${response.status}`);
    }

    const data: TrocadorTradeDetails = await response.json();
    return data;
  } catch (error) {
    console.error("Error confirming Trocador trade:", error);
    throw error;
  }
};

/**
 * Fetch trade details by trade ID from Trocador
 */
export const getTrocadorTrade = async (
  tradeId: string
): Promise<TrocadorTradeDetails> => {
  const url = `${TROCADOR_API_BASE}/trade?id=${tradeId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "API-Key": TROCADOR_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Trocador API error: ${response.status}`);
    }

    const data: TrocadorTradeDetails[] = await response.json();
    
    // API returns an array with one element
    if (!data || data.length === 0) {
      throw new Error("Trade not found");
    }

    return data[0];
  } catch (error) {
    console.error("Error fetching Trocador trade:", error);
    throw error;
  }
};
