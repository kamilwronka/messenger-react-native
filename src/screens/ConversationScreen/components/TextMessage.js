import React, { PureComponent, Fragment } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "@/components/Input/MessageInput";

class TextMessage extends PureComponent {
  render() {
    const {
      goToCamera,
      messageInput,
      handleChangeInput,
      inputColor,
      handleEmojiSend,
      handleSubmit,
      emoji,
      toggleCameraRollTab,
      onInputFocus
    } = this.props;

    return (
      <View
        style={{
          flexDirection: "row",
          height: 68,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <TouchableWithoutFeedback onPress={goToCamera}>
            <Icon name="camera" size={28} color={inputColor} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ marginLeft: 10 }}>
          <TouchableWithoutFeedback onPress={toggleCameraRollTab}>
            <Icon name="image" size={28} color={inputColor} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1, flexGrow: 1, marginHorizontal: 10 }}>
          <Input
            placeholder="Wiadomość..."
            value={messageInput}
            onChangeText={handleChangeInput}
            inputColor={inputColor}
            onFocus={onInputFocus}
          />
        </View>
        <View style={{ marginRight: 10 }}>
          {messageInput.length < 1 ? (
            <TouchableWithoutFeedback onPress={handleEmojiSend}>
              <View>
                <Text style={{ fontSize: 28 }}>{emoji}</Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={handleSubmit}>
              <Icon name="send" size={28} color={inputColor} />
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    );
  }
}

export default TextMessage;
