import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { View } from 'react-native';

// import { HomeTabNavigation } from './HomeTabNavigation';
import CameraScreen from '../screens/CameraScreen/CameraScreen';
import ContactsScreen from '../screens/ContactsScreen/ContactsScreen';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import ProfileStack from './ProfileStackNavigation';
// import GamesScreen from 'src/screens/GamesScreen';
// import PopularScreen from 'src/screens/PopularScreen';

// import TabIcon from 'src/components/TabIcon';
// import AppStyles from 'src/config/styles';
import TabBarIcon from '../components/TabBarIcon';
import MessagesScreen from '../screens/MessagesScreen/MessagesScreen';

const HomeTabIcon = ({ focused }) => <TabBarIcon name="home" size={28} focused={focused} />;
const PeopleTabIcon = ({ focused }) => <TabBarIcon name="account-multiple" size={28} focused={focused} />;
const CameraTabIcon = ({ focused }) => (
  <View
    style={{
      height: 64,
      width: 64,
      backgroundColor: '#eeeeee',
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <TabBarIcon name="camera" focused={focused} size={36} color="#000000" centered />
  </View>
);
const NotificationsTabIcon = ({ focused }) => (
  <TabBarIcon name="bell" size={28} focused={focused} />
);
const ProfileTabIcon = ({ focused }) => <TabBarIcon name="account" size={28} focused={focused} />;

export const BottomTabNavigation = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: MessagesScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: HomeTabIcon,
      },
    },

    PeopleScreen: {
      screen: ContactsScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: PeopleTabIcon,
      },
    },
    CameraTabScreen: {
      screen: CameraScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
        tabBarIcon: CameraTabIcon,
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate('CameraScreen');
        },
      }),
    },
    NotificationsScreen: {
      screen: NotificationsScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: NotificationsTabIcon,
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ProfileTabIcon,
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#FFFFFF',
        borderWidth: 0,
        height: 72,
        borderTopColor: '#ffffff',
        borderTopWidth: 0,
      },
    },
  }
);
