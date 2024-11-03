import React from 'react';
import { View, Text } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from "../context/GlobalProvider";

const CustomSafeAreaView = ({ children, className, ...props }) => {

    //Getting insets of useSafeArea
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{paddingTop: insets.top}}
            className={`bg-neutrallight-200 dark:bg-neutraldark-200 ${className}`} {...props}
        >
            {children}
        </View>
    );
};

export default CustomSafeAreaView;