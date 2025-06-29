import { Text } from 'react-native';
import { useEffect, useState,useCallback } from 'react';
import { useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G } from 'react-native-svg';

export default function Exp() {
  const [totalExp, setTotalExp] = useState(0);
  const limitExp = 7000000; // Bisa ubah atau ambil dari backend kalau mau

  useFocusEffect(
    useCallback(() => {
      const fetchExpenseTotal = async () => {
        try {
          const storedUser = await AsyncStorage.getItem('userData');
          if (!storedUser) return;
  
          const user = JSON.parse(storedUser);
          const response = await axios.get(`http://192.168.43.173:3000/api/transactions/${user.id}`);
          const transactions = response.data;
  
          const total = transactions.reduce((acc, curr) => {
            const amount = Number(curr.amount || curr.AMOUNT || 0);
            const type = (curr.type || curr.TYPE || '').toLowerCase();
            return type === 'expense' ? acc + amount : acc;
          }, 0);
  
          setTotalExp(total);
        } catch (error) {
          console.error('❌ Gagal ambil total pengeluaran:', error.message);
        }
      };
  
      fetchExpenseTotal();
    }, [])
  );

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(isNaN(number) ? 0 : number);

  const percentage = Math.min((totalExp / limitExp) * 100, 100);

  const width = 300;
  const height = 150;
  const strokeWidth = 40;
  const radius = (width - strokeWidth) / 2;

  return (
    <LinearGradient
      colors={['#0C3762', '#2477CA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ borderRadius: 16 }}
      className='flex-1 rounded-2xl justify-center items-center pb-4'
    >
      {/* Chart */}
      <Svg width={width} height={height - 25} viewBox={`0 0 ${width} ${height - 50}`}>
        <G rotation="-30" origin={`${width / 2}, ${width / 2}`}>
          {/* Background Arc */}
          <Path
            d={describeArc(width / 2, width / 2, radius, 0, 120)}
            stroke="#41A4FF"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          {/* Foreground Arc */}
          <Path
            d={describeArc(width / 2, width / 2, radius, 0, (percentage / 100) * 120)}
            stroke="#A7D1F5"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Text className="text-sm text-white font-pregular pt-1">Pengeluaranmu bulan ini sebesar</Text>
      <Text className="text-[40px] text-white text-center font-psemibold">
        {formatRupiah(totalExp)}
      </Text>
    </LinearGradient>
  );
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 120) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
