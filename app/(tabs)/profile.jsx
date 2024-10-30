import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import useAppwrite from "../../lib/useAppwrite";
import {getUsersPosts, signOut} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import {icons} from "../../constants";
import {CustomSafeAreaView, VideoCard, EmptyState} from '../../components'


const Profile = () => {

    //Global States
    const {user, setUser, setIsLoggedIn} = useGlobalContext();

    //Data for user's posts
    const {data: posts} = useAppwrite(() => getUsersPosts(user.$id));

    //Function for deleting session and logging user out
    const logOut = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);
        router.replace("/welcome");
    }

    return (
        <CustomSafeAreaView className="bg-primary h-full">
            <TouchableOpacity className={"px-3 mr-3 py-3 self-end"} onPress={() => logOut()}>
                <Image className={"w-6 h-6"} source={icons.logout} resizeMode={"contain"}/>
            </TouchableOpacity>
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
                ListHeaderComponent={() => (

                    <View className="my-6 space-y-2 px-4 items-center justify-center">
                        <View className={"w-[56px] h-[56px] rounded-lg border border-secondary p-0.5"}>
                            <Image source={{uri: user?.avatar}} className={"w-full h-full rounded-md"} resizeMode={"cover"}/>
                        </View>
                        <Text className="text-lg font-psemibold text-white mb-3">{user?.username}</Text>
                        <View className={"flex-row space-x-8"}>
                            <View className={"items-center justify-center"}>
                                <Text className="text-[20px] font-psemibold text-white">{posts.length}</Text>
                                <Text className="text-[14px] font-pregular text-white">Posts</Text>
                            </View>
                            <View className={"items-center justify-center"}>
                                <Text className="text-[20px] font-psemibold text-white">{posts.length}.0k</Text>
                                <Text className="text-[14px] font-pregular text-white">Posts</Text>
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title={"No videos found"} subtitle={"No videos found for this search query"}/>
                )}
            />
            <StatusBar backgroundColor='#161622' style='light'/>
        </CustomSafeAreaView>
    )
}

export default Profile
