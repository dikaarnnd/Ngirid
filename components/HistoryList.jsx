import { Text, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function HistoryList({ showLimit = false }) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchTransactions = async () => {
        try {
          const storedUser = await AsyncStorage.getItem('userData');
          if (!storedUser) return;

          const user = JSON.parse(storedUser);
          console.log("📦 User ID:", user.id);

          const response = await axios.get(`http://192.168.43.173:3000/api/transactions/${user.id}`);

          const cleanedData = response.data.map((item, index) => {
            const id = item.ID || item.id || index;
            const amount = Number(item.AMOUNT || item.amount || 0);
            const type = item.TYPE || item.type || 'expense';
            const note = item.NOTE || item.note || 'Tidak ada catatan';
            const date = item.CREATED_DATE || item.date || new Date().toISOString().split('T')[0];

            if (!id || isNaN(amount)) {
              console.warn("⚠️ Data tidak valid:", item);
            }

            return {
              id,
              amount,
              type,
              note,
              date,
            };
          });

          setData(cleanedData);
        } catch (error) {
          console.error('❌ Gagal ambil transaksi:', error.message);
        }
      };

      fetchTransactions();
    }, [])
  );

  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  const displayedData = showLimit ? sortedData.slice(0, 3) : sortedData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatRupiah = (number) => {
    const validNumber = isNaN(number) ? 0 : Number(number);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(validNumber);
  };

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      className="flex-row justify-between bg-[#6E1E0E] p-4 rounded-3xl mb-2 mx-4"
      onPress={() => {
        const screen = item.type === 'income' ? 'EditSaldo' : 'EditPengeluaran';
        navigation.navigate(screen, {
          id: item.id,
          type: item.type,
          initialData: {
            amount: item.amount.toString(),
            note: item.note,
            date: item.date,
          }
        });
      }}
    >
      <Text className="text-sm text-white font-psemibold">{formatDate(item.date)}</Text>
      <Text className="text-sm text-white font-psemibold">{item.note}</Text>
      <Text
        className={`text-sm font-psemibold ${
          item.type === 'income' ? 'text-[#188D35]' : 'text-[#2477CA]'
        }`}
      >
        {formatRupiah(item.amount)}
      </Text>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <FlatList
      data={displayedData}
      keyExtractor={(item, index) => item?.id?.toString() || `fallback-${index}`}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}
