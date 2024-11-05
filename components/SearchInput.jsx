import {View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import {icons, images} from '../constants'
import {usePathname, router} from "expo-router";
import {neutraldark, neutrallight} from "../constants/colors";
import {useGlobalContext} from "../context/GlobalProvider";

const SearchInput = ({otherStyles, initialQuery}) => {

    //State for declaring path-name
    const pathName = usePathname();

    //Setting search query to inital one if exists, otherwise ''
    const [query, setQuery] = useState(initialQuery || '')

    const { colorScheme } = useGlobalContext()

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <View className="bg-neutrallight-400 dark:bg-neutraldark-300 border-neutrallight-600 dark:border-neutraldark-600 flex-row w-full h-16 px-4 rounded-2xl border-[1px] focus:border-gray-400 items-center space-x-3">
                <TextInput
                    className="flex-1 text-neutraldark-200 dark:text-neutrallight-200 h-full font-pregular text-base"
                    value={query}
                    placeholder='Search for a video topic...'
                    placeholderTextColor={colorScheme === 'light' ? neutraldark["900"] : neutrallight["900"]}
                    onChangeText={(e) => setQuery(e)}
                />
                <TouchableOpacity onPress={() => {
                    if(!query) {
                        return Alert.alert('Missing query', 'Please input something to search across database')
                    }

                    if(pathName.startsWith('/search')) router.setParams({query})
                    else router.push(`/search/${query}`)
                }}>
                    <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchInput