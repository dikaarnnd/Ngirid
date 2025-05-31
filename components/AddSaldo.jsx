import { View, Text, TouchableOpacity, Image, TextInput, Alert, } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function AddSaldo() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    addSaldo: '',
    note: '',
    photoUrl: null,
    date: new Date().toLocaleDateString(),
  });

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
    <View className='flex-1 justify-between'>
      <View className='flex-1'>
        <View className='px-3 py-5 my-4 mx-3 rounded-2xl bg-[#188D35] gap-4'>
          <View>
            <Text className="text[15px] text-white mb-1 ml-1 font-psemibold">Berapa pemasukan Anda?</Text>
            <TextInput
              placeholder='Rp'
              className="bg-gray-200 p-4 rounded-xl font-pregular text-[15px]"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text className="text[15px] text-white mb-1 ml-1 font-psemibold">Tambahkan catatan</Text>
            <TextInput
            placeholder='Gajian bulan ini'
              className="bg-gray-200 p-4 rounded-xl font-pregular text-[15px]"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
        {userData.photoUrl ? (
          <View className="mx-3 gap-2 ">
            <TouchableOpacity
              className="flex-row mx-3 py-5 justify-center items-center border border-black border-dashed rounded-xl"
              onPress={handleChangePhoto}
            >
              <Image
                source={require('../assets/icons/camera.png')}
                className="w-6 h-6 mr-2"
              />
              <Text>Ubah foto</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: userData.photoUrl }}
              className="w-full h-3/5 rounded-xl"
              resizeMode="cover"
            />
          </View>
        ) : (
          <TouchableOpacity
            className="flex-row mx-3 py-5 justify-center items-center border border-black border-dashed rounded-xl"
            onPress={handleChangePhoto}
          >
            <Image
              source={require('../assets/icons/camera.png')}
              className="w-6 h-6 mr-2"
            />
            <Text>Tambahkan foto (Opsional)</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className='mb-3'>
        <View className="flex-row justify-around items-center">
          <TouchableOpacity
          className="border-2 border-[#CD6D1A] rounded-full py-4 px-14"
          onPress={() => navigation.goBack()}
          >
            <Text className="text-xl text-[#CD6D1A] font-psemibold">Batal</Text>
          </TouchableOpacity>

          <TouchableOpacity
          className="bg-[#CD6D1A] rounded-full py-4 px-14"
          onPress={() => { 
            Alert.alert(
              'Yeayy!!',
              'Saldo berhasil ditambahkan',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
            }}
          >
            <Text className="text-xl text-white font-psemibold">Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}