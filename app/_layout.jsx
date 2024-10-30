import { Stack, SplashScreen } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import '../global.css';
import {cssInterop} from "nativewind";
import {Video} from 'expo-av'
import {GestureHandlerRootView} from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

//Needed for styling external and native components
cssInterop(SafeAreaView, { className: "style" });
cssInterop(Video, { className: "style" });

const RootLayout = () => {
  return (
      <GestureHandlerRootView className={"flex"}>
          <SafeAreaProvider>
              <GlobalProvider>
                  <Stack>
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

export default RootLayout;
