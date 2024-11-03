import React from 'react';
import {StatusBar} from "expo-status-bar";
import {useColorScheme} from "react-native";

const CStatusBar = () => {

    const colorScheme = useColorScheme();

    return (
        <StatusBar backgroundColor='#000000' style={colorScheme === 'light' ? 'dark' : 'light'}/>
    );
};

export default CStatusBar;