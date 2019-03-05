import React, { PureComponent } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

import { Footer } from "@/components/Footer";
import CameraRoll from "./CameraRoll";
import TextMessage from "./TextMessage";

class ConversationBottomBar extends PureComponent {
  state = {
    selectedTab: ""
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
          toggleCameraRollTab={this.toggleCameraRollTab}
        />
        {desiredTab}
      </Footer>
    );
  }
}

export default ConversationBottomBar;
