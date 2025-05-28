import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';

import '../../global.css';

export default function AuthChoice() {
  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <View>
                <View className='flex'>
                    <View>
                        <Card style={{ margin: 16 }}>
                            <Card.Cover source={require('../../assets/images/onboarding.png')}/>
                        </Card>
                        <Text className='text-2xl font-bold text-center mt-4'>Welcome to Our App</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}