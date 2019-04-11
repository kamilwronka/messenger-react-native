import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Dimensions
} from "react-native";
import { noop } from "lodash";
import { withNavigation } from "react-navigation";

import { connect } from "react-redux";

import {
  setUserAvatar,
  setUserBackgroundImage
} from "../actions/profile.actions";
import { getUserData } from "@/selectors/user.selectors";
import { emitter, EMITTER_EVENTS } from "@/helpers/emitter";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    image: null
  };

  goToCamera = () => {
    this.props.navigation.navigate("CameraScreen");
  };

  goToGallery = () => {
    this.props.navigation.navigate("GalleryScreen");
  };

  PROFILE_PICTURE_OPTIONS = {
    menuItems: [
      {
        id: 0,
        icon: "camera",
        text: "Take photo",
        onPress: this.goToCamera
      },
      {
        id: 1,
        icon: "image",
        text: "Pick image from gallery",
        onPress: this.goToGallery
      },
      {
        id: 2,
        icon: "cancel",
        text: "Cancel",
        onPress: noop
      }
    ],
    cancelButtonIndex: 2
  };

  BACKGROUND_PICTURE_OPTIONS = {
    menuItems: [
      {
        id: 0,
        icon: "camera",
        text: "Take photo",
        onPress: this.goToCamera
      },
      {
        id: 1,
        icon: "image",
        text: "Pick image from gallery",
        onPress: this.goToGallery
      },
      {
        id: 2,
        icon: "cancel",
        text: "Cancel",
        onPress: noop
      }
    ],
    cancelButtonIndex: 2
  };

  setProfilePicture = () => {
    emitter.emit(
      EMITTER_EVENTS.SHOW_ACTION_SHEET,
      this.PROFILE_PICTURE_OPTIONS
    );
  };

  setBackgroundImage = () => {
    emitter.emit(
      EMITTER_EVENTS.SHOW_ACTION_SHEET,
      this.BACKGROUND_PICTURE_OPTIONS
    );
  };

  // _pickImage = async () => {
  //   const { status: cameraRollPerm } = await Permissions.askAsync(
  //     Permissions.CAMERA_ROLL
  //   );

  //   // only if user allows permission to camera roll
  //   if (cameraRollPerm === "granted") {
  //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: true
  //     });

  //     this.props.setUserAvatar(pickerResult);
  //   }
  // };

  // _pickBackgroundImage = async () => {
  //   const { status: cameraRollPerm } = await Permissions.askAsync(
  //     Permissions.CAMERA_ROLL
  //   );

  //   if (cameraRollPerm === "granted") {
  //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: true
  //     });

  //     this.props.setUserBackgroundImage(pickerResult);
  //   }
  // };

  render() {
    const {
      userData: { data }
    } = this.props;

    return (
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={this.setBackgroundImage}>
          <Image
            style={{
              flex: 1,
              resizeMode: "cover",
              height: SCREEN_WIDTH / 2.5,
              width: SCREEN_WIDTH
            }}
            source={{
              uri:
                data && data.backgroundImage
                  ? `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                      data.backgroundImage
                    }`
                  : "https://images8.alphacoders.com/413/thumb-1920-413762.jpg"
            }}
          />
        </TouchableOpacity>
        <View style={{ top: -56, zIndex: 2 }}>
          <TouchableOpacity onPress={this.setProfilePicture}>
            <Image
              style={{
                width: 112,
                height: 112,
                resizeMode: "cover",
                borderRadius: 56,
                borderWidth: 5,
                borderColor: "#ffffff"
              }}
              source={{
                uri:
                  data && data.avatar
                    ? `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                        data.avatar
                      }`
                    : "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 26,
              marginVertical: 10,
              fontWeight: "bold",
              alignSelf: "center",
              color: "#ffffff"
            }}
          >
            {data ? data.username : ""}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: getUserData(state)
  };
};

const mapDispatchToProps = {
  setUserAvatar,
  setUserBackgroundImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(ProfileScreen));
