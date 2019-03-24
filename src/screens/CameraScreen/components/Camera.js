import React, { PureComponent } from "react";
import { RNCamera } from "react-native-camera";
import {
  PanResponder,
  View,
  Text,
  Animated,
  StyleSheet,
  StatusBar
} from "react-native";
import { withNavigation } from "react-navigation";
import * as Progress from "react-native-progress";

import {
  Header,
  HeaderTitle,
  HeaderIconRight,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";

const LONG_PRESS_DURATION = 1000; // 1 second
const MAX_VIDEO_DURATION = 15 * 1000; //30 seconds
const TIMER_TICK = 1000; // 1 second

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
          this.videoRecording = true;
          this.recordingTimer = setInterval(this.updateTimer, TIMER_TICK);
          this.recordVideo();
        }, LONG_PRESS_DURATION);

        this.videoRecordingTimeout = setTimeout(() => {
          this.stopRecording();
          this.videoRecording = false;
        }, MAX_VIDEO_DURATION);
      },
      onPanResponderMove: (evt, gestureState) => {},
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.touchEnd = Date.now();
        clearTimeout(this.longPressTimeout);
        clearInterval(this.recordingTimer);
        clearTimeout(this.videoRecordingTimeout);

        this.updateTimer(true);

        if (this.touchEnd - this.touchStart < LONG_PRESS_DURATION) {
          this.takePicture();
        }

        if (
          this.touchEnd - this.touchStart >= LONG_PRESS_DURATION &&
          this.videoRecording
        ) {
          this.stopRecording();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      }
    });
  }

  state = {
    flash: false,
    front: false,
    recordingTimer: 0,
    buttonScale: new Animated.Value(1)
  };

  toggleFlash = () => {
    this.setState({ flash: !this.state.flash });
  };

  toggleCameraType = () => {
    this.setState({ front: !this.state.front });
  };

  updateTimer = reset => {
    if (reset) {
      this.setState({ recordingTimer: 0 });
    } else {
      this.setState({ recordingTimer: this.state.recordingTimer + TIMER_TICK });
    }
  };

  calculateButtonPercentage = () => {
    const percentage = this.state.recordingTimer / MAX_VIDEO_DURATION;
    return Number(percentage.toFixed(1));
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
        // quality: RNCamera.Constants.VideoQuality["720p"],
        orientation: "portrait"
      };

      Animated.timing(this.state.buttonScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true
      }).start(() => console.log("done"));

      this.camera.recordAsync(options).then(data => {
        this.props.pushToContainerState({ video: data });
      });
    }
  };

  stopRecording = () => {
    this.camera.stopRecording();
    Animated.timing(this.state.buttonScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { flash, front: stateFront } = this.state;
    const {
      FlashMode: { on, off },
      Type: { back, front }
    } = RNCamera.Constants;

    const outerButtonScale = this.state.buttonScale.interpolate({
      inputRange: [1, 1.2],
      outputRange: [1, 1.2]
    });

    const outerButtonStyle = {
      transform: [
        {
          scale: outerButtonScale
        }
      ]
    };

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <View
          style={{
            position: "absolute",
            zIndex: 3,
            backgroundColor: "transparent"
          }}
        >
          <Header>
            <HeaderIconLeft
              iconName="chevron-left"
              onPress={this.goBack}
              color="#ffffff"
              size={28}
            />
            <HeaderIconRight
              iconName={flash ? "flash" : "flash-off"}
              onPress={this.toggleFlash}
              color="#ffffff"
              size={28}
              additionalStyle={{ right: 64 }}
            />
            <HeaderIconRight
              iconName={stateFront ? "camera-front" : "camera-rear"}
              onPress={this.toggleCameraType}
              color="#ffffff"
              size={28}
              additionalStyle={{ right: 16 }}
            />
          </Header>
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1, justifyContent: "flex-end" }}
          type={stateFront ? front : back}
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
                alignSelf: "center"
              }}
            >
              <Progress.Circle
                size={72}
                progress={this.calculateButtonPercentage()}
                unfilledColor="#ffffff"
                color="#5D2E46"
                borderWidth={0}
                thickness={8}
                fill="rgba(255, 255, 255, 0.3)"
              />
            </View>
          </View>
        </RNCamera>
      </View>
    );
  }
}

export default withNavigation(Camera);

const styles = StyleSheet.create({
  buttonOuterBorder: {
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    width: 72,
    borderRadius: 36,
    backgroundColor: "transparent",
    borderWidth: 20
  },
  button: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff"
  }
});
