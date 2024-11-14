import {View, Text, ScrollView, useColorScheme, FlatList} from 'react-native'
import React, {useMemo, useRef, useCallback} from 'react'
import {CText, CustomButton, CustomSafeAreaView, CView} from "../../components";
import BottomSheet, {BottomSheetBackdrop, BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {black, gray, neutraldark, neutrallight, placeholdergray} from "../../constants/colors";
import {starterfunction, testfunctions} from "../../lib/appwrite";

const Bookmark = () => {

    const bottomSheetRef = useRef(null);

    const handleOpenPress = () => bottomSheetRef.current?.present();

    const colorScheme = useColorScheme();

    // snappoints of bottomsheet
    const snapPoints = useMemo(() => ["50%"], []);

    // renders backdrop of bottomsheet
    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );

    const data = Array.from({ length: 100 }, (_, index) => index + 1);

    return (
        <CustomSafeAreaView className={"flex-1 bg-primary"}>
            <ScrollView className={"py-6 px-4"}>
                <CustomButton title={"Open BottomsheetModal"} handlePress={handleOpenPress}/>
                <CustomButton handlePress={async () => {
                    console.log(await testfunctions())
                }}/>
                <CText>Bookmark</CText>
            </ScrollView>
            <BottomSheetModal snapPoints={snapPoints} index={1}
                ref={bottomSheetRef}
                backgroundStyle={colorScheme === 'light' ? {backgroundColor: neutrallight["200"]} : {backgroundColor: neutraldark["200"]}}
                handleIndicatorStyle={colorScheme === 'light' ? {backgroundColor: neutraldark["900"]} : {backgroundColor: neutrallight["900"]}}
                backdropComponent={renderBackdrop}
                enablePanDownToClose
            >
                <BottomSheetView className={"flex flex-col"}>
                    <CustomButton title={"Save to bookmarks"} containerStyles={"mx-3 mt-4 mb-6"} onClick={handleOpenPress}/>
                </BottomSheetView>
            </BottomSheetModal>
        </CustomSafeAreaView>
    )
}

export default Bookmark