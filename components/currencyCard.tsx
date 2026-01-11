import React from 'react';
import { View, Text } from 'react-native';

interface CurrencyCardProps {
    code: string;
    value: number;
    isTRYBase: boolean;
}

export default function CurrencyCard({ code, value, isTRYBase }: CurrencyCardProps) {
    // Para birimi kodunu ayır (örn: USDTRY -> USD ve TRY)
    const getCurrencyPair = () => {
        if (isTRYBase) {
            const currency = code.replace('TRY', '');
            return { from: 'TRY', to: currency };
        } else {
            const currency = code.replace('TRY', '');
            return { from: currency, to: 'TRY' };
        }
    };

    const pair = getCurrencyPair();

    // Para birimi sembolleri
    const currencySymbols: { [key: string]: string } = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥',
        'CHF': 'Fr',
        'TRY': '₺',
    };

    const getSymbol = (currency: string) => currencySymbols[currency] || currency;

    return (
        <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <View className="flex-row justify-between items-center">
                <View>
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                        {pair.from}/{pair.to}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        1 {getSymbol(pair.from)} = {value.toFixed(4)} {getSymbol(pair.to)}
                    </Text>
                </View>
                <View className="bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-lg">
                    <Text className="text-lg font-semibold text-blue-600 dark:text-blue-300">
                        {value.toFixed(4)}
                    </Text>
                </View>
            </View>
        </View>
    );
}