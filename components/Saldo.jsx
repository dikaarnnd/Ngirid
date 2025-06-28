import { View, Text, Image } from 'react-native'

export default function Saldo() {
  const data = {
    totalSaldo: 10000000,
    totalExp: 5000000,
  }

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

  return (
    <View className="flex-1 bg-[#188D35] rounded-2xl py-6 overflow-hidden">
      <Image
        source={require('../assets/images/onboarding.png')}
        className="absolute w-64 h-64 -z-10 opacity-10 rotate-45"
        style={{
          top: -40,
          right: -40,
        }}
      />
      <Text className="text-sm text-white font-pregular pl-4">Saldo</Text>
      <Text className="text-[40px] text-white text-center font-psemibold">{formatRupiah(data.totalSaldo)}</Text>
    </View>
  )
}