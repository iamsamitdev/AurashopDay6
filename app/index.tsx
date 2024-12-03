import { Redirect } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { ScrollView, Image, useColorScheme } from 'react-native'
import { View, Text } from "@/components/Themed"
import { images } from "@/constants"
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Index() {

  const colorScheme = useColorScheme();

  // สร้างตัวแปร state เช็คสถานะการ login
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false);

  // ตรวจสอบสถานะการ login จาก AsyncStorage
  useEffect(() => {
    const initialize = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        console.log('isLoggedIn:', isLoggedIn);
        if (isLoggedIn === 'true') {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initialize()
  }, [])

  if (!isInitialized) return null

  const logo = colorScheme === 'dark' ? images.logoDark : images.logo;

  return (
    <>
      { isLoggedIn &&  <Redirect href="/(tabs)/home" /> }
      { 
        !isLoggedIn && <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <View className="w-full flex justify-center items-center h-full px-8">
            
            {/* LOGO */}
            <Image
              source={logo}
              className="h-[84px]"
              resizeMode="contain"
            />

            {/* Card Image */}
            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />

            
            {/* Slogan */}
            <View className="relative mt-5">
              <Text className="text-3xl text-center dark:text-white" fontWeight='bold'>
                ค้นพบประสบการณ์{"\n"}
                ไร้ขีดจำกัดที่{" "}
                <Text className="text-secondary-200" fontWeight='bold'>AuraShop</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[120px] h-[15px] absolute -bottom-4 -right-8"
                resizeMode="contain"
              />
            </View>

            {/* Description */}
            <Text className="text-md font-pregular mt-7 text-center dark:text-white">
              ค้นหาความคิดสร้างสรรค์ใหม่ได้ทุกวัน: เริ่มต้นการเดินทางของความคิดสร้างสรรค์ที่ไร้ขีดจำกัดกับ Aura
            </Text>

            {/* Button */}
            <CustomButton
              title="เริ่มใช้งาน"
              handlePress={() => { 
                router.push("/login");
              }}
              containerStyles="w-full mt-7"
            />

          </View>
        </ScrollView>
        </SafeAreaView> 
      }
    </>
  )
}
