import React, { PureComponent } from "react";
import { TextInput, StyleSheet, Animated, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Input extends PureComponent {
  state = {
    opacity: new Animated.Value(0)
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={styles.icon}>
          <Icon name={this.props.iconName} size={24} color="#912F56" />
        </Animated.View>
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
          selectionColor="#912F56"
          style={styles.input}
          placeholderTextColor="#bbbbbb"
          {...this.props}
        />
      </View>
    );
  }
}

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: "transparent",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 2,
    // borderColor: "#912F56"
    borderColor: "#dddddd"
  },
  input: {
    height: 48,
    color: "#000000",
    marginLeft: 20,
    flex: 1,
    fontSize: 16
  },
  icon: {
    left: 10
  }
});
