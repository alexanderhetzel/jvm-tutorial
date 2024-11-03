import React from 'react';
import { View } from 'react-native';
import {useGlobalContext} from "../context/GlobalProvider";

const CView = ({ children, className, ...props }) => {
    return (
        <View className={`bg-neutrallight-200 dark:bg-neutraldark-200 ${className}`} {...props}>
            {children}
        </View>
    );
};

export default CView;