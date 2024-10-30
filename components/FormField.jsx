import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import {icons, images} from '../constants'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

    //State for showing password (only used if form-field title is 'Password')
    const [showPassword, setShowPassword] = useState(false)

    return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium mb-2 pl-3">{title}</Text>
        <View className="flex-row w-full h-16 px-4 bg-black-100 rounded-2xl border-[1px] border-borderblue focus:border-secondary-100 items-center">
        <TextInput 
            className="flex-1 h-full text-white font-pmedium text-base"
            value={value} 
            placeholder={placeholder}
            placeholderTextColor={"#7b7b8b"}
            onChangeText={handleChangeText}
            secureTextEntry ={title === "Password" && !showPassword}
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