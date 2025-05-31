import { View, Text } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Components
import TopBar from '../../components/TopBar';
import HistoryList from '../../components/HistoryList';

export default function History() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 gap-3 px-3 mb-3 bg-white'>
        {/* TopBar */}
        <View className='flex flex-row items-center'>
          <TopBar />
        </View>

        {/* History */}
        <View className="flex-1 bg-[#8D2B18] rounded-2xl">
          <Text className="text-sm text-white font-pregular pl-4 mt-6 mb-4">Laporan Keuangan</Text>
          <View className='flex-1'>
            <HistoryList />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}