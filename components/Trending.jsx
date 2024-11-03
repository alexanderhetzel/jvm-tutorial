import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, ImageBackground, Image, useColorScheme} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {icons} from "../constants";
import {Video, ResizeMode} from "expo-av";
import {MotiView} from "moti";
import {Skeleton} from "moti/skeleton";

//Defining state for zooming in (expanding) trending card
const ZoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

//Defining state for zooming out (shrinking) trending card
const ZoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({activeItem, item}) => {

    //State for managing play-state
    const [play, setPlay] = useState(false);
    const [thumbnailLoaded, setThumbnailLoaded] = useState()

    const colorScheme = useColorScheme();

    return (
        <Animatable.View className={""} animation={activeItem === item.$id ? ZoomIn : ZoomOut} duration={500}>
            {play ? (
                <Video source={{uri : item.video}}
                       className={"w-52 h-72 rounded-3xl bg-white/10"}
                       resizeMode={ResizeMode.COVER}
                       shouldPlay useNativeControls
                       onPlaybackStatusUpdate={(status) => {
                           if (status.didJustFinish) setPlay(false);
                       }}
                />
            ) : (
                <TouchableOpacity className={"relative justify-center items-center"} activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <Image className={"w-52 h-72 rounded-3xl overflow-hidden shadow-lg shadow-black/40 bg-black-200"}
                                     source={{uri: item.thumbnail}}
                                     resizeMode={"cover"}
                           onLoadEnd={() => setThumbnailLoaded(true)}
                    />
                    <Image source={icons.play} className={"w-10 h-10 absolute"} resizeMode={"contain"}/>
                </TouchableOpacity>
            )}
            <MotiView className="absolute top-0 left-0">
                <Skeleton colorMode={colorScheme} show={!thumbnailLoaded} width={182} height={252} radius={20}/>
            </MotiView>
        </Animatable.View>
    )
}

const Trending = ({ posts }) => {

    //State for managing active (zoomed in) item
    const [activeItem, setActiveItem] = useState(posts[1])

    //Function for setting active item
    const viewableItemsChanged = ({viewableItems}) => {
        console.log(viewableItems + "\n");
        if(viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
        <FlatList data={posts}
                  keyExtractor={(item) => item.$id}
                  renderItem={({item}) => (
                      <TrendingItem activeItem={activeItem} item={item}/>
                  )}
                  onViewableItemsChanged={viewableItemsChanged}
                  viewabilityConfig={{itemVisiblePercentThreshold: 70}}
                  contentOffset={{x:140}}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  ListHeaderComponent={() =>(
                      <View className={"w-5 h-full"}/>
                  )}
                  ItemSeparatorComponent={() => (
                      <View className={"w-5"}/>
                  )}
                  ListFooterComponent={() =>(
                      <View className={"w-5 h-full"}/>
                  )}
        />
    );
};

export default Trending;