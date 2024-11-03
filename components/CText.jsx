import React from 'react';
import { Text } from 'react-native';
import {useGlobalContext} from "../context/GlobalProvider";

const CText = ({ children, className, ...props }) => {
    return (
        <Text className={`text-neutraldark-200 dark:text-neutrallight-200 ${className}`} {...props}>
            {children}
        </Text>
    );
};

export default CText;