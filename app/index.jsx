import { useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Redirect, SplashScreen, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../context/GlobalProvider'; 
import { images } from '../constants';
import {CustomButton, CustomSafeAreaView} from "../components"


export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
    console.log(isLoggedIn)
        SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if(isLoggedIn) return (<Redirect href={'home'}/>)

  else{
    return (
        <CustomSafeAreaView className= "bg-primary h-full">
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="w-full justify-center items-center h-full px-4">
              <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
              <Image source={images.cards} className="w-[380px] h-[300px]" resizeMode="contain" />
              <View className="mt-5">
                <Text className="text-3xl text-white font-bold text-center">
                  Discover Endless Possibilities with
                  <Text className="text-secondary-200"> Aora</Text>
                </Text>
              </View>
              <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
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
  }
  // Die Willkommensseite wird nur angezeigt, wenn der Benutzer nicht eingeloggt ist

}
