import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  prepareIconColor = () => {
    const { color, focused } = this.props;
    if (color) {
      return color;
    } else if (focused) {
      return Colors.tabIconSelected;
    } else {
      return Colors.tabIconDefault;
    }
  };

  render() {
    const { size, name } = this.props;

    return (
      <Icon name={name} size={size} color={this.prepareIconColor()} />
    );
  }
}
