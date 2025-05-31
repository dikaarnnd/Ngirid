import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const backArrowIcon = require('../../assets/images/back_arrow.png'); 
const defaultAvatar = require('../../assets/icons/user.png'); 

export default function EditProfile() {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center p-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backArrowIcon} className="w-8 h-8" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-xl font-pbold text-black mr-8">Edit Profil</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Profile Picture Section */}
          <View className="items-center mt-8 mb-6">
            <View className="w-32 h-32 rounded-full justify-center items-center mb-4">
              <Image
                source={defaultAvatar}
                className="w-32 h-32 rounded-full"
              />
            </View>
            <TouchableOpacity className="bg-gray-200 px-6 py-4 rounded-full">
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
                placeholderTextColor="#9CA3AF" // gray-400
              />
            </View>

            <View className="mb-5">
              <Text className="text-sm text-gray-600 mb-1 ml-1 font-psemibold">Email</Text>
              <TextInput
                placeholder="Email baru..."
                className="bg-gray-100 p-4 rounded-full text-black"
                placeholderTextColor="#9CA3AF" // gray-400
                keyboardType="email-address"
              />
            </View>

            <View className="mb-5">
              <Text className="text-sm text-gray-600 mb-1 ml-1 font-psemibold">Batas pengeluaran</Text>
              <TextInput
                placeholder="Masukkan batasan pengeluaran..."
                className="bg-gray-100 p-4 rounded-full text-black"
                placeholderTextColor="#9CA3AF" // gray-400
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
            onPress={() => navigation.goBack()} // Atau logika batal lainnya
            >
            <Text className="text-xl text-[#CD6D1A] font-psemibold">Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity
            className="bg-[#CD6D1A] rounded-full py-4 px-14"
            onPress={() => { alert('Simpan ditekan!'); }}
            >
            <Text className="text-xl text-white font-psemibold">Simpan</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}