import { Text, View, Image, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import '../../global.css';

export default function AuthChoice() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <View className='h-2/3 bg-[#CD6D1A] mx-4 mb-4 rounded-3xl overflow-hidden'>
          <View className='h-5/6'>
            <Image
              source={require('../../assets/images/onboarding.png')}
              className="w-full h-full"
              // resizeMode="contain"
            />
          </View>
          <View className='shadow-2xl'>
            <Text className='text-base font-bold text-center text-[#542904] px-3 py-4'>"Ngopi boleh, tapi jangan lupa ngirid. Yang penting seimbang!"</Text>
          </View>
        </View>

        <View className='mb-4'>
          <TouchableOpacity className='bg-[#CD6D1A] rounded-full p-4 mx-4 mb-4'>
            <Text className='text-center text-white text-2xl font-bold'>Sudah Punya Akun?</Text>
          </TouchableOpacity>
          <TouchableOpacity className='border-2 border-[#CD6D1A] rounded-full p-4 mx-4 mb-4'>
            <Text className='text-center text-[#CD6D1A] text-2xl font-bold'>Belum Punya Akun?</Text>
          </TouchableOpacity>
        </View>
        <View className='gap-3'>
          <Text className='text-xs text-center'>
            Saya menyetujui <Text className='text-[#CD6D1A] underline'>Ketentuan Layanan</Text> & <Text className='text-[#CD6D1A] underline'>Kebijakan Privasi</Text> Ngirid.
          </Text>
          <Text className='text-sm text-center font-bold'>By Orid</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}