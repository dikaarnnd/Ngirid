import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const Switch = () => {
  const [enabled, setEnabled] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    setEnabled(prev => !prev);
  };

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: enabled ? 17 : -4,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [enabled]);

  return (
    <View className='flex-row items-center px-3'>
      <TouchableOpacity
        onPress={toggleSwitch}
        activeOpacity={0.8}
        className={`w-14 h-8 rounded-full p-1 flex-row items-center ${
          enabled ? 'bg-[#188D35]' : 'bg-[#2477CA]'
        }`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.9,
          shadowRadius: 4,
          elevation: 4, // for Android
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
          }}
          className={`w-8 h-8 rounded-full justify-center items-center ${
          enabled ? 'bg-[#2477CA]' : 'bg-[#188D35]'
        }`}
        >
          <View
            className="w-full h-full rounded-full"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: '#00000010', // translucent black overlay
              borderRadius: 999,
            }}
          />
        </Animated.View>
      </TouchableOpacity>
      <Text className='text-xl items-center font-psemibold ml-4'>{enabled ? 'Pengeluaran' : 'Saldo'}</Text>
    </View>
  );
};

export default Switch;
