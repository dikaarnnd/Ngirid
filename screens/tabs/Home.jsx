import { View, Text, } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Components
import TopBar from '../../components/TopBar';
import Saldo from '../../components/Saldo';
import Exp from '../../components/Exp';
import HistoryList from '../../components/HistoryList';

export default function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 justify-between gap-3 mx-3 mb-3'>
        {/* TopBar */}
          <View className='flex flex-row items-center'>
            <TopBar />
          </View>
        <View className='flex-1 justify-between gap-3'>
          {/* Saldo */}
          <Saldo />

          {/* Pengeluaran */}
          <Exp />

          {/* History */}
          <View className="bg-[#8D2B18] rounded-2xl pt-6 pb-2">
            <Text className="text-sm text-white font-pregular pl-4 mb-3">Laporan Keuangan</Text>
            <View>
              <HistoryList showLimit={true} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold text p-4 rounded-lg`,
};