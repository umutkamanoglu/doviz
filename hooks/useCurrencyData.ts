import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface CurrencyRate {
    code: string;
    value: number;
    isTRYBase: boolean; // TRY bazlı mı (örn: USDTRY) yoksa karşı para bazlı mı (örn: TRYUSD)
}

interface CurrencyMeta {
    base: string;
    source: string;
    generated_at: string;
    updated_at: string;
}

interface CurrencyData {
    rates: CurrencyRate[];
    meta: CurrencyMeta;
}

interface UseCurrencyDataReturn {
    data: CurrencyData | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
    lastUpdate: Date | null;
}

export const useCurrencyData = (interval: number = 30000): UseCurrencyDataReturn => {
    const [data, setData] = useState<CurrencyData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const appState = useRef(AppState.currentState);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('https://doviz.dev/v1/try.json', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Veriyi düzenle
            const rates: CurrencyRate[] = [];
            const meta = result._meta;

            // _meta hariç tüm alanları işle
            Object.entries(result).forEach(([key, value]) => {
                if (key !== '_meta' && typeof value === 'number') {
                    rates.push({
                        code: key,
                        value: value as number,
                        isTRYBase: key.startsWith('TRY')
                    });
                }
            });

            setData({ rates, meta });
            setError(null);
            setLastUpdate(new Date());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
            console.error('API hatası:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const startInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            fetchData();
        }, interval);
    }, [fetchData, interval]);

    const stopInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        fetchData();
        startInterval();

        const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                fetchData();
                startInterval();
            } else if (nextAppState.match(/inactive|background/)) {
                stopInterval();
            }
            appState.current = nextAppState;
        });

        return () => {
            stopInterval();
            subscription.remove();
        };
    }, [fetchData, startInterval, stopInterval]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
        lastUpdate
    };
};