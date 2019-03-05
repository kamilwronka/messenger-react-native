import React, { Component } from "react";
import {
  CameraRoll,
  ScrollView,
  Image,
  PermissionsAndroid,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Toast,
  Header,
  Title,
  Thumbnail,
  H2
} from "native-base";
import { Permissions, ImagePicker } from "expo";
import { connect } from "react-redux";

import { setUserAvatar } from "./actions/profile.actions";
import { getUserData } from "../../../selectors/user.selectors";

class SettingsScreen extends Component {
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

  render() {
    const {
      userData: {
        data: { avatar, username }
      }
    } = this.props;

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Profil</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Body>
            <TouchableOpacity onPress={this._pickImage}>
              <Image
                style={{
                  flex: 1,
                  width: 128,
                  height: 128,
                  resizeMode: "contain",
                  borderRadius: 64
                }}
                source={{
                  uri: avatar
                    ? `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${avatar}`
                    : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png"
                }}
              />
            </TouchableOpacity>
          </Body>
          <Body>
            <H2>{username}</H2>
          </Body>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: getUserData(state)
  };
};

const mapDispatchToProps = {
  setUserAvatar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
