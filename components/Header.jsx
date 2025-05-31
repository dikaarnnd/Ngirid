import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const backArrowIcon = require('../assets/images/back_arrow.png');

export default function Header({ headerName}) {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center p-4">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backArrowIcon} className="w-8 h-8" />
      </TouchableOpacity>
      <Text className="flex-1 text-center text-xl font-pbold text-black mr-8">{headerName}</Text>
    </View>
  )
}