import {View, Text, FlatList, Image, RefreshControl} from 'react-native'
import React, {useState} from 'react'
import {getAllPosts, getLatestPosts, signOut} from '../../lib/appwrite'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../../context/GlobalProvider'
import useAppwrite from "../../lib/useAppwrite";
import {icons, images} from "../../constants";
import {CustomSafeAreaView, VideoCard, EmptyState, SearchInput, Trending} from '../../components'
import FeedFooter from "../../components/FeedFooter";


const Home = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false);
    const {data: posts, refetch} = useAppwrite(getAllPosts);
    const {data: latestposts} = useAppwrite(getLatestPosts);


    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <CustomSafeAreaView className={"bg-primary h-full"}>
            <FlatList
                keyExtractor={(item) => item.$id}
                data={posts}
                ItemSeparatorComponent={() => <View className={"h-14"}/>}
                renderItem={({item}) => (
                    <VideoCard
                        title={item.title}
                        thumbnail={item.thumbnail}
                        video={item.video}
                        creator={item.creator.username}
                        avatar={item.creator.avatar}
                    />
                )}
                ListFooterComponent={() => (
                    <FeedFooter/>
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 space-y-6">
                        <View className="px-4 justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                                <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
                            </View>
                            <View className="mt-1.5">
                                <Image source={images.logoSmall} className="w-9 h-10" resizeMode={"contain"}/>
                            </View>
                        </View>
                        <SearchInput otherStyles={"px-4"}/>
                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="px-4 text-gray-100 text-lg font-pregular mb-3">Latest videos</Text>
                            <Trending posts={latestposts}/>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title={"No videos found"} subtitle={"Be the first one to upload a video!"}/>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'white'} size={'large'} />}
            />
            <StatusBar backgroundColor='#161622' style='light'/>
        </CustomSafeAreaView>
    )
}

export default Home