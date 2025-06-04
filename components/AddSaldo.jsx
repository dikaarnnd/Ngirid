import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function AddSaldo() {
  const navigation = useNavigation();
  const maxNoteLength = 15;
  const [userData, setUserData] = useState({
    type: 'income',
    amount: '',
    note: '',
    photoUrl: null,
    date: new Date().toISOString().split('T')[0],
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

  const handleSaldoChange = (text) => {
    const cleanValue = text.replace(/\D/g, '');
    console.log('Input saldo berubah:', cleanValue);
    setUserData({...userData, amount: cleanValue});
  };

  const handleSave = async () => {
    if (!userData.amount || !userData.note) {
      let errorMessage = '';
      if (!userData.amount && !userData.note) {
        errorMessage = 'Jumlah saldo dan catatan harus diisi';
      } else if (!userData.amount) {
        errorMessage = 'Jumlah saldo harus diisi';
      } else {
        errorMessage = 'Catatan harus diisi';
      }

      Alert.alert('Data Belum Lengkap', errorMessage, [{ text: 'OK' }]);
      return;
    }

    const saldoValue = parseInt(userData.amount);
    if (saldoValue < 100) {
      Alert.alert(
        'Jumlah Tidak Valid',
        'Jumlah saldo harus lebih dari Rp 100',
        [{ text: 'OK' }]
      );
      return;
    }
    console.log('Data yang akan disimpan:', {
      ...userData,
      amount: saldoValue
    });
    Alert.alert(
      'Yeayy!!',
      'Saldo berhasil ditambahkan',
      [{ text: 'OK',
        onPress: () => {
          navigation.goBack();
          setUserData({
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
      'Yakin ingin membatalkan dan menghapus data yang telah diisi?',
      [
        { text: 'Tidak', style: 'cancel' },
        {
          text: 'Ya',
          onPress: () => {
            setUserData({
              amount: '',
              note: '',
              photoUrl: null,
              date: null,
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
    <View className='flex-1'>
      <View className='flex-1 justify-between'>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View className='px-3 py-5 mb-4 mx-3 rounded-2xl bg-[#188D35] gap-4'>
            <View>
              <Text className="text[15px] text-white mb-1 ml-1 font-psemibold">Berapa pemasukan Anda?</Text>
              <TextInput
                placeholder='Rp'
                className="bg-gray-200 p-4 rounded-xl font-pregular text-[15px]"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={formatRupiah(userData.amount)}
                onChangeText={handleSaldoChange}
              />
            </View>
            <View>
              <View className='flex-row justify-between items-center'>
                <Text className="text[15px] text-white mb-1 ml-1 font-psemibold">Tambahkan catatan</Text>
                <Text className="text-white text-xs text-right mr-1 ">
                  {userData.note.length}/{maxNoteLength}
                </Text>
              </View>
              <TextInput
              placeholder='Gajian bulan ini'
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
                    source={require('../assets/icons/camera.png')}
                    className="w-6 h-6 mr-2"
                  />
                  <Text>Ubah foto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-3 justify-center items-center"
                  onPress={handleRemovePhoto}
                >
                  <Image
                    source={require('../assets/icons/trash.png')} // Pastikan ada ikon trash di assets
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
                source={require('../assets/icons/camera.png')}
                className="w-6 h-6 mr-2"
              />
              <Text>Tambahkan foto (Opsional)</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <View className='mb-3 mt-3'>
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
    </View>
  )
}