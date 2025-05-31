import { View, Text } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function Header() {
  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <View>
        <Text>Header</Text>
        </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}