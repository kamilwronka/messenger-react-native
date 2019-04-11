import React, { PureComponent, Fragment } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  Dimensions,
  Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "@/components/Input/MessageInput";

const CONTAINER_PADDING = 26;

class TextMessage extends PureComponent {
  state = {
    componentHeight: new Animated.Value(42 + CONTAINER_PADDING),
    inputContainerAnimation: new Animated.Value(0),
    showTypingIcon: false
  };

  componentDidMount() {
    this.setupListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  setupListeners = () => {
    this.onKeyboardShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.onKeyboardShow
    );
    this.onKeyboardDismissListener = Keyboard.addListener(
      "keyboardDidHide",
      this.onKeyboardDismiss
    );
  };

  removeListeners = () => {
    this.onKeyboardDismissListener && this.onKeyboardDismissListener.remove();
    this.onKeyboardShowListener && this.onKeyboardShowListener.remove();
  };

  onSizeChange = height => {
    this.state.componentHeight.setValue(height + CONTAINER_PADDING);
  };

  onKeyboardShow = () => {
    Animated.timing(this.state.inputContainerAnimation, {
      toValue: 1,
      duration: 150
    }).start();
    this.setState({ showTypingIcon: true });
  };

  onKeyboardDismiss = () => {
    Animated.timing(this.state.inputContainerAnimation, {
      toValue: 0,
      duration: 150
    }).start();
    this.setState({ showTypingIcon: false });
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
      toggleCameraRollTab,
      onInputFocus
    } = this.props;

    const containerStyles = {
      height: this.state.componentHeight
    };

    const inputContainerStyles = {
      position: "absolute",
      bottom: 8,
      left: this.state.inputContainerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [86, 0]
      }),
      right: 48
    };

    return (
      <Animated.View
        style={[
          {
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 13,
            paddingTop: 13,
            width: "100%"
          },
          containerStyles
        ]}
      >
        <View style={{ bottom: 12, position: "absolute", left: 10 }}>
          <TouchableWithoutFeedback onPress={goToCamera}>
            <Icon name="camera" size={32} color={inputColor} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ bottom: 12, position: "absolute", left: 54 }}>
          <TouchableWithoutFeedback onPress={toggleCameraRollTab}>
            <Icon name="image" size={32} color={inputColor} />
          </TouchableWithoutFeedback>
        </View>
        <Animated.View style={[{ marginHorizontal: 10 }, inputContainerStyles]}>
          <Input
            placeholder="Wiadomość..."
            value={messageInput}
            onChangeText={handleChangeInput}
            inputColor={inputColor}
            onFocus={onInputFocus}
            onBlur={this.onInputBlur}
            onSizeChange={this.onSizeChange}
            showTypingIcon={this.state.showTypingIcon}
          />
        </Animated.View>
        <View style={{ right: 10, bottom: 12, position: "absolute" }}>
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
      </Animated.View>
    );
  }
}

export default TextMessage;
