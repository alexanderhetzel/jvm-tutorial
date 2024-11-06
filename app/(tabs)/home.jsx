import {View, Text, FlatList, Image, RefreshControl} from 'react-native'
import React, {useState, useEffect} from 'react'
import {getAllPosts, getLatestPosts} from '../../lib/appwrite'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../../context/GlobalProvider'
import useAppwrite from "../../lib/useAppwrite";
import {images} from "../../constants";
import {
    CustomSafeAreaView,
    VideoCard,
    EmptyState,
    SearchInput,
    Trending,
    CView,
    CText,
    CStatusBar
} from '../../components'
import FeedFooter from "../../components/FeedFooter";
import {SplashScreen} from "expo-router";
import {colorScheme} from "nativewind";
import {neutraldark, neutrallight} from "../../constants/colors";
import {FlashList} from "@shopify/flash-list";

const Home = () => {

    //Global States
    const { user, isLoggedIn, isLoading, colorScheme } = useGlobalContext();

    const [refreshing, setRefreshing] = useState(false);

    //Data for feed posts
    const { data: posts, refetch, fetchMore, hasMore } = useAppwrite(getAllPosts);

    //Data for trending posts
    const {data: latestposts} = useAppwrite(getLatestPosts);

    //Called when refresh is triggered
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    //Hide the splash-screen when user IS logged in and isLoading is false
    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);

    return (
        <CustomSafeAreaView className={"h-full"}>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.$id}
                data={posts}
                //ItemSeparatorComponent={() => <View className={"h-8"}/>}
                renderItem={({item}) => (
                    <VideoCard
                        docId={item.$id}
                        title={item.title}
                        thumbnail={item.thumbnail}
                        video={item.video}
                        creator={item.creator.username}
                        avatar={item.creator.avatar}
                        likes={item.likes}
                        userId={user?.$id}
                    />
                )}
                /*
                ListFooterComponent={() => (
                    <FeedFooter/>
                )}
                 */
                /*ListHeaderComponent={() => (
                    <View className="my-6 space-y-6">
                        <View className="px-4 justify-between items-start flex-row mb-6">
                            <View>
                                <CText className="font-pmedium text-sm">Welcome Back</CText>
                                <CText className="text-2xl font-psemibold">{user?.username}</CText>
                            </View>
                            <View className="mt-1.5">
                                <Image source={images.logoSmall} className="w-9 h-10" resizeMode={"contain"}/>
                            </View>
                        </View>
                        <SearchInput otherStyles={"px-4"}/>
                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-neutraldark-900 dark:text-neutrallight-900 px-4 text-lg font-pregular mb-3">Latest videos</Text>
                            <Trending posts={latestposts}/>
                        </View>
                    </View>
                )}
                 */
                /*ListEmptyComponent={() => (
                    <EmptyState title={"No videos found"} subtitle={"Be the first one to upload a video!"}/>
                )}
                 */
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colorScheme === "light" ? neutraldark : neutrallight} size={'large'} />}
                onEndReached={() => {
                    if (hasMore) fetchMore(); // Laden weiterer Posts beim Erreichen des Endes
                }}
                onEndReachedThreshold={0.5}
                //onEndReachedThreshold={1.5} // Schwellenwert: Bei 50 % vor dem Ende wird `fetchMore` aufgerufen
            />
            <CStatusBar/>
        </CustomSafeAreaView>
    )
}

export default Home