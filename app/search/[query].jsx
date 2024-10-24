import {View, Text, FlatList} from 'react-native'
import React, {useEffect} from 'react'
import {useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import VideoCard from "../../components/videoCard";
import SearchInput from "../../components/searchInput";
import EmptyState from "../../components/emptyState";
import {StatusBar} from "expo-status-bar";
import useAppwrite from "../../lib/useAppwrite";
import {searchPosts} from "../../lib/appwrite";

const Search = () => {
    const {query} = useLocalSearchParams();
    const {data: posts, refetch} = useAppwrite(() => searchPosts(query));

    useEffect(() => {
        refetch()
    }, [query]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                keyExtractor={(item) => item.$id}
                data={posts}
                renderItem={({item}) => (
                    <VideoCard video={item}/>
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4">
                        <Text className="font-pmedium text-sm text-gray-100">Search results</Text>
                        <Text className="text-2xl font-psemibold text-white">{query}</Text>
                        <View className="mt-6 mb-8">
                            <SearchInput initialQuery={query}/>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title={"No videos found"} subtitle={"No videos found for this search query"}/>
                )}
            />
            <StatusBar backgroundColor='#161622' style='light'/>
        </SafeAreaView>
    )
}

export default Search