import { Text, View, Image, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const toggleSwitch = () => setIsSmartTrackingEnabled(prev => !prev);

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
