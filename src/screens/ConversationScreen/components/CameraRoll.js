import React, { PureComponent } from "react";
import {
  ScrollView,
  CameraRoll as Camera,
  PermissionsAndroid,
  FlatList
} from "react-native";
import CameraRollImage from "./CameraRollImage";

class CameraRoll extends PureComponent {
  state = {
    photos: []
  };

  async componentDidMount() {
    await this.requestCameraPermission();
    this.loadImages();
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  _keyExtractor = (item, index) => `${index}`;

  _renderPhoto = ({ item }) => {
    const { width, height, uri } = item.node.image;

    return <CameraRollImage width={width} height={height} uri={uri} />;
  };

  loadImages = () => {
    Camera.getPhotos({
      first: 20,
      assetType: "Photos"
    })
      .then(r => {
        console.log(r);
        this.setState({ photos: r.edges });
      })
      .catch(err => {
        //Error Loading Images
        console.log(err);
      });
  };

  render() {
    return (
      <FlatList
        data={this.state.photos}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderPhoto}
        horizontal={true}
      />
    );
  }
}

export default CameraRoll;
