import { View, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from '../../constants';

import Home from './Home';
import Add from './Add';
import History from './History';

const Tab = createBottomTabNavigator();

const TabIcon = ({icon, color, name, focused}) => {
  return(
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>
    </View>
  )
}

const MainLayout = () => {
  return (
    <Tab.Navigator screenOptions={{ 
      tabBarShowLabel: false,
      tabBarActiveTintColor: "#299B65",
      tabBarInactiveTintColor: "#252525",
      tabBarStyle: {
        // borderTopWidth: 1,
        // borderTopColor: "#252525",
        height: 70
      }
     }}>
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{ 
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon={icons.home}
              color={color}
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
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon={icons.add}
              color={color}
              name="Make a List"
              focused={focused}
            />
          )
      }}/>
      <Tab.Screen 
        name="History" 
        component={History} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon={icons.history}
              color={color}
              name="History"
              focused={focused}
            />
          )
      }}/>
    </Tab.Navigator>
  )
}

export default MainLayout;