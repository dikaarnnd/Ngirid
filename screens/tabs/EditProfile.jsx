import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import Header from 'components/Header';

const defaultAvatar = require('../../assets/icons/user.png'); 

export default function EditProfile() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    username: 'Darrell',
    email: 'darrell@gmail.com',
    photoUrl: null,
    limitExp: '7000000',
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
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <Header headerName="Edit Profil" />

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Profile Picture Section */}
          <View className="items-center mt-8 mb-6">
            <View className="w-32 h-32 justify-center items-center mb-4">
              <Image
                source={
                  userData.photoUrl
                    ? { uri: userData.photoUrl }
                    : defaultAvatar
                }
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity className="bg-gray-200 px-6 py-4 rounded-full"
            onPress={handleChangePhoto}>
              <Text className="text-black font-pregular">Ubah Foto</Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields Section */}
          <View className="mx-6 space-y-5">
            <View className="mb-5">
              <Text className="text-sm text-gray-600 mb-1 ml-1 font-psemibold">Nama</Text>
              <TextInput
                placeholder="Nama baru..."
                className="bg-gray-100 p-4 rounded-full text-black"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="mb-5">
              <Text className="text-sm text-gray-600 mb-1 ml-1 font-psemibold">Email</Text>
              <TextInput
                placeholder="Email baru..."
                className="bg-gray-100 p-4 rounded-full text-black"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
              />
            </View>

            <View className="mb-5">
              <Text className="text-sm text-gray-600 mb-1 ml-1 font-psemibold">Batas pengeluaran</Text>
              <TextInput
                placeholder="Masukkan batasan pengeluaran..."
                className="bg-gray-100 p-4 rounded-full text-black"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Spacer to push buttons to bottom, not strictly necessary with ScrollView but can help if content is short */}
          {/* <View className="flex-1" /> */}

        </ScrollView>
        {/* Buttons Section */}
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
              'Profil berhasil diperbarui',
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}