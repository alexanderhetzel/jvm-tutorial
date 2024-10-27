import { View, Text } from 'react-native'
import React from 'react'
import {CustomSafeAreaView} from "../../components"

const Create = () => {
  return (
    <CustomSafeAreaView className="bg-primary h-full">
        <View className="my-6 space-y-6"></View>
        <Text className="text-2xl font-psemibold text-white">Upload video</Text>
    </CustomSafeAreaView>
  )
}

export default Create