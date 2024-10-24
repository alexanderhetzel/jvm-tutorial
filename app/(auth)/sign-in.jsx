import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/formField'
import CustomButtom from '../../components/customButton'
import { Link, router } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async() => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all fields!');
    }
    setIsSubmitting(true);

    try {
      const result = await signIn(form.email, form.password);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView >
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
          <Text className="text-2xl text-white font-semibold mt-7">Sign in</Text>
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
          <CustomButtom title="Sign in" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}/>
          <View className="flex-row justify-center gap-1 mt-5">
            <Text className="font-pregular text-sm text-white">Don't have an account?</Text>
            <Link className="text-secondary-100 text-sm font-psemibold" href="/sign-up">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn