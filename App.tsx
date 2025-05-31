import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import {useFonts} from 'expo-font';

// screens
import MainTabs from './screens/tabs/MainTabs';
import AuthChoiceScreen from './screens/auth/AuthChoice';
import LoginScreen from './screens/auth/Login';
import SignupScreen from './screens/auth/Signup';
import HomeScreen from './screens/tabs/Home';
import ProfileScreen from './screens/tabs/Profile';
import EditProfileScreen from './screens/tabs/EditProfile';
import HistoryScreen from './screens/tabs/History';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
  })

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hide();
      }
    }

    if (error) {
      throw error;
    }

    hideSplashScreen();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error ) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthChoice" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthChoice" component={AuthChoiceScreen} />
        <Stack.Screen name="Signin" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
