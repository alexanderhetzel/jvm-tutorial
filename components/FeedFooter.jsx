import React, {useEffect} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {icons} from "../constants";
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {neutraldark, neutrallight, placeholdergray, secondary} from "../constants/colors";
import CText from "./CText";
import {useGlobalContext} from "../context/GlobalProvider";
import {Image} from "expo-image";

const FeedFooter = () => {

    //State value for color progress
    const colorProgress = useSharedValue(0);

    const { colorScheme } = useGlobalContext();

    //Changing color-progress state continuously
    useEffect(() => {
        colorProgress.value = withRepeat(
            withTiming(1, { duration: 2000 }),
            -1,
            true
        );
    }, []);

    //Function for continuously changing background-color
    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                colorProgress.value,
                [0, 1],
                [colorScheme === "light" ? neutrallight["700"] : neutraldark["700"], secondary["300"]]
            ),
        };
    });

    return (
        <View className={"my-10 mx-4 justify-center items-center gap-y-1"}>
            <View className={"flex-row items-center gap-x-2 mb-3"}>
                {/* Linke Linie mit animierter Farbe */}
                <Animated.View className={"flex-1 h-0.5"} style={animatedStyle}/>

                {/* Icon */}
                <Image source={icons.activity} className={"w-8 h-8"} />

                {/* Rechte Linie mit animierter Farbe */}
                <Animated.View className={"flex-1 h-0.5"} style={animatedStyle} />
            </View>
            <CText className={"font-psemibold text-lg"}>Oh, done already?</CText>
            <Text className={"text-neutraldark-800/75 dark:text-neutrallight-800/75 font-pregular"}>You watched all current videos on your feed.</Text>
        </View>
    );
};

export default FeedFooter;