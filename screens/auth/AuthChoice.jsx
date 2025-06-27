import { Text, View, Image, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import '../../global.css';

export default function AuthChoice() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <View className='h-2/3 bg-[#CD6D1A] mx-3 mb-4 rounded-3xl overflow-hidden shadow-lg'>
          <View className='h-5/6'>
            <View className='absolute top-0 left-0 w-full flex flex-row justify-between items-center pt-3 px-4 z-10'>
              <Text className='text-2xl font-pbold text-left text-white'>ngirid</Text>
              <TouchableOpacity className='flex flex-row bg-gray-700 rounded-full py-1 pr-2 pl-3 border border-white gap-1'
                onPress={() => navigation.navigate('AuthChoice')}>
                <Image
                  source={require('../../assets/images/translate.png')}
                  className="w-3 h-3"
                  // resizeMode="contain"
                />
                <Text className='text-center text-white text-xs font-pregular'>Bahasa Indonesia</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../assets/images/onboarding.png')}
              className="w-full h-full"
              // resizeMode="contain"
            />
          </View>
          <View>
            <Text className='text-sm font-pbold text-center text-[#542904] px-3 py-4'>"Ngopi boleh, tapi jangan lupa ngirid. Yang penting seimbang!"</Text>
          </View>
        </View>

        <View className='mx-3'>
          <TouchableOpacity className='bg-[#CD6D1A] rounded-full p-4 mb-4'
            onPress={() => navigation.navigate('Signin')}>
            <Text className='text-center text-white text-2xl font-pbold'>Sudah Punya Akun?</Text>
          </TouchableOpacity>
          <TouchableOpacity className='border-4 border-[#CD6D1A] rounded-full p-4 mb-4'
            onPress={() => navigation.navigate('Signup')}>
            <Text className='text-center text-[#CD6D1A] text-2xl font-pbold'>Belum Punya Akun?</Text>
          </TouchableOpacity>
          <View className='gap-3 mt-4'>
            <Text className='text-[10px] text-center font-plight'>
              Saya menyetujui <Text className='text-[#CD6D1A] underline'>Ketentuan Layanan</Text> & <Text className='text-[#CD6D1A] underline'>Kebijakan Privasi</Text> Ngirid.
            </Text>
            <Text className='text-sm text-center font-pbold'>By Orid</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}