import { Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const res = await axios.post('http://192.168.43.173:3000/api/login', {
      username,
      password,
    });

    if (res.data.user) {
      const [id, username, password, email] = res.data.user;
      const userObject = { id, username, email }; // password opsional disimpan

      await AsyncStorage.setItem('userData', JSON.stringify(userObject));
      Alert.alert("Berhasil", "Login sukses!");
      navigation.replace('MainTabs');
    }
  } catch (error) {
    console.error("Login Error:", error);
    Alert.alert("Login Gagal", error.response?.data?.message || "Cek koneksi atau data akun");
  }
};

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 justify-between'>
        <View className="pt-4 mx-3">
          <Text className="text-2xl font-pbold mb-4">Senang bertemu kembali!</Text>

          <Text className="text-xl font-pregular mb-1">Username</Text>
          <TextInput
            className="text-xl w-full border-none bg-gray-300 rounded-full py-3 px-4 mb-4"
            value={username}
            onChangeText={setUsername}
          />

          <Text className="text-xl font-pregular mb-1">Password</Text>
          <TextInput
            secureTextEntry
            className="text-xl w-full border-none bg-gray-300 rounded-full py-3 px-4"
            value={password}
            onChangeText={setPassword}
          />

          <Text className="text-xl text-red-500 font-pregular mb-1">Lupa Password?</Text>
        </View>

        <View className='mx-3'>
          <TouchableOpacity
            className='flex flex-row border-2 border-[#CD6D1A] rounded-full p-4 mb-4 justify-center items-center gap-2'
            onPress={() => Alert.alert('Belum tersedia', 'Google login belum diaktifkan')}>
            <Image
              source={require('../../assets/images/google.png')}
              className="w-6 h-6 mr-2"
            />
            <Text className='text-center text-[#CD6D1A] text-2xl font-pbold'>Sign-in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className='bg-[#CD6D1A] rounded-full p-4 mb-4'
            onPress={handleLogin}>
            <Text className='text-center text-white text-2xl font-pbold'>Masuk</Text>
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
  );
}
