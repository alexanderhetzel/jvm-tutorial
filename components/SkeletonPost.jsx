import React from 'react';
import {View, Text} from 'react-native';
import {MotiView} from "moti";
import {Skeleton} from "moti/skeleton";
import {useGlobalContext} from "../context/GlobalProvider";

const SkeletonPost = () => {

    const {colorScheme} = useGlobalContext();

    return (
        <MotiView transition={{
            type: 'timing',
        }}
                  className={"gap-3"}
        >
            <MotiView className="flex-row gap-3 items-center">
                <Skeleton width={46} height={46} radius={5.25}/>
                <MotiView className="gap-2">
                    <Skeleton colorMode={colorScheme} width={200} height={17.5} radius={5.25}/>
                    <Skeleton colorMode={colorScheme} width={50} height={17.5} radius={5.25}/>
                </MotiView>
            </MotiView>
            <Skeleton width={"100%"} height={210} radius={5.25}/>
        </MotiView>
    );
};

export default SkeletonPost;