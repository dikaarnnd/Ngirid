import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import {
  Platform,
  Linking,
  DeviceEventEmitter,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';

// screens
import MainTabs from './screens/tabs/MainTabs';
import AuthChoiceScreen from './screens/auth/AuthChoice';
import LoginScreen from './screens/auth/Login';
import SignupScreen from './screens/auth/Signup';
import HomeScreen from './screens/tabs/Home';
import ProfileScreen from './screens/tabs/Profile';
import EditProfileScreen from './screens/tabs/EditProfile';
import HistoryScreen from './screens/tabs/History';
import AddScreen from './screens/tabs/Add';
import EditIncScreen from './screens/tabs/EditSaldo';
import EditExpScreen from './screens/tabs/EditPengeluaran';

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
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hide();
      }
    }

    if (error) throw error;
    hideSplashScreen();
  }, [fontsLoaded, error]);

  // 🔔 Notification Access
  useEffect(() => {
    const requestPostNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          console.log(granted === PermissionsAndroid.RESULTS.GRANTED
            ? '✅ Izin POST_NOTIFICATIONS diberikan'
            : '❌ Izin POST_NOTIFICATIONS ditolak');
        } catch (err) {
          console.warn('❗ Gagal meminta izin POST_NOTIFICATIONS:', err);
        }
      }
    };

    const checkNotificationAccess = async () => {
      try {
        const status = await RNAndroidNotificationListener.getPermissionStatus();
        console.log('🔍 Status Akses Notifikasi:', status);

        if (status !== 'authorized') {
          Alert.alert(
            'Akses Notifikasi',
            'Izinkan aplikasi membaca notifikasi agar fitur berjalan maksimal.',
            [
              {
                text: 'Buka Pengaturan',
                onPress: async () => {
                  try {
                    await RNAndroidNotificationListener.requestPermission();
                    console.log('✅ Selesai buka pengaturan');
                  } catch (e) {
                    console.warn('❌ Gagal buka pengaturan:', e);
                  }
                },
              },
              { text: 'Batal', style: 'cancel' },
            ],
            { cancelable: true }
          );
        }
      } catch (err) {
        console.warn('❗ Gagal mengecek status notifikasi:', err);
      }
    };

    requestPostNotificationPermission().then(checkNotificationAccess);

    // Listen to foreground notifications
    const subscription = DeviceEventEmitter.addListener(
      'onNotificationReceived',
      (event: any) => {
        console.log('📥 Notifikasi diterima (foreground):', JSON.stringify(event, null, 2));
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  if (!fontsLoaded && !error) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthChoice" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthChoice" component={AuthChoiceScreen} />
        <Stack.Screen name="Signin" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="EditSaldo" component={EditIncScreen} />
        <Stack.Screen name="EditPengeluaran" component={EditExpScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
