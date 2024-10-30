import React from 'react';
import { View, Text } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const CustomSafeAreaView = ({ children, classname, ...props }) => {

    //Getting insets of useSafeArea
    const insets = useSafeAreaInsets();
    return (
        <View
            style={{paddingTop: insets.top}}
            className={classname}
            {...props}
        >
            {children}
        </View>
    );
};

export default CustomSafeAreaView;