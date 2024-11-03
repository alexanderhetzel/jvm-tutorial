import React, {useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {CText, CustomButton, CustomSafeAreaView} from "../../components";
import {images} from "../../constants";
import {router, SplashScreen} from "expo-router";
import {useGlobalContext} from "../../context/GlobalProvider";


const Welcome = () => {

    //Global states
    const {isLoggedIn, isLoading } = useGlobalContext();

    //Hide the splash-screen when user IS NOT logged in and isLoading is false
    useEffect(() => {
        if (!isLoggedIn && !isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);

    return (
        <CustomSafeAreaView className="h-full">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
                    <Image source={images.cards} className="w-[380px] h-[300px]" resizeMode="contain" />
                    <View className="mt-5">
                        <CText className="text-3xl font-bold text-center">
                            Discover Endless Possibilities with
                            <Text className="text-secondary-200"> Aora</Text>
                        </CText>
                    </View>
                    <Text className="text-neutraldark-800 dark:text-neutrallight-800 text-sm font-pregular mt-7 text-center">
                        Where creativity meets innovation: Embark on a journey of limitless exploration with Aora
                    </Text>
                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => { router.push('sign-in'); }}
                        containerStyles="mt-7 w-full"
                    />
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
};

export default Welcome;