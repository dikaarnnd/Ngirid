import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function Add() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="flex-1 justify-center items-center">
          <Text>Add Screen</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
