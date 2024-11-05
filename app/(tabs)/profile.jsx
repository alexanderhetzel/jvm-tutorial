import {View, Text, FlatList, TouchableOpacity, Image, RefreshControl} from 'react-native'
import React, {useState} from 'react'
import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import useAppwrite from "../../lib/useAppwrite";
import {getUsersPosts, signOut} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import {icons} from "../../constants";
import {CustomSafeAreaView, VideoCard, EmptyState, CStatusBar, CText} from '../../components'
import {neutraldark, neutrallight} from "../../constants/colors";


const Profile = () => {

    //Global States
    const {user, setUser, setIsLoggedIn} = useGlobalContext();

    //State for managing refreshing
    const [refreshing, setRefreshing] = useState(false);

    //Data for user's posts
    const {data: posts, refetch} = useAppwrite(() => getUsersPosts(user.$id));

    const { colorScheme } = useGlobalContext();

    //Called when refresh is triggered
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    //Function for deleting session and logging user out
    const logOut = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);
        router.replace("/welcome");
    }

    return (
        <CustomSafeAreaView className="bg-primary h-full">
            <TouchableOpacity className={" rounded-xl pl-4 pr-3 mr-3 py-3 self-end"} onPress={() => logOut()}>
                <Image className={"w-6 h-6"} source={icons.logout} resizeMode={"contain"}/>
            </TouchableOpacity>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.$id}
                data={posts}
                ItemSeparatorComponent={() => <View className={"h-14"}/>}
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
                ListHeaderComponent={() => (

                    <View className="my-6 space-y-2 px-4 items-center justify-center">
                        <View className={"w-[56px] h-[56px] rounded-lg border border-secondary p-0.5"}>
                            <Image source={{uri: user?.avatar}} className={"w-full h-full rounded-md"} resizeMode={"cover"}/>
                        </View>
                        <CText className="text-lg font-psemibold mb-3">{user?.username}</CText>
                        <View className={"flex-row gap-5"}>
                            <View className={"items-center justify-center"}>
                                <CText className="text-[20px] font-psemibold">{posts.length}</CText>
                                <CText className="text-[14px] font-pregular">Posts</CText>
                            </View>
                            <View className={"items-center justify-center"}>
                                <CText className="text-[20px] font-psemibold">{posts.length}.0k</CText>
                                <CText className="text-[14px] font-pregular">Likes</CText>
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title={"No videos found"} subtitle={"No videos found for this search query"}/>
                )} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colorScheme === 'light' ? neutraldark : neutrallight} size={'large'} />}

            />
            <CStatusBar/>
        </CustomSafeAreaView>
    )
}

export default Profile
