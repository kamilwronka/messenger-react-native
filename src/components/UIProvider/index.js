import React, { PureComponent } from "react";
import { View, Modal, Animated } from "react-native";

import { emitter, EMITTER_EVENTS } from "@/helpers/emitter";
import ActionSheet from "../ActionSheet";

class UIProvider extends PureComponent {
  state = {
    showActionSheet: false,
    actionSheetData: undefined,
    actionSheetAnimation: new Animated.Value(0)
  };

  componentDidMount() {
    this.setupListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showActionSheet !== this.state.showActionSheet) {
      if (this.state.showActionSheet) {
        Animated.timing(this.state.actionSheetAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }).start();
      } else {
        Animated.timing(this.state.actionSheetAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }).start();
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
    this.setState({ actionSheetData: data, showActionSheet: true });
  };

  dismissActionSheet = () => {
    this.setState({ showActionSheet: false, actionSheetData: undefined });
  };

  render() {
    const { actionSheetData, showActionSheet } = this.state;

    const appContainerStyles = {
      opacity: this.state.actionSheetAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.85]
      })
    };

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[{ flex: 1 }, appContainerStyles]}>
          {this.props.children}
        </Animated.View>
        <Modal
          visible={showActionSheet}
          onRequestClose={this.dismissActionSheet}
          animationType="slide"
          hardwareAccelerated
          transparent
        >
          <ActionSheet
            data={actionSheetData}
            onDismiss={this.dismissActionSheet}
          />
        </Modal>
      </View>
    );
  }
}

export default UIProvider;
