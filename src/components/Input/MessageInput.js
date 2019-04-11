import React, { PureComponent } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { emitter, EMITTER_EVENTS } from "@/helpers/emitter";

const DESIRED_HEIGHT_OFFSET = 10;
const INITIAL_INPUT_HEIGHT = 42;

class Input extends PureComponent {
  state = {
    height: 42,
    typingIcon: new Animated.Value(0)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.showTypingIcon !== this.props.showTypingIcon) {
      if (this.props.showTypingIcon) {
        Animated.timing(this.state.typingIcon, {
          toValue: 1,
          duration: 100
        }).start();
      } else {
        Animated.timing(this.state.typingIcon, {
          toValue: 0,
          duration: 100
        }).start();
      }
    }
  }

  updateSize = height => {
    let desiredHeight = parseInt(height, 10);

    if (desiredHeight - DESIRED_HEIGHT_OFFSET <= INITIAL_INPUT_HEIGHT) {
      desiredHeight = INITIAL_INPUT_HEIGHT;
    }

    this.setState({ height: desiredHeight });
    this.props.onSizeChange(desiredHeight);
    emitter.emit(EMITTER_EVENTS.MESSAGE_INPUT_RESIZE);
  };

  render() {
    const desiredColor = this.props.inputColor
      ? this.props.inputColor
      : "#912F56";

    const additionalInputStyles = {
      height: this.state.height
    };

    const typingIconStyles = {
      opacity: this.state.typingIcon.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.icon, typingIconStyles]}>
          <Icon name="chevron-right" size={24} color={desiredColor} />
        </Animated.View>
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
          selectionColor={desiredColor}
          style={[styles.input, additionalInputStyles]}
          placeholderTextColor="#bbbbbb"
          multiline
          onContentSizeChange={e =>
            this.updateSize(e.nativeEvent.contentSize.height)
          }
          {...this.props}
        />
        <TouchableOpacity
          style={styles.iconRight}
          onPress={this.props.handleIconPress}
        >
          <Icon name="emoticon-outline" size={24} color="#bbbbbb" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Input;

const styles = StyleSheet.create({
  container: {
    // borderColor: '#cccccc',
    // borderWidth: 1,
    // height: 36,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 18
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000000"
  },
  icon: {
    left: 2
  },
  iconRight: {
    right: 10
  }
});
