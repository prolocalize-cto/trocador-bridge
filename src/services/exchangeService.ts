const API_BASE_URL = 'https://api.trocador.app/';
const API_KEY = '1LSAndusd1FAicVo4CzYTwGJhD5FBz';

export interface ExchangeAmountRequest {
  from: string;
  to: string;
  amountFrom: string;
  networkFrom?: string;
  networkTo?: string;
}

export interface SimpleSwapEstimateResponse {
  result: {
    estimatedAmount: string;
    rateId: string | null;
    validUntil: string | null;
  };
  traceId: string;
}

export interface ExchangeAmountResponse {
  from: string;
  to: string;
  networkFee: string;
  amountFrom: string;
  amountTo: string;
  max: string;
  maxFrom: string;
  maxTo: string;
  min: string;
  minFrom: string;
  minTo: string;
  visibleAmount: string;
  rate: string;
  fee: string;
}

export const getExchangeAmount = async (
  request: ExchangeAmountRequest
): Promise<ExchangeAmountResponse | null> => {
  try {
    // Build query parameters for SimpleSwap API
    const params = new URLSearchParams({
      fixed: 'false',
      tickerFrom: request.from,
      tickerTo: request.to,
      networkFrom: request.networkFrom || request.from,
      networkTo: request.networkTo || request.to,
      reverse: 'false',
      amount: request.amountFrom,
    });

    const response = await fetch(`${API_BASE_URL}/estimates?${params.toString()}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SimpleSwapEstimateResponse = await response.json();
    
    // Convert SimpleSwap response to our format
    const estimatedAmount = data.result.estimatedAmount;
    const rate = (parseFloat(estimatedAmount) / parseFloat(request.amountFrom)).toString();
    
    return {
      from: request.from,
      to: request.to,
      networkFee: '0',
      amountFrom: request.amountFrom,
      amountTo: estimatedAmount,
      max: '100000',
      maxFrom: '100000',
      maxTo: '0',
      min: '0.001',
      minFrom: '0.001',
      minTo: '0',
      visibleAmount: estimatedAmount,
      rate: rate,
      fee: '0',
    };
  } catch (error) {
    console.error('Error fetching exchange amount:', error);
    return null;
  }
};

export interface CreateTransactionRequest {
  from: string;
  to: string;
  amountFrom: string;
  address: string;
  extraId?: string;
  networkFrom?: string;
  networkTo?: string;
  refundAddress?: string;
  refundExtraId?: string;
}

export interface CreateTransactionResponse {
  id: string;
  payinAddress: string;
  payoutAddress: string;
  payinExtraId?: string;
  payoutExtraId?: string;
  amountExpectedFrom: string;
  amountExpectedTo: string;
  networkFee: string;
  currencyFrom: string;
  currencyTo: string;
  status: string;
  createdAt: number;
  trackUrl: string;
  type: string;
}

export const createTransaction = async (
  request: CreateTransactionRequest
): Promise<CreateTransactionResponse> => {
  // SimpleSwap API request body
  const requestBody = {
    fixed: false,
    tickerFrom: request.from,
    tickerTo: request.to,
    amount: request.amountFrom,
    networkFrom: request.networkFrom || request.from,
    networkTo: request.networkTo || request.to,
    reverse: false,
    addressTo: request.address,
    extraIdTo: request.extraId || "",
    userRefundAddress: request.refundAddress || "",
    userRefundExtraId: request.refundExtraId || "",
    rateId: null,
    customFee: null,
  };

  const response = await fetch(`${API_BASE_URL}/exchanges`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || errorData?.error || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  // Response has result as an array, get the first element
  const result = Array.isArray(data.result) ? data.result[0] : data.result;
  
  if (!result || !result.id) {
    throw new Error('Invalid response from exchange API');
  }
  
  // Convert SimpleSwap response to our format
  return {
    id: result.id,
    payinAddress: result.addressFrom,
    payoutAddress: result.addressTo,
    payinExtraId: result.extraIdFrom || undefined,
    payoutExtraId: result.extraIdTo || undefined,
    amountExpectedFrom: result.expectedAmount || result.amountFrom,
    amountExpectedTo: result.amountTo,
    networkFee: '0',
    currencyFrom: result.tickerFrom,
    currencyTo: result.tickerTo,
    status: result.status,
    createdAt: new Date(result.updatedAt).getTime() || Date.now(),
    trackUrl: `https://simpleswap.io/track/${result.id}`,
    type: result.type || 'float',
  };
};

export interface TransactionDetails {
  id: string;
  trackUrl: string;
  createdAt: number;
  type: string;
  rate: string;
  payinConfirmations: number;
  status: string;
  payTill: string | null;
  currencyFrom: string;
  currencyTo: string;
  payinAddress: string;
  amountExpectedFrom: string;
  payoutAddress: string;
  amountFrom: string;
  amountTo: string;
  amountExpectedTo: string;
  networkFee: string;
  changellyFee: string;
  apiExtraFee: string;
  totalFee: string;
  canPush: boolean;
  canRefund: boolean;
}

export interface GetTransactionsResponse {
  jsonrpc: string;
  result: TransactionDetails[];
  id: string;
}

export const getTransactions = async (
  transactionIds: string[]
): Promise<TransactionDetails[]> => {
  // SimpleSwap uses individual exchange/{id} endpoint
  // Fetch all transactions in parallel
  const promises = transactionIds.map(async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/exchanges/${id}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-api-key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Convert SimpleSwap response to our TransactionDetails format
      const result = data.result || data;
      return {
        id: result.id,
        trackUrl: `https://simpleswap.io/track/${result.id}`,
        createdAt: result.createdAt || Date.now(),
        type: result.type || 'float',
        rate: result.rate || '0',
        payinConfirmations: result.payinConfirmations || 0,
        status: result.status,
        payTill: result.payTill || null,
        currencyFrom: result.currencyFrom || result.tickerFrom,
        currencyTo: result.currencyTo || result.tickerTo,
        payinAddress: result.payinAddress || result.addressFrom,
        amountExpectedFrom: result.amountExpectedFrom || result.amountFrom || '0',
        payoutAddress: result.payoutAddress || result.addressTo,
        amountFrom: result.amountFrom || '0',
        amountTo: result.amountTo || '0',
        amountExpectedTo: result.amountExpectedTo || result.amountTo || '0',
        networkFee: result.networkFee || '0',
        changellyFee: '0',
        apiExtraFee: '0',
        totalFee: result.networkFee || '0',
        canPush: false,
        canRefund: false,
      };
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error);
      // Return a default transaction object on error
      return {
        id,
        trackUrl: `https://simpleswap.io/track/${id}`,
        createdAt: Date.now(),
        type: 'float',
        rate: '0',
        payinConfirmations: 0,
        status: 'error',
        payTill: null,
        currencyFrom: '',
        currencyTo: '',
        payinAddress: '',
        amountExpectedFrom: '0',
        payoutAddress: '',
        amountFrom: '0',
        amountTo: '0',
        amountExpectedTo: '0',
        networkFee: '0',
        changellyFee: '0',
        apiExtraFee: '0',
        totalFee: '0',
        canPush: false,
        canRefund: false,
      };
    }
  });

  return Promise.all(promises);
};