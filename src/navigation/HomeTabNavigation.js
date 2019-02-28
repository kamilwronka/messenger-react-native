import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';

import MessagesScreen from '../screens/MessagesScreen/MessagesScreen';
// import ActiveScreen from 'src/screens/ActiveScreen';
// import GroupsScreen from 'src/screens/GroupsScreen';
// import CallsScreen from 'src/screens/CallsScreen';

export const HomeTabNavigation = createMaterialTopTabNavigator(
  {
    MessagesScreen: {
      screen: MessagesScreen,
      navigationOptions: { header: null, title: 'Wiadomości' },
    },
    GroupsScreen: {
      screen: MessagesScreen,
      navigationOptions: { header: null, title: 'Grupy' },
    },
    CallsScreen: {
      screen: MessagesScreen,
      navigationOptions: { header: null, title: 'Połączenia' },
    },
  },
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: '#912F56',
      inactiveTintColor: 'grey',
      pressColor: '#912F56',
      labelStyle: {
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? 10 : 11,
      },
      indicatorStyle: {
        backgroundColor: '#912F56',
      },
      style: {
        backgroundColor: 'white',
      },
    },
  }
);
