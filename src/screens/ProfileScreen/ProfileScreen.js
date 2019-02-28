import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { isNil } from 'lodash';

import { Header, HeaderTitle, HeaderIcon } from '@/components/Header';
import { Button } from '@/components/Buttons';
// import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';

// import { Permissions, ImagePicker } from 'expo';
import { connect } from 'react-redux';

import { setUserAvatar, setUserBackgroundImage } from './actions/profile.actions';
import { getUserData } from '@/selectors/user.selectors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    image: null,
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });

      this.props.setUserAvatar(pickerResult);
    }
  };

  _pickBackgroundImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });

      this.props.setUserBackgroundImage(pickerResult);
    }
  };

  render() {
    const {
      userData: { data },
      navigation,
    } = this.props;

    return (
      !isNil(data) && (
        <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'column', flexGrow: 1 }}>
          <Header>
            <HeaderTitle>Profil</HeaderTitle>
            <HeaderIcon onPress={() => navigation.navigate('SettingsScreen')}>
              {/*<MaterialCommunityIcons size={28} name="settings" color="#912F56" />*/}
              <Text>ustawienia</Text>
            </HeaderIcon>
          </Header>
          <ScrollView>
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={this._pickBackgroundImage}>
                <Image
                  style={{
                    flex: 1,
                    resizeMode: 'cover',
                    height: SCREEN_WIDTH / 2.5,
                    width: SCREEN_WIDTH,
                  }}
                  source={{
                    uri: data.backgroundImage
                      ? `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                          data.backgroundImage
                        }`
                      : 'https://media.boingboing.net/wp-content/uploads/2018/05/cool-background1.png',
                  }}
                />
              </TouchableOpacity>
              <View style={{ top: -56, zIndex: 2 }}>
                <TouchableOpacity onPress={this._pickImage}>
                  <Image
                    style={{
                      width: 112,
                      height: 112,
                      resizeMode: 'cover',
                      borderRadius: 56,
                      borderWidth: 5,
                      borderColor: '#ffffff',
                    }}
                    source={{
                      uri: data.avatar
                        ? `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                            data.avatar
                          }`
                        : 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png',
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 26,
                    marginVertical: 10,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  {data.username}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: getUserData(state),
  };
};

const mapDispatchToProps = {
  setUserAvatar,
  setUserBackgroundImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
