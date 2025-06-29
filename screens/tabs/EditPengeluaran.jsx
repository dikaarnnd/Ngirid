import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function EditPengeluaran() {
  const navigation = useNavigation();
  const route = useRoute();
  const maxNoteLength = 15;

  const { id, initialData } = route.params || {};

  const [userData, setUserData] = useState({
    type: 'expense',
    amount: initialData?.amount || '',
    note: initialData?.note || '',
    photoUrl: null,
    date: initialData?.date || new Date().toISOString().split('T')[0],
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
    if (!userData.amount || !userData.note) {
      const msg = !userData.amount && !userData.note
        ? 'Jumlah dan catatan harus diisi'
        : !userData.amount
        ? 'Jumlah pengeluaran harus diisi'
        : 'Catatan harus diisi';
      return Alert.alert('Data Belum Lengkap', msg);
    }

    const pengeluaranValue = parseInt(userData.amount);
    if (pengeluaranValue < 100) {
      return Alert.alert('Jumlah Tidak Valid', 'Minimal Rp 100');
    }

    try {
      const storedUser = await AsyncStorage.getItem('userData');
      if (!storedUser) return Alert.alert('Error', 'User belum login');

      const user = JSON.parse(storedUser);

      const payload = {
        user_id: user.id,
        type: 'expense',
        amount: pengeluaranValue,
        note: userData.note,
        date: userData.date,
      };

      await axios.put(`http://192.168.43.173:3000/api/transactions/${id}`, payload);

      Alert.alert('Berhasil', 'Pengeluaran berhasil diperbarui', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      console.error('❌ Gagal update:', err.message);
      Alert.alert('Gagal', 'Gagal menyimpan perubahan');
    }
  };


  const handleCancel = () => {
    Alert.alert('Batalkan?', 'Yakin buang semua perubahan?', [
      { text: 'Tidak', style: 'cancel' },
      {
        text: 'Ya',
        onPress: () => {
          setUserData({
            type: 'expense',
            amount: initialData?.amount || '',
            note: initialData?.note || '',
            photoUrl: null,
            date: initialData?.date || new Date().toISOString().split('T')[0],
          });
          navigation.goBack();
        },
      },
    ]);
  };

  const handleRemoveList = async () => {
    Alert.alert('Hapus?', 'Yakin ingin menghapus pengeluaran ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            const storedUser = await AsyncStorage.getItem('userData');
            if (!storedUser) return Alert.alert('Error', 'User belum login');

            await axios.delete(`http://192.168.43.173:3000/api/transactions/${id}`);
            Alert.alert('Berhasil', 'Data berhasil dihapus', [
              { text: 'OK', onPress: () => navigation.goBack() },
            ]);
          } catch (err) {
            console.error('❌ Gagal hapus:', err.message);
            Alert.alert('Gagal', 'Gagal menghapus data');
          }
        },
      },
    ]);
  };


  const handleRemovePhoto = () => {
    setUserData(prev => ({ ...prev, photoUrl: null }));
  };

  const handleChangePhoto = () => {
    Alert.alert('Pilih Foto', '', [
      {
        text: 'Kamera',
        onPress: async () => {
          const { granted } = await ImagePicker.requestCameraPermissionsAsync();
          if (!granted) return Alert.alert('Ditolak', 'Perlu akses kamera');

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
          if (!granted) return Alert.alert('Ditolak', 'Perlu akses galeri');

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
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex items-center p-4">
          <Text className="text-xl font-pbold text-black">Edit Pengeluaran</Text>
        </View>

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
                  <Text className="text-white text-xs mr-1">
                    {userData.note.length}/{maxNoteLength}
                  </Text>
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
                    <Image
                      source={require('../../assets/icons/camera.png')}
                      className="w-6 h-6 mr-2"
                    />
                    <Text>Ubah foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="px-3 justify-center items-center"
                    onPress={handleRemovePhoto}
                  >
                    <Image
                      source={require('../../assets/icons/trash.png')}
                      className="w-8 h-8"
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: userData.photoUrl }}
                  className="w-full h-3/5 rounded-xl"
                  resizeMode="cover"
                />
              </View>
            ) : (
              <TouchableOpacity
                className="flex-row mx-3 py-5 justify-center items-center border border-black border-dashed"
                onPress={handleChangePhoto}
              >
                <Image
                  source={require('../../assets/icons/camera.png')}
                  className="w-6 h-6 mr-2"
                />
                <Text>Tambahkan foto (Opsional)</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="mb-3 gap-2">
            <TouchableOpacity
              className="mx-3 py-3 rounded-full justify-center items-center bg-red-600"
              onPress={handleRemoveList}
            >
              <Text className="text-white font-psemibold">Hapus</Text>
            </TouchableOpacity>

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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
