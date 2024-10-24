import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, ImageBackground, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {icons} from "../constants";
import {Video, ResizeMode} from "expo-av";
const ZoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const ZoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({activeItem, item}) => {
    const [play, setPlay] = useState(false);
    return (
        <Animatable.View className={"mr-5"} animation={activeItem === item.$id ? ZoomIn : ZoomOut} duration={500}>
            {play===true ? (
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
                    <ImageBackground className={"w-52 h-72 rounded-3xl overflow-hidden shadow-lg shadow-black/40"}
                                     source={{uri: item.thumbnail}}
                                     resizeMode={"cover"}
                    />
                    <Image source={icons.play} className={"w-10 h-10 absolute"} resizeMode={"contain"}/>
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[1])

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
        />
    );
};

export default Trending;