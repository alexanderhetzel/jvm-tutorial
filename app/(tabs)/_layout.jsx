import { View, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {icons} from '../../constants'
import {useGlobalContext} from "../../context/GlobalProvider";
import {neutraldark, neutrallight} from "../../constants/colors";

const TabIcon = ({icon, color, name, focused}) => {
  return(
    <View>
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-5 h-5" class/>
    </View>
  )
}

const TabsLayout = () => {

    const { colorScheme } = useGlobalContext()

  return (
    <>
    <Tabs
      screenOptions= {{
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: colorScheme ==="light" ? neutraldark["900"] : neutrallight["900"],
        tabBarStyle: {
          backgroundColor: colorScheme ==="light" ? neutrallight["300"] : neutraldark["300"],
          borderTopWidth: 1,
          borderTopColor: colorScheme ==="light" ? neutrallight["500"] : neutraldark["500"],
          height: 84
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Bookmark"
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Create"
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          )
        }}
      />

    </Tabs>
    </>
  )
}

export default TabsLayout