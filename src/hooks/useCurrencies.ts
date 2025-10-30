import { useState, useEffect } from 'react';
import type { Currency } from '../types/currency';
import { getCurrencies, getCurrenciesForFrom, getCurrenciesForTo } from '../services/currencyService';

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrencies();
        setCurrencies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch currencies');
        console.error('Error fetching currencies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
};

export const useCurrenciesForFrom = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrenciesForFrom();
        setCurrencies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch currencies');
        console.error('Error fetching currencies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
};

export const useCurrenciesForTo = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrenciesForTo();
        setCurrencies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch currencies');
        console.error('Error fetching currencies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
};
