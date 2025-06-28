import { AppRegistry } from 'react-native';
import App from 'App';
import { name as appName } from 'app.json';

import {
  RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';

// Headless handler: dipanggil saat notifikasi masuk di background
const headlessNotificationListener = async ({ notification }) => {
  console.log('📡 [HEADLESS] Notifikasi masuk:', JSON.stringify(notification, null, 2));
};

AppRegistry.registerComponent(appName, () => App);

// WAJIB untuk notifikasi background
AppRegistry.registerHeadlessTask(
  RNAndroidNotificationListenerHeadlessJsName,
  () => headlessNotificationListener
);
