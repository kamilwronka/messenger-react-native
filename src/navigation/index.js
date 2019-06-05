import { createStackNavigator, createAppContainer } from "react-navigation";
import CameraScreen from "../screens/CameraScreen/CameraScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen.component";
import PhotoScreen from "../screens/PhotoScreen/PhotoScreen";

import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import AuthLoadingScreen from "../screens/AuthScreen/AuthLoadingScreen";

import ConversationScreen from "../screens/ConversationScreen/ConversationScreen";

import { BottomTabNavigation } from "./BottomTabNavigation";
import ConversationInfoScreen from "../screens/ConversationInfoScreen/ConversationInfoScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import GalleryScreen from "../screens/GalleryScreen/GalleryScreen";

const SearchStack = createStackNavigator(
  {
    BottomTabNavigation: {
      screen: BottomTabNavigation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: { gesturesEnabled: false }
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const ConversationStack = createStackNavigator(
  {
    ConversationScreen: {
      screen: ConversationScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    ConversationInfoScreen: {
      screen: ConversationInfoScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const ModalStack = createStackNavigator(
  {
    SearchStack: {
      screen: SearchStack,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    }
  },
  {
    mode: "modal"
  }
);

const MessengerApp = createStackNavigator({
  AuthLoadingScreen: {
    screen: AuthLoadingScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  },
  LoginScreen: {
    screen: LoginScreen
  },
  SignUpScreen: {
    screen: SignUpScreen
  },
  MainScreen: {
    screen: ModalStack,
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  },
  ConversationStack: {
    screen: ConversationStack,
    navigationOptions: { header: null }
  },
  CameraScreen: {
    screen: CameraScreen,
    navigationOptions: { header: null }
  },
  PhotoScreen: {
    screen: PhotoScreen,
    navigationOptions: { header: null }
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: { header: null }
  },
  GalleryScreen: {
    screen: GalleryScreen,
    navigationOptions: { header: null }
  }
});

export default createAppContainer(MessengerApp);
