import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {icons, images} from '../constants'
import {useGlobalContext} from "../context/GlobalProvider";
import {neutraldark, neutrallight} from "../constants/colors";
import {Image} from "expo-image";

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, keyboardType, autoCapitalize, ...props}) => {

    //State for showing password (only used if form-field title is 'Password')
    const [showPassword, setShowPassword] = useState(false)

    const { colorScheme } = useGlobalContext();

    return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-neutraldark-800 dark:text-neutrallight-800 text-base font-pmedium mb-2 pl-3">{title}</Text>
        <View className="bg-neutrallight-400 dark:bg-neutraldark-300 border-neutrallight-600 dark:border-neutraldark-600 flex-row w-full h-16 px-4 rounded-2xl border-[1px] focus:border-secondary-100 items-center">
        <TextInput 
            className="flex-1 h-full text-neutraldark-200 dark:text-neutrallight-200 font-pmedium text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor={colorScheme === "light" ? neutraldark["900"] : neutrallight["900"]}
            onChangeText={handleChangeText}
            secureTextEntry ={title === "Password" && !showPassword}
            keyboardType={keyboardType ? keyboardType : 'default'}
            autoCapitalize={autoCapitalize ? autoCapitalize : 'sentences'}
        />
        {title === 'Password' &&(
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain"/> 
            </TouchableOpacity>
        )}
        </View>
    </View>
    )
}

export default FormField