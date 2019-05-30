import React, { PureComponent, Fragment } from "react";
import { Text, TouchableWithoutFeedback, View, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "@/components/Input/MessageInput";

class TextMessage extends PureComponent {
  state = {
    inputAnimation: new Animated.Value(0)
  };

  onFocus = () => {
    this.resizeInputContainer();
  };

  onBlur = () => {
    Animated.spring(this.state.inputAnimation, {
      toValue: 0
    }).start();
  };

  resizeInputContainer = () => {
    Animated.spring(this.state.inputAnimation, {
      toValue: 1
    }).start();
  };

  render() {
    const {
      goToCamera,
      messageInput,
      handleChangeInput,
      inputColor,
      handleEmojiSend,
      handleSubmit,
      emoji,
      toggleCameraRollTab
    } = this.props;

    const inputContainerStyles = {
      left: this.state.inputAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [90, 10]
      }),
      right: 50,
      position: "absolute",
      flex: 1,
      flexGrow: 1
    };

    return (
      <View
        style={{
          flexDirection: "row",
          height: 68,
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <View style={{ position: "absolute", left: 10 }}>
          <TouchableWithoutFeedback onPress={goToCamera}>
            <Icon name="camera" size={28} color={inputColor} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ position: "absolute", left: 50 }}>
          <TouchableWithoutFeedback onPress={toggleCameraRollTab}>
            <Icon name="image" size={28} color={inputColor} />
          </TouchableWithoutFeedback>
        </View>
        <Animated.View style={inputContainerStyles}>
          <Input
            placeholder="Wiadomość..."
            value={messageInput}
            onChangeText={handleChangeInput}
            inputColor={inputColor}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            multiline={true}
          />
        </Animated.View>
        <View style={{ position: "absolute", right: 10 }}>
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
