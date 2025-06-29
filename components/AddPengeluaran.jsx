import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function AddPengeluaran() {
  const navigation = useNavigation();
  const maxNoteLength = 15;

  const [userData, setUserData] = useState({
    type: 'expense',
    amount: '',
    note: '',
    photoUrl: null,
    date: new Date().toISOString().split('T')[0],
  });

  const formatRupiah = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      ? 'Rp ' + cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      : '';
  };

  const handlePengeluaranChange = (text) => {
    const cleanValue = text.replace(/\D/g, '');
    setUserData({ ...userData, amount: cleanValue });
  };

  const handleSave = async () => {
    const { amount, note, date } = userData;

    if (!amount || !note) {
      const errorMessage = !amount && !note
        ? 'Jumlah pengeluaran dan catatan harus diisi'
        : !amount
        ? 'Jumlah pengeluaran harus diisi'
        : 'Catatan harus diisi';
      return Alert.alert('Data Belum Lengkap', errorMessage);
    }

    const expenseValue = parseInt(amount);
    if (expenseValue < 100) {
      return Alert.alert('Jumlah Tidak Valid', 'Jumlah pengeluaran harus lebih dari Rp 100');
    }

    try {
      const storedUser = await AsyncStorage.getItem('userData');
      if (!storedUser) return Alert.alert('Error', 'User belum login');

      const user = JSON.parse(storedUser);

      const payload = {
        user_id: user.id,
        type: 'expense',
        amount: expenseValue,
        note,
        date,
      };

      const res = await axios.post('http://192.168.43.173:3000/api/transactions', payload);
      console.log('✅ Pengeluaran berhasil:', res.data);

      Alert.alert('Berhasil', 'Pengeluaran berhasil dicatat', [
        {
          text: 'OK',
          onPress: () => {
            setUserData({
              type: 'expense',
              amount: '',
              note: '',
              photoUrl: null,
              date: new Date().toISOString().split('T')[0],
            });
            navigation.goBack();
          },
        },
      ]);
    } catch (err) {
      console.error('❌ Gagal simpan:', err.message);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan data');
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Batalkan?',
      'Yakin ingin membatalkan dan menghapus data yang telah diisi?',
      [
        { text: 'Tidak', style: 'cancel' },
        {
          text: 'Ya',
          onPress: () => {
            setUserData({
              type: 'expense',
              amount: '',
              note: '',
              photoUrl: null,
              date: new Date().toISOString().split('T')[0],
            });
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleRemovePhoto = () => {
    setUserData(prev => ({ ...prev, photoUrl: null }));
  };

  const handleChangePhoto = () => {
    Alert.alert('Pilih Sumber Foto', '', [
      {
        text: 'Kamera',
        onPress: async () => {
          const { granted } = await ImagePicker.requestCameraPermissionsAsync();
          if (!granted) return Alert.alert('Izin Ditolak', 'Kamera dibutuhkan');

          const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
          if (!result.canceled) {
            setUserData((prev) => ({ ...prev, photoUrl: result.assets[0].uri }));
          }
        },
      },
      {
        text: 'Galeri',
        onPress: async () => {
          const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!granted) return Alert.alert('Izin Ditolak', 'Galeri dibutuhkan');

          const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
          if (!result.canceled) {
            setUserData((prev) => ({ ...prev, photoUrl: result.assets[0].uri }));
          }
        },
      },
      { text: 'Batal', style: 'cancel' },
    ]);
  };

  return (
    <View className="flex-1 justify-between">
      <View className="flex-1">
        <View className="px-3 py-5 my-4 mx-3 rounded-2xl bg-[#2477CA] gap-4">
          <View>
            <Text className="text-[15px] text-white mb-1 ml-1 font-psemibold">Berapa pengeluaran Anda?</Text>
            <TextInput
              placeholder="Rp"
              className="bg-gray-200 p-4 rounded-xl font-pregular text-[15px]"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={formatRupiah(userData.amount)}
              onChangeText={handlePengeluaranChange}
            />
          </View>

          <View>
            <View className="flex-row justify-between items-center">
              <Text className="text-[15px] text-white mb-1 ml-1 font-psemibold">Digunakan untuk apa?</Text>
              <Text className="text-white text-xs mr-1">{userData.note.length}/{maxNoteLength}</Text>
            </View>
            <TextInput
              placeholder="Beli jajan"
              className="bg-gray-200 p-4 rounded-xl font-pregular text-[15px]"
              placeholderTextColor="#9CA3AF"
              value={userData.note}
              onChangeText={(text) => setUserData({ ...userData, note: text })}
              maxLength={maxNoteLength}
            />
          </View>
        </View>

        {userData.photoUrl ? (
          <View className="mx-3 gap-2">
            <View className="flex-row w-full gap-2">
              <TouchableOpacity
                className="flex-1 flex-row py-5 justify-center items-center border border-black border-dashed"
                onPress={handleChangePhoto}
              >
                <Image source={require('../assets/icons/camera.png')} className="w-6 h-6 mr-2" />
                <Text>Ubah foto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-3 justify-center items-center"
                onPress={handleRemovePhoto}
              >
                <Image source={require('../assets/icons/trash.png')} className="w-8 h-8" />
              </TouchableOpacity>
            </View>
            <Image source={{ uri: userData.photoUrl }} className="w-full h-3/5 rounded-xl" resizeMode="cover" />
          </View>
        ) : (
          <TouchableOpacity
            className="flex-row mx-3 py-5 justify-center items-center border border-black border-dashed"
            onPress={handleChangePhoto}
          >
            <Image source={require('../assets/icons/camera.png')} className="w-6 h-6 mr-2" />
            <Text>Tambahkan foto (Opsional)</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="mb-3">
        <View className="flex-row justify-around items-center">
          <TouchableOpacity
            className="border-2 border-[#CD6D1A] rounded-full py-4 px-14"
            onPress={handleCancel}
          >
            <Text className="text-xl text-[#CD6D1A] font-psemibold">Batal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#CD6D1A] rounded-full py-4 px-14"
            onPress={handleSave}
          >
            <Text className="text-xl text-white font-psemibold">Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
