import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {icons} from "../constants";
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {placeholdergray, secondary} from "../constants/colors";

const FeedFooter = () => {

    //State value for color progress
    const colorProgress = useSharedValue(0);

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
                [placeholdergray, secondary["300"]]
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
            <Text className={"text-white font-psemibold text-lg"}>Oh, done already?</Text>
            <Text className={"text-gray-100 font-pregular"}>You watched all current videos on your feed.</Text>
        </View>
    );
};

export default FeedFooter;