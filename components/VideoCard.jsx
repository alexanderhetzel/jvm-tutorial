import React, {useEffect, useState} from "react";
import { ResizeMode, Video } from "expo-av";
import {View, Text, TouchableOpacity, Image, useColorScheme} from "react-native";
import { icons } from "../constants";
import {Skeleton} from "moti/skeleton";
import {MotiView} from "moti";
import CText from "./CText";
import Heart from "../assets/icons-svg/heart.svg"
import {neutraldark, secondary} from "../constants/colors";
import {dislikePost, likePost} from "../lib/appwrite";
import {useGlobalContext} from "../context/GlobalProvider";

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
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-md bg-black-200"
                            resizeMode="cover"
                        />
                    </View>
                    <MotiView className={"absolute top-0 left-0"}>
                        <Skeleton colorMode={colorScheme} show={!thumbnailLoaded} width={46} height={46} radius={5.25}/>
                    </MotiView>

                    {thumbnailLoaded ? (
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
                    ) : (
                        <View className={"flex-col ml-3 gap-2"}>
                            <MotiView>
                                <Skeleton colorMode={colorScheme} show={!thumbnailLoaded} width={200} height={17.5} radius={5.25}/>
                            </MotiView>
                            <MotiView>
                                <Skeleton colorMode={colorScheme} show={!thumbnailLoaded} width={50} height={17.5} radius={5.25}/>
                            </MotiView>
                        </View>
                    )}
                </View>

                {thumbnailLoaded &&
                <View className="pt-2 flex-row">
                    <TouchableOpacity className={"p-1.5"} onPress={async () => {
                        if(!isLiked) {
                            await likePost(docId, userId)
                            console.log("liked")
                        }
                        else {
                            await dislikePost(docId, userId)
                            console.log("disliked")
                        }
                        setIsLiked(!isLiked)

                    }}>
                        <Heart stroke={isLiked ? secondary["200"] : "#CDCDE0"} fill={isLiked ? secondary.DEFAULT : "none"} stroke-width={"4"} width={20} height={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity className={"p-1.5"}>
                        <Image tintColor={"#CDCDE0"} source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                }
            </View>

            {/*<MotiView
                transition={{
                    type: 'timing',
                }}
                className={"flex gap-6"}
            >
                <MotiView className={"flex-row gap-x-3"}>
                    <Skeleton width={40.6} height={40.6} radius={8} />
                    <MotiView className={"justify-center gap-1"}>
                        <Skeleton width={250} height={15} radius={8} />
                        <Skeleton width={50} height={15} radius={8} />
                    </MotiView>
                </MotiView>
                <Skeleton width={'100%'} height={210} radius={12} />
            </MotiView>
            */}
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
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl bg-black-200"
                        resizeMode="cover"
                        onLoadEnd={() => setThumbnailLoaded(true)}
                    />

                    {!thumbnailLoaded && (
                        <MotiView
                            transition={{
                                type: 'timing',
                            }}
                            style={{ position: 'absolute', top: 0, left: 0 }}
                        >
                            <Skeleton colorMode={colorScheme} width={'100%'} height={210} radius={10} />
                        </MotiView>
                    )}

                    {thumbnailLoaded && (
                        <Image
                            source={icons.play}
                            className="w-12 h-12 absolute"
                            resizeMode="contain"
                        />
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;