import React, { PureComponent } from "react";
import { View, Text, TouchableWithoutFeedback, Animated } from "react-native";

class CameraRollImage extends PureComponent {
  state = {
    selected: false,
    opacity: new Animated.Value(0)
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      if (nextProps.selected) {
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }).start();
      } else {
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true
        }).start();
      }
    }
  }

  handleSendPhoto = () => {
    const { photo, handleImageSend, selectImage } = this.props;
    handleImageSend(photo);
    selectImage();
  };

  render() {
    const {
      selectImage,
      photo: { uri }
    } = this.props;
    const height = this.props.height || 250;
    const width = 280;

    return (
      <View
        style={{
          borderRightWidth: 2,
          borderColor: "#f0f0f0"
        }}
      >
        <TouchableWithoutFeedback onPress={selectImage}>
          <View style={{ backgroundColor: "#000", height, width }}>
            <Animated.Image
              resizeMode="cover"
              style={[
                {
                  opacity: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.45]
                  }),
                  transform: [
                    {
                      scale: this.state.opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2]
                      })
                    }
                  ]
                },
                {
                  flex: 1,
                  width: null,
                  height: null
                }
              ]}
              source={{ uri }}
            />
            <Animated.View
              style={[
                {
                  opacity: this.state.opacity
                },
                {
                  position: "absolute",
                  bottom: 83,
                  alignSelf: "center"
                }
              ]}
            >
              <TouchableWithoutFeedback
                onPress={
                  this.props.selected ? this.handleSendPhoto : selectImage
                }
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 84,
                    height: 84,
                    borderRadius: 42,
                    borderWidth: 2,
                    borderColor: "#ffffff",
                    backgroundColor: "transparent"
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#ffffff" }}>Wyślij</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default CameraRollImage;
