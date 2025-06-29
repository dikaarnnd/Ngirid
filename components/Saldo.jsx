import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function Saldo() {
  const [saldo, setSaldo] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchAndCalculateSaldo = async () => {
        try {
          const storedUser = await AsyncStorage.getItem('userData');
          if (!storedUser) return;
  
          const user = JSON.parse(storedUser);
  
          const response = await axios.get(`http://192.168.43.173:3000/api/transactions/${user.id}`);
          const transactions = response.data;
  
          let total = 0;
          for (let item of transactions) {
            const amount = Number(item.amount || item.AMOUNT || 0);
            const type = item.type || item.TYPE;
  
            if (type === 'income') total += amount;
            else if (type === 'expense') total -= amount;
          }
  
          setSaldo(total);
        } catch (error) {
          console.error('❌ Gagal hitung saldo:', error.message);
        }
      };
  
      fetchAndCalculateSaldo();
    }, [])
  );

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(isNaN(number) ? 0 : number);

  return (
    <View className="flex bg-[#188D35] rounded-2xl py-6 overflow-hidden">
      <Image
        source={require('../assets/images/onboarding.png')}
        className="absolute w-64 h-64 -z-10 opacity-10 rotate-45"
        style={{
          top: -40,
          right: -40,
        }}
      />
      <Text className="text-sm text-white font-pregular pl-4">Saldo</Text>
      <Text className="text-[40px] text-white text-center font-psemibold">
        {formatRupiah(saldo)}
      </Text>
    </View>
  );
}
