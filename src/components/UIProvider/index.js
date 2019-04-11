import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

import { emitter, EMITTER_EVENTS } from "@/helpers/emitter";
import ActionSheet from "../ActionSheet";

const { height } = Dimensions.get("window");
class UIProvider extends PureComponent {
  state = {
    showActionSheet: false,
    actionSheetData: undefined,
    actionSheetAnimation: new Animated.Value(0),
    actionSheetHeight: 0
  };

  componentDidMount() {
    this.setupListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.showActionSheet !== this.state.showActionSheet ||
      prevState.actionSheetHeight !== this.state.actionSheetHeight
    ) {
      if (this.state.showActionSheet && this.state.actionSheetHeight) {
        Animated.spring(this.state.actionSheetAnimation, {
          toValue: 1,
          bounciness: 0
        }).start();
      } else {
        Animated.spring(this.state.actionSheetAnimation, {
          toValue: 0,
          bounciness: 0
        }).start(this.removeActionSheetData);
      }
    }
  }

  setupListeners = () => {
    this.actionSheetListener = emitter.addListener(
      EMITTER_EVENTS.SHOW_ACTION_SHEET,
      this.handleShowActionSheet
    );
  };

  removeListeners = () => {
    this.actionSheetListener.remove();
  };

  handleShowActionSheet = data => {
    console.log("show action shit", data);
    this.setState({
      actionSheetData: data,
      showActionSheet: true,
      actionSheetHeight: data.menuItems.length * 56
    });
  };

  dismissActionSheet = () => {
    this.setState({ showActionSheet: false });
  };

  removeActionSheetData = () => {
    this.setState({ actionSheetData: undefined });
  };

  render() {
    const {
      actionSheetData,
      showActionSheet,
      actionSheetAnimation,
      actionSheetHeight
    } = this.state;

    const overlayContainerStyles = {
      // opacity: this.state.actionSheetAnimation.interpolate({
      //   inputRange: [0, 1],
      //   outputRange: [1, 0.85]
      // }),
      // transform: [
      //   {
      //     scale: actionSheetAnimation.interpolate({
      //       inputRange: [0, 1],
      //       outputRange: [1, 0.9]
      //     })
      //   }
      // ],
      backgroundColor: actionSheetAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]
      })
    };

    const actionSheetContainerStyles = {
      position: "absolute",
      right: 0,
      left: 0,
      bottom: actionSheetAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-actionSheetHeight, 0]
      })
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.props.children}
          <Animated.View
            pointerEvents={this.state.showActionSheet ? "auto" : "none"}
            style={[StyleSheet.absoluteFill, overlayContainerStyles]}
          >
            <TouchableWithoutFeedback onPress={this.dismissActionSheet}>
              <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
        <Animated.View style={[actionSheetContainerStyles]}>
          <ActionSheet
            data={actionSheetData}
            onDismiss={this.dismissActionSheet}
          />
        </Animated.View>
      </View>
    );
  }
}

export default UIProvider;
