import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import Switch from 'components/Switch';
import Header from 'components/Header';

export default function Add() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-white'>
        <Header headerName="Tambah"/>
        {/* Switch */}
        <Switch />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
