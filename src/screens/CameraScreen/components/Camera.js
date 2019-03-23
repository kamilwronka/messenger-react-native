import React, { PureComponent } from "react";
import { RNCamera } from "react-native-camera";
import { PanResponder, View } from "react-native";
import { withNavigation } from "react-navigation";

import {
  Header,
  HeaderTitle,
  HeaderIconRight,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";

class Camera extends PureComponent {
  constructor(props) {
    super(props);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log("grant");
        this.touchStart = Date.now();
        this.longPressTimeout = setTimeout(() => {
          console.log("long press");
          this.videoRecording = true;
          this.recordVideo();
        }, 2000);
      },
      onPanResponderMove: (evt, gestureState) => {},
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.touchEnd = Date.now();
        clearTimeout(this.longPressTimeout);

        if (this.touchEnd - this.touchStart < 2000) {
          this.takePicture();
        }

        if (this.touchEnd - this.touchStart >= 2000 && this.videoRecording) {
          this.camera.stopRecording();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      }
    });
  }

  state = {
    flash: false
  };

  toggleFlash = () => {
    this.setState({ flash: !this.state.flash });
  };

  takePicture = async () => {
    console.log("photo taken");
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.props.pushToContainerState({ photo: data });
    }
  };

  recordVideo = async () => {
    if (this.camera) {
      const options = {
        quality: RNCamera.Constants.VideoQuality["720p"],
        orientation: "portrait"
      };
      this.camera.recordAsync(options).then(data => {
        this.props.pushToContainerState({ video: data });
      });
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { flash } = this.state;
    const {
      FlashMode: { on, off }
    } = RNCamera.Constants;

    return (
      <View style={{ flex: 1 }}>
        <Header>
          <HeaderIconLeft
            iconName="chevron-left"
            onPress={this.goBack}
            color="#ffffff"
            size={28}
          />
          <HeaderIconRight
            iconName={flash ? "flash-off" : "flash"}
            onPress={this.toggleFlash}
            color="#ffffff"
            size={28}
          />
        </Header>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1, justifyContent: "flex-end" }}
          type={RNCamera.Constants.Type.back}
          flashMode={flash ? on : off}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          pauseAfterCapture
        >
          <View style={{ alignSelf: "center", bottom: 50 }}>
            <View
              {...this._panResponder.panHandlers}
              style={{
                alignSelf: "center",
                // marginBottom: 50,
                height: 64,
                width: 64,
                borderRadius: 32,
                borderWidth: 4,
                borderColor: "#ffffff",
                backgroundColor: "transparent"
              }}
            />
          </View>
        </RNCamera>
      </View>
    );
  }
}

export default withNavigation(Camera);
