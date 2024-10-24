import {View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import {icons, images} from '../constants'
import {usePathname, router} from "expo-router";

const SearchInput = ({otherStyles, initialQuery}) => {

    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery || '')
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <View className="flex-row w-full h-16 px-4 bg-black-100 rounded-2xl border-[1px] border-borderblue focus:border-gray-400 items-center space-x-3">
                <TextInput
                    className="flex-1 h-full text-white font-pregular text-base"
                    value={query}
                    placeholder='Search for a video topic...'
                    placeholderTextColor='#CDCDE0'
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