import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  ImageBackground,
  PanResponder,
  Animated,
  UIManager,
  LayoutAnimation,
  Dimensions
} from "react-native";
// import { Camera, Permissions } from 'expo';
import { isNil } from "lodash";
// import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class ConversationPhotoScreen extends React.Component {
  constructor(props) {
    super(props);

    const position = new Animated.Value();
    const panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        const { numberActiveTouches, dx, dy } = gestureState;
        const { nativeEvent, target, type } = evt;

        console.log(nativeEvent);

        if (numberActiveTouches === 2) {
          const distance = dx + dy;
          position.setValue(distance);
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
    this.state = { panResponder, position, index: 0 };
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {}

  getPhotoStyle() {
    const { position } = this.state;
    const rotate = position.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    console.log(rotate);

    // return {
    //   transform: [{ rotate }],
    // };
  }

  render() {
    // console.log(this.props.navigation.state);
    return (
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="contain"
          style={{ flex: 1, height: null, width: null, resizeMode: "contain" }}
          source={{ uri: this.props.navigation.state.params.photoUrl }}
          {...this.state.panResponder.panHandlers}
        />
      </View>
    );
  }
}
