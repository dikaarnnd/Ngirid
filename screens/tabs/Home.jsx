import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <View className={styles.container}>
          <Text className={styles.title}>Home</Text>
          <TouchableOpacity className='bg-[#CD6D1A] rounded-full p-4 mb-4'
            onPress={() => navigation.navigate('History')}>
            <Text className='text-center text-white text-2xl font-pbold'>History</Text>
          </TouchableOpacity>
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