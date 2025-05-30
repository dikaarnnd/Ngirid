import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dummy data
const user = {
  username: 'Darrell',
};

const TopBar = () => {
    const navigation = useNavigation();
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'Selamat Pagi';
    if (hour >= 11 && hour < 15) return 'Selamat Siang';
    if (hour >= 15 && hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <View className="flex flex-row justify-between items-center">
        <View className='flex-1'>
            <Text className="font-pbold text-xl">
                {`${getGreeting()}, ${user.username}`}
            </Text>
            <Text className="font-pregular">Catatlah pengeluaranmu setiap hari!</Text>
        </View>
      <TouchableOpacity
          className="w-12 h-12 rounded-full overflow-hidden"
          onPress={() => navigation.navigate('History')}
        >
          <Image
            source={
              user.photoUrl
                ? { uri: user.photoUrl }
                : require('../assets/icons/user.png')
            }
            className="w-full h-full"
            resizeMode="cover"
          />
        </TouchableOpacity>
    </View>
  );
};

export default TopBar;
