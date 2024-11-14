import React, {useEffect, useState} from "react";
import { ResizeMode, Video } from "expo-av";
import {View, Text, TouchableOpacity, useColorScheme, TouchableWithoutFeedback} from "react-native";
import { icons } from "../constants";
import CText from "./CText";
import Heart from "../assets/icons-svg/heart.svg"
import {neutraldark, secondary} from "../constants/colors";
import {dislikePost, likePost} from "../lib/appwrite";
import {useGlobalContext} from "../context/GlobalProvider";
import { Image } from 'expo-image';
import ScalingButton from "./ScalingButton";


const VideoCard = ({ docId, title, creator, avatar, thumbnail, video, likes, userId }) => {

    //State for managing play-state
    const [play, setPlay]= useState(false);
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(likes.some(like => like.$id === userId));
    }, [likes]);


    const { colorScheme } = useGlobalContext();

    return (
        <View className="flex flex-col items-center px-4">
            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-start items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image
                            source={avatar}
                            className="w-full h-full rounded-md bg-black-200"
                            contentFit="cover"
                        />
                    </View>
                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <CText
                            className="font-psemibold text-sm"
                            numberOfLines={1}
                        >
                            {title}
                        </CText>
                        <Text
                            className="text-neutraldark-800 dark:text-neutrallight-800 text-xs font-pregular"
                            numberOfLines={1}
                        >
                            {creator}
                        </Text>
                    </View>

                </View>

                <View className="pt-2 flex-row">
                    <ScalingButton className={"p-1.5"} onPress={async () => {
                        setIsLiked(!isLiked)
                        try {
                            if (!isLiked) {
                                await likePost(docId, userId);
                                console.log("liked");
                            } else {
                                await dislikePost(docId, userId);
                                console.log("disliked");
                            }
                        } catch (error) {
                            // Zustand auf vorherigen Wert zurücksetzen
                            setIsLiked(isLiked);
                        }
                    }}>
                        <Heart stroke={isLiked ? secondary["200"] : "#CDCDE0"} fill={isLiked ? secondary.DEFAULT : "none"} stroke-width={"4"} width={20} height={20}/>
                    </ScalingButton>
                    <TouchableOpacity className={"p-1.5"}>
                        <Image tintColor={"#CDCDE0"} source={icons.menu} className="w-5 h-5" contentFit="contain" />
                    </TouchableOpacity>
                </View>
            </View>
            {play ? (
                <Video
                    source={{uri: video}}
                    className={"w-full h-60 mt-3 rounded-xl bg-white/10"}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-6 relative flex justify-center items-center"
                >
                    <Image
                        source={{uri: thumbnail}}
                        className="w-full h-full rounded-xl bg-black-200"
                        contentFit="cover"
                        onLoadEnd={() => setThumbnailLoaded(true)}
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        contentFit="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;