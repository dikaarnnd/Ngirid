import { Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HistoryList({ showLimit = false }) {
  const navigation = useNavigation();

  const data = [
    { type: 'income', date: '2025-05-01', note: 'Gaji Bulanan', price: 5000000 },
    { type: 'expense', date: '2025-05-02', note: 'Belanja Harian', price: 200000 },
    { type: 'income', date: '2025-05-03', note: 'Freelance Project', price: 1500000 },
    { type: 'expense', date: '2025-05-04', note: 'Transportasi', price: 100000 },
    { type: 'income', date: '2025-05-05', note: 'Bonus', price: 750000 },
    { type: 'expense', date: '2025-05-06', note: 'Jajan', price: 50000 },
    { type: 'expense', date: '2025-05-07', note: 'Langganan Spotify', price: 49000 },
    { type: 'income', date: '2025-05-08', note: 'Jual Barang Bekas', price: 300000 },
    { type: 'expense', date: '2025-05-09', note: 'Laundry', price: 70000 },
    { type: 'income', date: '2025-05-10', note: 'Reimburse Kantor', price: 200000 },
  ];

  const displayedData = showLimit ? data.slice(0, 3) : data;

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-[#6E1E0E] p-4 rounded-xl mb-2 mx-4"
      onPress={() => navigation.navigate('Edit', { item })}
    >
      <Text className="text-base font-semibold">{item.note}</Text>
      <Text className="text-sm text-gray-600">{item.date}</Text>
      <Text
        className={`text-base font-bold ${
          item.type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {formatRupiah(item.price)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={displayedData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
}
