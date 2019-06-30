import React, { PureComponent } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";

class Switch extends PureComponent {
  state = {
    switchAnimation: new Animated.Value(this.props.value ? 1 : 0)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      if (this.props.value) {
        this.animate(1);
      } else {
        this.animate(0);
      }
    }
  }

  animate = value => {
    Animated.timing(this.state.switchAnimation, {
      toValue: value,
      duration: 200
    }).start();
  };

  render() {
    const { switchAnimation } = this.state;

    const indicatorStyles = {
      left: switchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-4, 24]
      }),
      height: switchAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [28, 20, 28]
      }),
      width: switchAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [28, 20, 28]
      }),
      top: switchAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-4, 0, -4]
      })
    };

    const containerStyles = {
      backgroundColor: switchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(0,0,0,1)", "rgba(98, 107, 114, 1)"]
      }),
      borderColor: switchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(60, 60, 60, 1)", "rgba(187, 187, 187, 1)"]
      })
    };

    const indicatorValueStyles = {
      width: switchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 2]
      }),
      borderColor: switchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(187, 187, 187, 1)", "rgba(69, 105, 144, 1)"]
      })
    };

    return (
      <TouchableWithoutFeedback onPress={this.props.onChange}>
        <Animated.View style={[styles.container, containerStyles]}>
          <Animated.View style={[styles.indicator, indicatorStyles]}>
            <Animated.View
              style={[styles.indicatorValue, indicatorValueStyles]}
            />
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#626B72",
    height: 36,
    width: 64,
    borderRadius: 18,
    borderWidth: 8
  },
  indicator: {
    position: "absolute",
    height: 28,
    width: 28,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  indicatorValue: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "transparent"
  }
});

export default Switch;
