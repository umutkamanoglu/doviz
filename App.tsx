import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useCurrencyData } from 'hooks/useCurrencyData';
import './global.css';
import CurrencyCard from 'components/currencyCard';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const { data, loading, error, refetch, lastUpdate } = useCurrencyData(30000);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const formatTime = (date: Date | null) => {
    if (!date) return 'Henüz güncellenmedi';
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const mainCurrencies = data?.rates.filter(rate =>
    !rate.isTRYBase && ['USDTRY', 'EURTRY', 'GBPTRY', 'CHFTRY'].includes(rate.code)
  ) || [];

  const otherCurrencies = data?.rates.filter(rate =>
    !rate.isTRYBase && !['USDTRY', 'EURTRY', 'GBPTRY', 'CHFTRY'].includes(rate.code)
  ) || [];

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900 p-4">
        <Text className="text-red-500 text-center mb-4 text-lg">❌ {error}</Text>
        <TouchableOpacity
          onPress={refetch}
          className="bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      className='flex-1 bg-gray-50 dark:bg-gray-900'
    >
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              💱 Döviz Kurları
            </Text>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  Son güncelleme: {formatTime(lastUpdate)}
                </Text>
                {data?.meta && (
                  <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    TCMB: {formatDate(data.meta.updated_at)}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={refetch}
                disabled={loading}
                className={`px-4 py-2 rounded-lg ${loading ? 'bg-gray-300' : 'bg-blue-500'}`}
              >
                <Text className="text-white font-semibold">
                  {loading ? <Ionicons name="hourglass" size={15} /> : <Ionicons name="refresh" size={15} />} Yenile
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading && !data ? (
            <View className="flex-1 justify-center items-center py-20">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="text-gray-500 dark:text-gray-400 mt-4">Yükleniyor...</Text>
            </View>
          ) : (
            <>
              {/* Ana Dövizler */}
              <View className="mb-6">
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Ana Dövizler
                </Text>
                <View className="space-y-3">
                  {mainCurrencies.map((rate) => (
                    <CurrencyCard
                      key={rate.code}
                      code={rate.code}
                      value={rate.value}
                      isTRYBase={rate.isTRYBase}
                    />
                  ))}
                </View>
              </View>

              {/* Diğer Dövizler */}
              <View className="mb-6">
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Diğer Dövizler
                </Text>
                <View className="space-y-3">
                  {otherCurrencies.map((rate) => (
                    <CurrencyCard
                      key={rate.code}
                      code={rate.code}
                      value={rate.value}
                      isTRYBase={rate.isTRYBase}
                    />
                  ))}
                </View>
              </View>

              {/* Kaynak Bilgisi */}
              {data?.meta && (
                <View className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <Text className="text-sm text-blue-600 dark:text-blue-400">
                    ℹ️ Kaynak: {data.meta.source}
                  </Text>
                  <Text className="text-xs text-blue-500 dark:text-blue-300 mt-1">
                    Otomatik güncelleme: Her 30 saniyede bir
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
