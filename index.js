// index.js
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// ✅ Pastikan path ini benar
import NotificationTask from 'NotificationTask';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask(
  'RNAndroidNotificationListenerHeadlessJs',
  () => NotificationTask
);
