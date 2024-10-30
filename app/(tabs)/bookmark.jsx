import {View, Text, ScrollView} from 'react-native'
import React, {useMemo, useRef} from 'react'
import {CustomButton, CustomSafeAreaView} from "../../components";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import {black, gray, placeholdergray} from "../../constants/colors";

const Bookmark = () => {

    const bottomSheetRef = useRef(null);

    const handleOpenPress = () => bottomSheetRef.current?.expand();

    return (
        <CustomSafeAreaView classname={"h-full bg-primary"}>
            <ScrollView className={"py-6 px-4"}>
                <CustomButton title={"Open Bottomsheet"} handlePress={handleOpenPress}/>
                <Text>Bookmark</Text>
            </ScrollView>
            <BottomSheet
                ref={bottomSheetRef}
                backgroundStyle={{backgroundColor: black[100]}}
                handleIndicatorStyle={{backgroundColor: gray[100]}}
                enablePanDownToClose
            >
                <BottomSheetView className={"flex flex-col"}>
                    <CustomButton title={"Save to bookmarks"} containerStyles={"mx-3 mt-4 mb-6"} onClick={handleOpenPress}/>
                </BottomSheetView>
            </BottomSheet>
        </CustomSafeAreaView>
    )
}

export default Bookmark