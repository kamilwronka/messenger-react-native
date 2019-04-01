import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { View } from "react-native";

import CameraScreen from "../screens/CameraScreen/CameraScreen";
import ContactsScreen from "../screens/ContactsScreen/ContactsScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";

import TabBarIcon from "../components/TabBarIcon";
import MessagesScreen from "../screens/MessagesScreen/MessagesScreen";
import RelationsScreen from "../screens/RelationsScreen/RelationsScreen";

const HomeTabIcon = ({ focused }) => (
  <TabBarIcon name="forum" size={28} focused={focused} />
);
const PeopleTabIcon = ({ focused }) => (
  <TabBarIcon name="account-multiple" size={28} focused={focused} />
);
const CameraTabIcon = ({ focused }) => (
  <View
    style={{
      height: 64,
      width: 64,
      backgroundColor: "#5D2E46",
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <TabBarIcon
      name="camera"
      focused={focused}
      size={36}
      color="#ffffff"
      centered
    />
  </View>
);
const NotificationsTabIcon = ({ focused }) => (
  <TabBarIcon name="bell" size={28} focused={focused} />
);
const RelationsTabIcon = ({ focused }) => (
  <TabBarIcon name="library-plus" size={28} focused={focused} />
);

export const BottomTabNavigation = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: MessagesScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: HomeTabIcon
      }
    },

    PeopleScreen: {
      screen: ContactsScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: PeopleTabIcon
      }
    },
    CameraTabScreen: {
      screen: CameraScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
        tabBarIcon: CameraTabIcon,
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate("CameraScreen");
        }
      })
    },
    NotificationsScreen: {
      screen: NotificationsScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: NotificationsTabIcon
      }
    },
    RelationsScreen: {
      screen: RelationsScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: RelationsTabIcon
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#040D16",
        borderWidth: 0,
        height: 72,
        borderTopColor: "transparent",
        borderTopWidth: 0
      }
    }
  }
);
