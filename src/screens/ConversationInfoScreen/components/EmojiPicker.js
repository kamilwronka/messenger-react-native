import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import ReactEmojiPicker from 'react-native-emoji-selector';

class EmojiPicker extends PureComponent {
  render() {
    return (
      <View style={{ flex: 2 }}>
        <ReactEmojiPicker />
      </View>
    );
  }
}

export default EmojiPicker;
