import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';

import HomeScreen from '../screens/Home';
import AddScreen from '../screens/Add';
import HistoryScreen from '../screens/History';

const Tab = createBottomTabNavigator();

const getIcon = (name, focused) => {
  switch (name) {
    case 'Home':
      return focused
        ? require('../assets/icons/home-active.png')
        : require('../assets/icons/home.png');
    case 'Add':
      return require('../assets/icons/add.png');
    case 'History':
      return focused
        ? require('../assets/icons/history-active.png')
        : require('../assets/icons/history.png');
    default:
      return null;
  }
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused }) => (
          <Image
            source={getIcon(route.name, focused)}
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? '#CD6D1A' : '#888',
            }}
          />
        ),
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarActiveTintColor: '#CD6D1A',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
