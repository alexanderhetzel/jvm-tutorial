import { Stack, SplashScreen } from 'expo-router';
import GlobalProvider, {useGlobalContext} from '../context/GlobalProvider';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import '../global.css';
import {cssInterop} from "nativewind";
import {Video} from 'expo-av'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {MotiView} from "moti";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";

//Prevent auto hide of splash screen
SplashScreen.preventAutoHideAsync();

//Needed for styling external and native components
cssInterop(SafeAreaView, { className: "style" });
cssInterop(Video, { className: "style" });
cssInterop(MotiView, { className: "style" });


/*
const RootLayout = () => {

    return (
      <GestureHandlerRootView className={"flex"}>
          <SafeAreaProvider>
              <GlobalProvider>
                  <Stack initialRouteName={"(tabs)"}>
                      <Stack.Screen name="index" options={{ headerShown: false }} />
                      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
                  </Stack>
              </GlobalProvider>
          </SafeAreaProvider>
      </GestureHandlerRootView>


  );
};

 */

//Root Layout and AppStack are separated because AppStack
//immediatelly needs global states of GlobalProvider
const RootLayout = () => {
    return (
        //Handles gestures for i.e. Gorhom's Bottom Sheet
        <GestureHandlerRootView className={'flex bg-primary'}>
            <BottomSheetModalProvider>
                {/*Handles safe area properties*/}
                <SafeAreaProvider>
                    {/*Handles global states like isLoggedIn or isLoading*/}
                    <GlobalProvider>
                        <AppStack/>
                    </GlobalProvider>
                </SafeAreaProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const AppStack = () => {

    const { isLoading, isLoggedIn } = useGlobalContext();

    //Set initial route to (tabs) when session exists
    if (isLoggedIn && !isLoading) {
        return(
            <Stack initialRouteName="(tabs)" screenOptions={ {headerShown: false} }>
                <Stack.Screen name="index" options={{ headerShown: false }} redirect/>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
            </Stack>
        )
    }

    //Set initial route to (tabs) when user is not logged in
    if (!isLoggedIn && !isLoading) {
        return(
            <Stack initialRouteName="(auth)" screenOptions={ {headerShown: false} }>
                <Stack.Screen name="index" options={{ headerShown: false }} redirect />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
            </Stack>
        )
    }
};

export default RootLayout;

