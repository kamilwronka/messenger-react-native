import React, { PureComponent } from "react";
import { Keyboard } from "react-native";

import { Footer } from "@/components/Footer";
import CameraRoll from "./CameraRoll";
import TextMessage from "./TextMessage";

class ConversationBottomBar extends PureComponent {
  state = {
    selectedTab: ""
  };

  componentDidMount() {
    Keyboard.addListener("keyboardWillShow", this._keyboardWillShow);
  }

  componentWillUnmount() {
    Keyboard.removeListener("keyboardWillShow", this._keyboardWillShow);
  }

  _keyboardWillShow = () => {
    this.selectTab("");
  };

  selectTab = selectedTab => {
    this.setState({ selectedTab });
  };

  toggleCameraRollTab = () => {
    const desiredTab =
      this.state.selectedTab === "cameraRoll" ? "" : "cameraRoll";

    this.selectTab(desiredTab);
  };

  render() {
    let desiredTab;

    switch (this.state.selectedTab) {
      case "cameraRoll":
        desiredTab = (
          <CameraRoll
            containerHeight={this.props.keyboardHeight}
            {...this.props}
          />
        );
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

export default ConversationBottomBar;
