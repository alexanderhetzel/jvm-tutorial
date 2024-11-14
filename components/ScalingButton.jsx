import React, {useRef} from 'react';
import {Animated, TouchableOpacity} from 'react-native';

const ScalingButton = ({ onPress, className, children }) => {
    // Erstellen einer referenzierten animierten Wertvariable
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Funktion, die beim Drücken des Buttons aufgerufen wird
    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.50, // Skalierung auf 95%
            useNativeDriver: true,
        }).start();
    };

    // Funktion, die beim Loslassen des Buttons aufgerufen wird
    const onPressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1, // Zurück zur ursprünglichen Größe
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
            className={className}
            activeOpacity={1}
        >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

export default ScalingButton;