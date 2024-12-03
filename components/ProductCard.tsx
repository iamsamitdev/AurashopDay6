import { Image, Pressable } from 'react-native';
import { View, Text } from '@/components/Themed';
import React from 'react';

export default function ProductCard({
  productname, 
  productprice,
  productimage,
  postDate,
  description,
  onPress
}: any) {
  return (
    <Pressable onPress={onPress} className="flex flex-col shadow-md my-[1px] dark:bg-gray-800 bg-white" android_ripple={{ color: 'rgba(104, 104, 104, 0.3)' }}>
      
      <View className="p-4">
        <Image
          source={{uri: productimage}}
          className="w-full h-48 rounded-xl"
          resizeMode="cover"
        />
        <Text
          className="text-xl pt-4"
          fontWeight='medium'
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {productname}
        </Text>
        <View className="flex flex-row justify-between mt-2">
          <Text
            className="text-lg !text-gray-400"
            fontWeight='medium'
          >
            {productprice} บาท
          </Text>
          <Text
            className="text-md !text-gray-400 mt-1"
            fontWeight='medium'
          >
            เมื่อ {postDate}
          </Text>
        </View>
        <Text
          className="text-md mt-2"
          fontWeight='regular'
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
}