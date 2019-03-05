import React, { PureComponent } from "react";
import {
  CameraRoll as Camera,
  PermissionsAndroid,
  FlatList
} from "react-native";
import CameraRollImage from "./CameraRollImage";

class CameraRoll extends PureComponent {
  state = {
    photos: [],
    selectedIndex: null
  };

  async componentDidMount() {
    await this.requestCameraPermission();
    this.loadCameraRoll();
  }

  selectImage = index => {
    if (this.state.selectedIndex === index) {
      this.setState({ selectedIndex: null });
    } else {
      this.setState({ selectedIndex: index });
    }
  };

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

  _renderPhoto = ({ item, index }) => {
    const { handleImageSend } = this.props;

    return (
      <CameraRollImage
        selected={index === this.state.selectedIndex}
        selectImage={() => this.selectImage(index)}
        photo={item.node.image}
        handleImageSend={handleImageSend}
      />
    );
  };

  getCameraPhotos = async () => {
    return await Camera.getPhotos({
      first: 20,
      assetType: "Photos"
    });
  };

  getVideos = async () => {
    return await Camera.getPhotos({
      first: 20,
      assetType: "Videos"
    });
  };

  loadCameraRoll = async () => {
    let [photos, videos] = await Promise.all([
      this.getCameraPhotos(),
      this.getVideos()
    ]);

    console.log(videos);

    this.setState({ photos: [...photos.edges, ...videos.edges] });
  };

  render() {
    return (
      <FlatList
        data={this.state.photos}
        extraData={this.state.selectedIndex}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderPhoto}
        horizontal={true}
      />
    );
  }
}

export default CameraRoll;
