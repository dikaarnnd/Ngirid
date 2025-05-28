import { Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <TextInput
        placeholder="Email"
        className="w-full border border-gray-300 rounded-md p-2 mb-2"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      />
      <TouchableOpacity className="bg-blue-500 p-3 rounded-md w-full">
        <Text className="text-white text-center font-semibold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
