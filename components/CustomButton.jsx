import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary h-[50] justify-center items-center rounded-[8px] ${containerStyles}
                  ${isLoading ? "opacity-50" : ''}`}
      disabled={isLoading}
    >
        <Text className={`font-primary text-base font-psemibold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton