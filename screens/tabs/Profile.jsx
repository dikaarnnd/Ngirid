// ... import tetap sama
import { Text, View, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Header from 'components/Header';
import '../../global.css';

export default function Profile() {
  const navigation = useNavigation();
  const [isSmartTrackingEnabled, setIsSmartTrackingEnabled] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    photoUrl: null,
  });

  const activateSmartTracking = (mode = 2, amt = 1123, delay = 2000) => {
    console.log('✅ Smart Tracking Activated');

    setTimeout(() => {
      const amount = amt;
      const type = mode === 1 ? 'income' : 'expense';
      const label = mode === 1 ? 'pemasukan' : 'pengeluaran';

      console.log(`📡 Notifikasi terdeteksi: ${label} Rp${amount}`);

      Alert.alert(
        `${label.charAt(0).toUpperCase() + label.slice(1)} Terdeteksi`,
        `Kami mendeteksi ${label} sebesar Rp${amount}.\nTambahkan ke daftar ${label} Anda?`,
        [
          {
            text: 'Tidak',
            onPress: () => console.log(`❌ ${label} tidak ditambahkan`),
            style: 'cancel',
          },
          {
            text: 'Ya',
            onPress: async () => {
              try {
                const storedUser = await AsyncStorage.getItem('userData');
                if (!storedUser) return Alert.alert('Error', 'User belum login');

                const user = JSON.parse(storedUser);

                const payload = {
                  user_id: user.id,
                  type: type,
                  amount: amount,
                  note: `Deteksi otomatis`,
                  date: new Date().toISOString().split('T')[0],
                };

                const response = await axios.post(
                  `http://192.168.43.173:3000/api/transactions`,
                  payload
                );

                if (response.status === 201 || response.status === 200) {
                  console.log(`✅ ${label} berhasil ditambahkan`);
                  Alert.alert('Berhasil', `${label.charAt(0).toUpperCase() + label.slice(1)} otomatis telah ditambahkan`);
                } else {
                  console.error(`❌ Gagal menambahkan ${label}:`, response.data);
                  Alert.alert('Error', `Gagal menambahkan ${label}`);
                }
              } catch (err) {
                console.error(`❗ Error saat kirim ${label}:`, err.message);
                Alert.alert('Error', `Terjadi kesalahan saat menambahkan ${label}`);
              }
            },
          },
        ]
      );
    }, delay); // 10 detik delay
  };

  const toggleSwitch = () => {
    setIsSmartTrackingEnabled((prev) => {
      const newValue = !prev;
      if (newValue) {
        // Ubah ini ke 1 untuk income, 2 untuk expense
        activateSmartTracking(); // atau activateSmartTracking(1);
      }
      return newValue;
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData(user);
        }
      } catch (error) {
        console.error('❌ Gagal ambil user dari storage:', error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-white'>
        <Header headerName="Profil" />

        <View className='items-center mt-8 mb-6'>
          <View className='w-28 h-28 justify-center items-center mb-4'>
            <Image
              source={
                userData.photoUrl
                  ? { uri: userData.photoUrl }
                  : require('../../assets/icons/user.png')
              }
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>
          <Text className='text-black text-lg font-psemibold'>{userData.username}</Text>
          <Text className='text-black italic text-sm'>{userData.email}</Text>
        </View>

        <View className='mx-6 space-y-1'>
          <View className='flex-row justify-between items-center py-4 border-b border-gray-400'>
            <Text className='text-black text-base font-pregular'>Mode Smart Tracking</Text>
            <Switch
              trackColor={{ false: "#cc0000", true: "#4dff00" }}
              thumbColor={isSmartTrackingEnabled ? "#ffffff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isSmartTrackingEnabled}
            />
          </View>

          <View className='border-b border-gray-400'>
            <TouchableOpacity
              className='flex-row justify-between items-center py-4'
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text className='text-black text-base font-pregular'>Edit Profil</Text>
              <Image
                source={require('../../assets/images/right_arrow.png')}
                className="w-4 h-4"
                style={{ tintColor: 'rgb(107, 114, 128)' }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className='flex-1' />

        <View className='mx-6 mb-6 mt-4'>
          <TouchableOpacity
            className='bg-red-600 py-3 rounded-full items-center'
            onPress={() => navigation.navigate("AuthChoice")}
          >
            <Text className='text-white text-base font-psemibold'>Sign out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
