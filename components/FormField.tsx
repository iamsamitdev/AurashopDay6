import { useState } from "react";
import { TextInput, TouchableOpacity, Image } from "react-native";
import { View, Text } from "@/components/Themed";

import { icons } from "../constants";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
}: any) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base font-pmedium mb-4">{title}</Text>

            <View className="w-full h-16 px-4 mb-2 rounded-2xl border-2 border-black-200 dark:border-gray-600 focus:border-secondary flex flex-row items-center">
                <TextInput
                    className="flex-1 font-psemibold text-base dark:!text-white !text-black"
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "รหัสผ่าน" && !showPassword}
                    {...props}
                />

                {title === "รหัสผ่าน" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField