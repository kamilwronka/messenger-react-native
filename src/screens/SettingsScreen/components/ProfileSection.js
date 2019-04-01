import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from "react-native";

import { connect } from "react-redux";

import {
  setUserAvatar,
  setUserBackgroundImage
} from "../actions/profile.actions";
import { getUserData } from "@/selectors/user.selectors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    image: null
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });

      this.props.setUserAvatar(pickerResult);
    }
  };

  _pickBackgroundImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });

      this.props.setUserBackgroundImage(pickerResult);
    }
  };

  render() {
    const {
      userData: { data }
    } = this.props;

    return (
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          // onPress={this._pickBackgroundImage}
        >
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
          <TouchableOpacity>
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
)(ProfileScreen);
