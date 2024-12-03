import { ScrollView, Image, Dimensions, Alert, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native'
import { View, Text } from '@/components/Themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { router } from 'expo-router'
import Button from '@/components/Button'
import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import { useState } from 'react'
import { supabase } from '@/utils/supabase'

export default function register() {

  const [displayName, setDisplayName] = useState('') // Initialize display name state
  const [email, setEmail] = useState('') // Initialize email state
  const [password, setPassword] = useState('') // Initialize password state
  const [error, setError] = useState('') // Initialize error state
  const colorScheme = useColorScheme();

  // Handle register
  const handleRegister = async () => {
    setError('') // Clear previous errors

    // Check if all fields are filled
    if (!displayName || !email || !password) {
      Alert.alert('ข้อมูลไม่ครบ', 'กรุณาระบุข้อมูลให้ถูกต้อง')
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      console.log('Token:', data.session?.access_token) // Log the token
      Alert.alert(
        'ลงทะเบียนสำเร็จ',
        'กรุณากดปุ่ม OK เพื่อเข้าสู่ระบบ',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'), // Redirect to login page on success
          },
        ]
      )
    }
  }

  const logo = colorScheme === 'dark' ? images.logoDark : images.logo;

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View
            className="w-full flex justify-center h-full px-4"
            style={{
              minHeight: Dimensions.get("window").height,
            }}
          >
            <View className="flex items-center">
              <Image
                source={logo}
                resizeMode="contain"
                className="h-[34px]"
              />
            </View>

            <Text className="text-2xl mt-10" fontWeight='medium'>
              สมัครสมาชิก
            </Text>

            <FormField
              title="ชื่อสมาชิก"
              value={displayName}
              onChangeText={setDisplayName}
              otherStyles="mt-10"
            />

            <FormField
              title="อีเมล์"
              value={email}
              onChangeText={setEmail}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="รหัสผ่าน"
              value={password}
              onChangeText={setPassword}
              otherStyles="mt-7"
            />

            {error ? (
              <Text className="text-red-500 mt-4">{error}</Text>
            ) : null}

            <CustomButton
              title="สมัครสมาชิก"
              handlePress={handleRegister}
              containerStyles="mt-7"
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                มีบัญชีอยู่แล้ว ?
              </Text>
              <Button title="เข้าสู่ระบบ" onPress={() => router.replace('/login')} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}