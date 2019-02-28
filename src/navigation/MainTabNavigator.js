import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ConversationScreen from "../screens/HomeScreen/ConversationScreen";
import ConversationInfoScreen from "../screens/HomeScreen/ConversationInfoScreen";
import ContactsScreen from "../screens/ContactsScreen/ContactsScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen.component";
import CameraScreen from "../screens/HomeScreen/CameraScreen";
import PhotoScreen from "../screens/HomeScreen/PhotoScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Conversation: ConversationScreen,
  ConversationInfo: ConversationInfoScreen,
  CameraScreen,
  PhotoScreen
});

HomeStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  return {
    tabBarVisible: routeName === "Home",
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-mail" />
  };
};

const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
  Search: SearchScreen
});

ContactsStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  return {
    tabBarVisible: routeName === "Contacts",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === "ios"
            ? `ios-people${focused ? "" : "-outline"}`
            : "md-people"
        }
      />
    )
  };
};

const NotificationsStack = createStackNavigator({
  Notifications: NotificationsScreen
});

NotificationsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-notifications${focused ? "" : "-outline"}`
          : "md-notifications"
      }
    />
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Settings: SettingsScreen
});

ProfileStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  return {
    tabBarVisible: routeName !== "Settings",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === "ios"
            ? `ios-person${focused ? "" : "-outline"}`
            : "md-person"
        }
      />
    )
  };
};

export default createBottomTabNavigator(
  {
    HomeStack,
    ContactsStack,
    NotificationsStack,
    ProfileStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#912F56",
        borderWidth: 0,
        height: 48
      }
    }
  }
);
