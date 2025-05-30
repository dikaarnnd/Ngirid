import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


// Components
import HistoryList from '../../components/HistoryList';

export default function History() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
        <SafeAreaView className='flex-1'>
            <View className="flex-1 bg-gray-100 pt-6">
                <Text className="text-xl font-bold text-center mb-4">Riwayat Lengkap</Text>
                <HistoryList />
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}