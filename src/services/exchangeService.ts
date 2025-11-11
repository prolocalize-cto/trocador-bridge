// Exchange service for transaction status checking
// Note: Transaction creation is now handled by Trocador API (see trocadorService.ts)

export interface TransactionDetails {
  id: string;
  trackUrl?: string;
  createdAt?: number;
  type: string;
  rate: string;
  payinConfirmations: number;
  status: string;
  payTill: string | null;
  currencyFrom: string;
  currencyTo: string;
  networkFrom?: string;
  networkTo?: string;
  payinAddress: string;
  amountExpectedFrom: string;
  payoutAddress: string;
  amountFrom: string;
  amountTo: string;
  amountExpectedTo: string;
  networkFee?: string;
  changellyFee?: string;
  apiExtraFee?: string;
  totalFee?: string;
  canPush?: boolean;
  canRefund?: boolean;
  payinExtraId?: string;
  payoutExtraId?: string;
  provider?: string;
}

/**
 * Get transaction details by ID
 * For now, this reads from localStorage as transactions are stored there
 * TODO: Implement actual Trocador transaction status API when available
 */
export const getTransactions = async (
  ids: string[]
): Promise<TransactionDetails[]> => {
  try {
    const transactions: TransactionDetails[] = [];

    for (const id of ids) {
      // Try to get from localStorage first
      const stored = localStorage.getItem(`transaction_${id}`);
      if (stored) {
        const transaction = JSON.parse(stored);
        transactions.push(transaction);
      } else {
        // If not in localStorage, return a mock "not found" transaction
        transactions.push({
          id,
          type: "float",
          rate: "0",
          payinConfirmations: 0,
          status: "not_found",
          payTill: null,
          currencyFrom: "",
          currencyTo: "",
          payinAddress: "",
          amountExpectedFrom: "0",
          payoutAddress: "",
          amountFrom: "0",
          amountTo: "0",
          amountExpectedTo: "0",
        });
      }
    }

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

