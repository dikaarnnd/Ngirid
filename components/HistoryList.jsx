import { Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HistoryList({ showLimit = false }) {
  const navigation = useNavigation();

  const data = [
    { id: 1, type: 'income', date: '2025-05-01', note: 'Gaji Bulanan', amount: 5000000, photoUrl: null, },
    { id: 2, type: 'expense', date: '2025-05-02', note: 'Belanja Harian', amount: 200000, photoUrl: null, },
    { id: 3, type: 'income', date: '2025-05-03', note: 'Freelance Project', amount: 1500000, photoUrl: null, },
    { id: 4, type: 'expense', date: '2025-05-04', note: 'Transportasi', amount: 100000, photoUrl: null, },
    { id: 5, type: 'income', date: '2025-05-05', note: 'Bonus', amount: 750000, photoUrl: null, },
    { id: 6, type: 'expense', date: '2025-05-06', note: 'Jajan', amount: 50000, photoUrl: null, },
    { id: 7, type: 'expense', date: '2025-05-07', note: 'Langganan Spotify', amount: 49000, photoUrl: null, },
    { id: 8, type: 'income', date: '2025-05-08', note: 'Jual Barang Bekas', amount: 300000, photoUrl: null, },
    { id: 9, type: 'expense', date: '2025-05-09', note: 'Laundry', amount: 70000, photoUrl: null, },
    { id: 10, type: 'income', date: '2025-05-10', note: 'Reimburse Kantor', amount: 200000, photoUrl: null, },
    { id: 11, type: 'income', date: '2025-05-11', note: 'Gaji Bulanan', amount: 5000000, photoUrl: null, },
    { id: 12, type: 'expense', date: '2025-05-12', note: 'Belanja Harian', amount: 200000, photoUrl: null, },
    { id: 13, type: 'income', date: '2025-05-13', note: 'Freelance Project', amount: 1500000, photoUrl: null, },
    { id: 14, type: 'expense', date: '2025-05-14', note: 'Transportasi', amount: 100000, photoUrl: null, },
    { id: 15, type: 'income', date: '2025-05-15', note: 'Bonus', amount: 750000, photoUrl: null, },
    { id: 16, type: 'expense', date: '2025-05-16', note: 'Jajan', amount: 50000, photoUrl: null, },
    { id: 17, type: 'expense', date: '2025-05-17', note: 'Langganan Spotify', amount: 49000, photoUrl: null, },
    { id: 18, type: 'income', date: '2025-05-18', note: 'Jual Barang Bekas', amount: 300000, photoUrl: null, },
    { id: 19, type: 'expense', date: '2025-05-19', note: 'Laundry', amount: 70000, photoUrl: null, },
    { id: 20, type: 'income', date: '2025-05-20', note: 'Reimburse Kantor', amount: 200000, photoUrl: null, },
  ];

  
  const sortedData = [...data].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  const displayedData = showLimit ? sortedData.slice(0, 3) : sortedData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // tambahkan leading zero
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}/${month}/${day}`;
  };

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row justify-between bg-[#6E1E0E] p-4 rounded-3xl mb-2 mx-4"
      onPress={() => {
        // Navigasi ke screen yang berbeda berdasarkan tipe
        if (item.type === 'income') {
          navigation.navigate('EditSaldo', { 
            id: item.id,
            type: item.type,
            initialData: {
              amount: item.amount.toString(),
              note: item.note,
              date: item.date,
            }
          });
        } else if (item.type === 'expense') {
          navigation.navigate('EditPengeluaran', { 
            id: item.id,
            type: item.type,
            initialData: {
              amount: item.amount.toString(),
              note: item.note,
              date: item.date,
            }
          });
        }
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
        {/* {item.amount} */}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={displayedData}
      keyExtractor={(item) => `${item.note}-${item.date}`}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}
