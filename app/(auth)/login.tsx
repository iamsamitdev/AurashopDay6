import { Dimensions, ScrollView, Image, Alert, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native'
import { Text, View } from '@/components/Themed'
import { SafeAreaView, } from 'react-native-safe-area-context'
import images from '@/constants/images'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { useState } from 'react'
import Button from '@/components/Button'
import { router } from 'expo-router'
import { supabase } from '@/utils/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function login() {

  const colorScheme = useColorScheme();

  // กำหนดตัวแปร State สำหรับเก็บค่าของ Email และ Password
  const [form, setForm] = useState({
    email: "samit@email.com",
    password: "123456",
  })

  // กำหนดตัวแปรเก็บสถานะการ submit ข้อมูล
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ฟังก์ชัน submit form สำหรับการเข้าสู่ระบบ
  const submit = async () => {

    setIsSubmitting(true)

    if (form.email === "" || form.password === "") {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณาระบุข้อมูลให้ถูกต้อง")
      setIsSubmitting(false)
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      Alert.alert("เข้าสู่ระบบไม่สำเร็จ", error.message)
    } else {

      console.log('Token:', data.session?.access_token) // Log the toke\

      // บันทึก Token ลงใน AsyncStorage
      await AsyncStorage.setItem('token', data.session?.access_token)
      // บันทึกสถานะการเข้าสู่ระบบลงใน AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true')

      Alert.alert(
        'เข้าสู่ระบบสำเร็จ',
        'กรุณากดปุ่ม OK เพื่อเข้าสู่ระบบ',
        [
          {
            text: 'ตกลง',
            onPress: () => router.replace('/(tabs)/home'), // ส่งไปยังหน้า Home
          },
        ]
      )
    }

    setIsSubmitting(false)
  }

  const logo = colorScheme === 'dark' ? images.logoDark : images.logo;

  return (
    <SafeAreaView className='h-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='h-full'
      >
        <ScrollView>
          <View
            className="w-full flex justify-center h-full px-4"
            style={{
              minHeight: Dimensions.get("window").height - 0,
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
              เข้าสู่ระบบ
            </Text>

            <FormField
              title="อีเมล์"
              value={form.email}
              handleChangeText={(e:any) => setForm({ ...form, email: e })}
              otherStyles="mt-7 dark:text-white"
              keyboardType="email-address"
            />

            <FormField
              title="รหัสผ่าน"
              value={form.password}
              handleChangeText={(e:any) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Login"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-pregular">
                ยังไม่มีบัญชี ?
              </Text>
              <Button title="ลงทะเบียน" onPress={() => router.replace('/register')} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}