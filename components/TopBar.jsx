import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopBar = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    photoUrl: null,
  });

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'Selamat Pagi';
    if (hour >= 11 && hour < 15) return 'Selamat Siang';
    if (hour >= 15 && hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <View className="flex flex-row justify-between items-center">
      <View className='flex-1'>
        <Text className="font-pbold text-xl">
          {`${getGreeting()}, ${userData.username}`}
        </Text>
        <Text className="font-pregular">Catatlah pengeluaranmu setiap hari!</Text>
      </View>
      
      <TouchableOpacity className="w-12 h-12 overflow-hidden"
        onPress={() => navigation.navigate('Profile')}
      >
        <Image
          source={
            userData.photoUrl
              ? { uri: userData.photoUrl }
              : require('../assets/icons/user.png')
          }
          className="w-full h-full rounded-full"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
