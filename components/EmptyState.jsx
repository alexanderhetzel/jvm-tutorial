import React from 'react';
import {View, Text, Image} from 'react-native';
import {images} from "../constants";
import CustomButton from "./CustomButton";
import {router} from "expo-router";

const EmptyState = ({title, subtitle}) => {
    return (
        <View className={"justify-center items-center p-4"}>
            <Image source={images.empty} className={"w-[270px] h-[180px]"} resizeMode={"contain"}/>
            <Text className="text-xl font-psemibold text-white">{title}</Text>
            <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
            <CustomButton containerStyles={"w-full my-5"} handlePress={() => router.push('/create')} title={"Create video"}/>
        </View>
    );
};

export default EmptyState;