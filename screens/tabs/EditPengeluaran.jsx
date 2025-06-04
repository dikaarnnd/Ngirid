import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, Modal } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function AddSaldo() {
  const navigation = useNavigation();
  const maxNoteLength = 15;

  const route = useRoute();
  const { initialData } = route.params || {};
  const [userData, setUserData] = useState({
    type: 'expense',
    amount: initialData?.amount || '',
    note: initialData?.note || '',
    photoUrl: null,
    date: initialData?.date || new Date().toISOString().split('T')[0],
  });

  const [isImageViewerVisible, setImageViewerVisible] = useState(false);

  const openImageViewer = () => {
    if (userData.photoUrl) {
      setImageViewerVisible(true);
    }
  };

  const closeImageViewer = () => {
    setImageViewerVisible(false);
  };

  const formatRupiah = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue) {
      return 'Rp ' + cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return '';
  };

  const handlePengeluaranChange = (text) => {
    const cleanValue = text.replace(/\D/g, '');
    console.log('Input pengeluaran berubah:', cleanValue);
    setUserData({...userData, addSaldo: cleanValue});
  };

  const handleSave = async () => {
    if (!userData.amount || !userData.note) {
      let errorMessage = '';
      if (!userData.amount && !userData.note) {
        errorMessage = 'Jumlah pengeluaran dan catatan harus diisi';
      } else if (!userData.amount) {
        errorMessage = 'Jumlah pengeluaran harus diisi';
      } else {
        errorMessage = 'Catatan harus diisi';
      }

      Alert.alert('Data Belum Lengkap', errorMessage, [{ text: 'OK' }]);
      return;
    }

    const pengeluaranValue = parseInt(userData.addSaldo);
    if (pengeluaranValue < 100) {
      Alert.alert(
        'Jumlah Tidak Valid',
        'Jumlah pengeluaran minimal Rp 100',
        [{ text: 'OK' }]
      );
      return;
    }
    console.log('Data yang akan disimpan:', {
      ...userData,
      addSaldo: pengeluaranValue
    });
    Alert.alert(
      'Yeayy!!',
      'Pengeluaran berhasil diperbarui',
      [{ text: 'OK',
        onPress: () => {
          navigation.goBack();
          setUserData({
            type: 'expense',
            amount: '',
            note: '',
            photoUrl: null,
            date: new Date().toISOString().split('T')[0],
          });
        },
       }]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Konfirmasi',
      'Yakin ingin membatalkan dan membuang semua perubahan?',
      [
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
      ]
    );
  };

  const handleRemovePhoto = () => {
    setUserData(prev => ({ ...prev, photoUrl: null }));
  };

  const handleRemoveList = () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah kamu yakin ingin menghapus data ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            // Tambahkan logika penghapusan dari storage/database di sini jika ada
            console.log('Data dihapus:', userData);

            // Reset data atau kembali ke halaman sebelumnya
            Alert.alert('Dihapus!', 'Data berhasil dihapus', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      ]
    );
  };

  const handleChangePhoto = () => {
    Alert.alert('Pilih Sumber Foto', 'Silakan pilih dari kamera atau galeri', [
      {
        text: 'Kamera',
        onPress: async () => {
          const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
          if (!permissionResult.granted) {
            Alert.alert('Izin Ditolak', 'Aplikasi memerlukan akses ke kamera');
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
          });

          if (!result.canceled && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setUserData((prev) => ({ ...prev, photoUrl: selectedImage.uri }));
          }
        },
      },
      {
        text: 'Galeri',
        onPress: handlePickPhoto,
      },
      {
        text: 'Batal',
        style: 'cancel',
      },
    ]);
  };

  const handlePickPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Izin Ditolak', 'Aplikasi memerlukan akses ke galeri');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setUserData((prev) => ({ ...prev, photoUrl: selectedImage.uri }));
    }
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-white'>
        <View className="flex items-center p-4">
          <Text className="text-center text-xl font-pbold text-black">Edit Pengeluaran</Text>
        </View>
        <View className='flex-1 justify-between'>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View className='px-3 py-5 my-4 mx-3 rounded-2xl bg-[#2477CA] gap-4'>
              <View>
                <Text className="text[15px] text-white mb-1 ml-1 font-psemibold">Berapa pengeluaran Anda?</Text>
                <TextInput
                  placeholder='Rp'
                  className="bg-gray-200 p-4 rounded-xl font-pregular text-[15px]"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={formatRupiah(userData.amount)}
                  onChangeText={handlePengeluaranChange}
                />
              </View>
              <View>
                <View className='flex-row justify-between items-center'>
                  <Text className="text[15px] text-white mb-1 ml-1 font-psemibold">Digunakan untuk apa?</Text>
                  <Text className="text-white text-xs text-right mr-1 ">
                    {userData.note.length}/{maxNoteLength}
                  </Text>
                </View>
                <TextInput
                placeholder='Beli jajan'
                  className="bg-gray-200 p-4 rounded-xl font-pregular text-[15px]"
                  placeholderTextColor="#9CA3AF"
                  value={userData.note}
                  onChangeText={(text) => setUserData({...userData, note: text})}
                  maxLength={maxNoteLength}
                />
              </View>
            </View>
            {userData.photoUrl ? (
              <View className="mx-3 gap-2 ">
                <View className='flex-row w-full gap-2'>
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
                <TouchableOpacity onPress={openImageViewer}>
                  <Image
                    source={{ uri: userData.photoUrl }}
                    className="w-full h-64 rounded-xl"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
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
          </ScrollView>

          <View className='mb-3 gap-2 mt-3'>
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
              onPress={ handleSave }
              >
                <Text className="text-xl text-white font-psemibold">Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {userData.photoUrl && (
          <Modal
            visible={isImageViewerVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeImageViewer} // Untuk tombol back Android
          >
            <View className="flex-1 justify-center items-center bg-black/90">
              <Image
                source={{ uri: userData.photoUrl }}
                className="w-full h-full"
                resizeMode="contain"
              />
              <TouchableOpacity
                className="absolute ios:top-[60px] android:top-[30px] right-[20px] bg-white/20 px-[15px] py-2 rounded-[20px]"
                onPress={closeImageViewer}
              >
                <Text className="text-white text-base font-bold">Tutup</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}