import React, { PureComponent } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  BackHandler,
  Keyboard
} from "react-native";
import { withNavigation } from "react-navigation";

import { Footer } from "@/components/Footer";
import CameraRoll from "./CameraRoll";
import TextMessage from "./TextMessage";

class ConversationBottomBar extends PureComponent {
  state = {
    selectedTab: ""
  };

  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener("didFocus", () =>
      BackHandler.addEventListener("hardwareBackPress", this.dismissSelectedTab)
    );
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.dismissSelectedTab
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
  }

  selectTab = selectedTab => {
    this.setState({ selectedTab });
  };

  toggleCameraRollTab = () => {
    Keyboard.dismiss();
    const desiredTab =
      this.state.selectedTab === "cameraRoll" ? "" : "cameraRoll";

    this.selectTab(desiredTab);
  };

  dismissSelectedTab = () => {
    if (this.state.selectedTab) {
      this.setState({ selectedTab: "" });
      return true;
    } else {
      return false;
    }
  };

  render() {
    let desiredTab;

    switch (this.state.selectedTab) {
      case "cameraRoll":
        desiredTab = <CameraRoll {...this.props} />;
        break;
      default:
        desiredTab = null;
        break;
    }

    return (
      <Footer>
        <TextMessage
          {...this.props}
          onInputFocus={this.props.onInputFocus}
          toggleCameraRollTab={this.toggleCameraRollTab}
        />
        {desiredTab}
      </Footer>
    );
  }
}

export default withNavigation(ConversationBottomBar);
