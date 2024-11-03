import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite';
import { useFonts } from 'expo-font';
import {useColorScheme} from "react-native";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    //Global State for managing logged-in state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Global State for managing user-state
    const [user, setUser] = useState(null);

    //Global State for managing loading state
    const [isLoading, setIsLoading] = useState(true); // Steuert das Laden der App (Auth + Fonts)

    //Global state for managing current theme of device (light mode / dark mode)
    const colorScheme = useColorScheme();

    //Loading fonts
    const [fontsLoaded] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    //Checking if user is logged in and fonts have loaded
    useEffect( () => {
        const checkUserAndFonts =  async () => {
            try {
                // Authentifizierungsstatus abfragen
                const res = await getCurrentUser();
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }

            } catch (error) {
                console.log('Error fetching user:', error);
            } finally {
                // Überprüfe, ob Schriftarten geladen wurden
                if (fontsLoaded) {
                    // Beide sind nun fertig (Auth und Fonts)
                    setIsLoading(false);
                }
            }
        };

        checkUserAndFonts();
    }, [fontsLoaded]); // Wird erneut ausgeführt, wenn Schriftarten geladen sind

    return (
        <GlobalContext.Provider 
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                colorScheme
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
