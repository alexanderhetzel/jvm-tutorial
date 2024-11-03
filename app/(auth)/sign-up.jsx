import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import {images} from '../../constants'
import { Link } from 'expo-router'
import {createUser} from '../../lib/appwrite'
import { router } from 'expo-router'
import {useGlobalContext} from "../../context/GlobalProvider";
import {CustomSafeAreaView, CustomButton, FormField, CText} from '../../components'


const SignUp = () => {

  //State object for managing form-state
  const [form, setForm] = useState({
    email: '',
    password:'',
    username:''
  })

  //State for managing submitting-state
  const [isSubmitting, setIsSubmitting] = useState(false)

  //Global states
  const { setUser, setIsLoggedIn } = useGlobalContext()

  //submit function for authenticating (sign up) against db
  const submit = async() => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all fields!');
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
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
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
          <CText className="text-2xl font-semibold mt-7">Sign up</CText>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}/>
          <View className="flex-row justify-center gap-1 mt-5">
            <CText className="font-pregular text-sm">Have an account already?</CText>
            <Link className="text-secondary-100 text-sm font-psemibold" href="/sign-in">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default SignUp