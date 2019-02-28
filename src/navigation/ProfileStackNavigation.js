import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

export default createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: { header: null },
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: { header: null },
  },
});
