import {View, Text, TouchableOpacity, Image, ScrollView, Alert} from 'react-native'
import React, {useState} from 'react'
import {CText, CustomButton, CustomSafeAreaView, FormField} from "../../components"
import {Video, ResizeMode} from "expo-av";
import {icons} from "../../constants";
import * as DocumentPicker from "expo-document-picker";
import {router} from "expo-router";
import {createVideo} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";

const Create = () => {

    //Global States
    const { user } = useGlobalContext();

    //State for managing uploading-state
    const [uploading, setUploading] = useState(false)

    //State object for managing form-state
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
    })

    //Function for picking Image/Video of Document Storage and setting form.thumbnail/video
    const openPicker = async (selectType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: selectType === 'image'
                ? ['image/png', 'image/jpg', 'image/jpeg']
                : ['video/mp4', 'video/gif']

        })

        if (!result.canceled) {
            if(selectType === 'image') {
                setForm({...form, thumbnail: result.assets[0]})
            }
            if(selectType === 'video') {
                setForm({...form, video: result.assets[0]})
            }
        }
    }

    //Function for uploading video
    const submit = async () => {
        if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
            Alert.alert("Please fill in all the fields")
        }

        setUploading(true)

        try {
            await createVideo({...form, userId: user.$id});

            Alert.alert("Success", "Post uploaded successfully.")
            router.replace('/home');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: ''
            })
            setUploading(false)
        }

    }

    return (
        <CustomSafeAreaView className="bg-primary h-full">
            <ScrollView showsVerticalScrollIndicator={false} className="px-4">
                <CText className="mt-6 text-2xl font-psemibold">Upload video</CText>
                <FormField
                    title={ "Video Title" }
                    value={ form.title }
                    placeholder={ "Give your video a catchy title..." }
                    handleChangeText={ (e) => setForm({...form, title: e}) }
                    otherStyles={ "mt-10" }
                />
                <View className={ "mt-7 space-y-2" }>
                    <Text className={ "text-neutraldark-800 dark:text-neutrallight-800 text-base font-pmedium pl-3 mb-2" }>Upload Video</Text>
                    <TouchableOpacity onPress={() => openPicker('video')}>
                        { form.video ? (
                            <Video
                                className={ "w-full h-64 rounded-2xl" }
                                source={ {uri: form.video.uri} }
                                useNativeControls
                                resizeMode={ ResizeMode.COVER }
                                isLooping
                            />
                        ) : (
                            <View className={ "bg-neutrallight-400 dark:bg-neutraldark-300 border-neutrallight-600 dark:border-neutraldark-600 border w-full h-40 px-4 justify-center items-center rounded-2xl" }>
                                <View
                                    className={ "w-14 h-14 border border-dashed border-secondary-100 justify-center items-center rounded-xl" }>
                                    <Image
                                        source={ icons.upload }
                                        resizeMode={ "contain" }
                                        className={ "w-1/2 h-1/2" }/>
                                </View>
                            </View>
                        ) }
                    </TouchableOpacity>
                </View>
                <View className={ "mt-7 space-y-2" }>
                    <Text className={ "text-neutraldark-800 dark:text-neutrallight-800 text-base font-pmedium pl-3 mb-2" }>Thumbnail Image</Text>
                    <TouchableOpacity onPress={() => openPicker('image')}>
                        { form.thumbnail ? (
                            <Image
                                className={ "w-full h-64 rounded-2xl" }
                                source={ {uri: form.thumbnail.uri} }
                                resizeMode="cover"
                            />
                        ) : (
                            <View
                                className={ "bg-neutrallight-400 dark:bg-neutraldark-300 border-neutrallight-600 dark:border-neutraldark-600 border w-full h-20 px-4 justify-center items-center rounded-2xl flex-row gap-x-2" }>
                                <Image
                                    source={ icons.upload }
                                    resizeMode={ "contain" }
                                    className={ "w-5 h-5" }/>
                                <Text className={ "text-neutraldark-900 dark:text-neutrallight-900 text-sm font-pmedium" }>Choose a file</Text>
                            </View>
                        ) }
                    </TouchableOpacity>
                </View>
                <FormField
                    title={ "AI Prompt" }
                    value={ form.prompt }
                    placeholder={ "The prompt for your video..." }
                    handleChangeText={ (e) => setForm({...form, prompt: e}) }
                    otherStyles={ "mt-10" }
                />
                <CustomButton
                    title={ "Submit & Publish" }
                    handlePress={ submit }
                    containerStyles={ "mt-7" }
                    isLoading={ uploading }
                />
            </ScrollView>
        </CustomSafeAreaView>
    )
}

export default Create