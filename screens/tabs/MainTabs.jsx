import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from '../../constants';

import Home from './Home';
import Add from './Add';
import History from './History';

const Tab = createBottomTabNavigator();

const TabIcon = ({icon, name, focused, iconActive}) => {
  return(
    <View className='flex-1 h-full items-center justify-center mt-5'>
      <Image
        source={focused ? iconActive : icon}
        resizeMode="contain"
        // tintColor={color}
        className="w-7 h-7"
      />
      {/* <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text> */}
    </View>
  )
}

const MainLayout = () => {
  return (
    <SafeAreaView className='flex-1'>
      <Tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        // tabBarActiveTintColor: '#FFFFFF',
        // tabBarInactiveTintColor: '#F5F5F5',
        tabBarStyle: {
          backgroundColor: '#CD6D1A',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 6,
          // borderTopLeftRadius: 0,          // Tidak bulat = persegi
          // borderTopRightRadius: 0,
          // elevation: 10,                   // Bayangan Android
          // shadowColor: '#000',             // Bayangan iOS
          // shadowOpacity: 0.1,
          // shadowOffset: { width: 0, height: -2 },
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}>
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{ 
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabIcon
                icon={icons.home}
                iconActive={icons.homeActive}
                name="Home"
                focused={focused}
              />
            )
        }}/>
        <Tab.Screen 
          name="Add" 
          component={Add} 
          options={{ 
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({focused}) => (
              <TabIcon
                icon={icons.add}
                name="Add"
                focused={focused}
              />
            )
        }}/>
        <Tab.Screen 
          name="History" 
          component={History} 
          options={{ 
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabIcon
                icon={icons.history}
                iconActive={icons.historyActive}
                name="History"
                focused={focused}
              />
            )
        }}/>
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default MainLayout;