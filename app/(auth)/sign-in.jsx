import { View, Text, ScrollView, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import {Link, router, SplashScreen} from 'expo-router'
import {getCurrentUser, signIn} from '../../lib/appwrite'
import {useGlobalContext} from "../../context/GlobalProvider";
import {CustomSafeAreaView, CustomButton, FormField, CText} from '../../components'
import {Image} from "expo-image";

const SignIn = () => {

  //State object for managing form-state
  const [form, setForm] = useState({
    email: '',
    password:''
  })

  //State for managing submitting-state
  const [isSubmitting, setIsSubmitting] = useState(false)

  //Global states
  const { setUser, setIsLoggedIn } = useGlobalContext();

  //submit function for authenticating (sign in) against db
  const submit = async() => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all fields!');
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <CustomSafeAreaView className="bg-primary h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image source={images.logo} contentFit="contain" className="w-[115px] h-[35px]"/>
          <CText className="text-2xl font-semibold mt-7">Sign in</CText>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
            autoCapitalize='none'
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton title="Sign in" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}/>
          <View className="flex-row justify-center gap-1 mt-5">
            <CText className="font-pregular text-sm">Don't have an account?</CText>
            <Link className="text-secondary-100 text-sm font-psemibold" href="/sign-up">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default SignIn