import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import '../../global.css';

export default function Signup() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 justify-between'>
        <View className="pt-4 mx-3">
          <Text className="text-2xl font-pbold mb-4">Selamat Datang di Ngirid!</Text>
          <Text className="text-xl font-pregular mb-1">Username</Text>
          <TextInput
            className="text-xl w-full border-none bg-gray-300 rounded-full py-3 px-4 mb-4"
          />
          <Text className="text-xl font-pregular mb-1">Email</Text>
          <TextInput
            // placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            className="text-xl w-full border-none bg-gray-300 rounded-full py-3 px-4 mb-4"
          />
          <Text className="text-xl font-pregular mb-1">Password</Text>
          <TextInput
            // placeholder="Password"
            secureTextEntry
            className="text-xl w-full border-none bg-gray-300 rounded-full py-3 px-4 mb-4"
          />
          <Text className="text-xl font-pregular mb-1">Confirm Password</Text>
          <TextInput
            // placeholder="Password"
            secureTextEntry
            className="text-xl w-full border-none bg-gray-300 rounded-full py-3 px-4 mb-4"
          />
        </View>

        <View  className='mx-3'>
          <TouchableOpacity className='flex flex-row border-2 border-[#CD6D1A] rounded-full p-4 mb-4 justify-center items-center gap-2'
            onPress={() => navigation.navigate('Signup')}>
            <Image
              source={require('../../assets/images/google.png')}
              className="w-6 h-6 mr-2"
            />
            <Text className='text-center text-[#CD6D1A] text-2xl font-pbold'>Sign-up with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-[#CD6D1A] rounded-full p-4 mb-4'
            onPress={() => navigation.replace('MainTabs')}>
            <Text className='text-center text-white text-2xl font-pbold'>Daftar</Text>
          </TouchableOpacity>
          <TouchableOpacity className='border-4 border-[#CD6D1A] rounded-full p-4 mb-4'
            onPress={() => navigation.navigate('Signin')}>
            <Text className='text-center text-[#CD6D1A] text-2xl font-pbold'>Sudah Punya Akun?</Text>
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
  );
}
