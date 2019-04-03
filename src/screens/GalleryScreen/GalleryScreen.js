import React, { Component } from "react";
import {
  ScrollView,
  View,
  Platform,
  Image,
  FlatList,
  CameraRoll as Camera,
  PermissionsAndroid,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

import { ScreenContainer } from "@/components/ScreenContainer";
import {
  Header,
  HeaderTitle,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";

const { width } = Dimensions.get("window");
const calculatedPhotoWidth = width / 4;
const calculatedPhotoHeight = calculatedPhotoWidth;

class GalleryScreen extends Component {
  static navigationOptions = {
    header: null
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  handleImagePick = uri => {
    console.log(uri);
    this.props.navigation.navigate({
      routeName: "PhotoScreen",
      params: {
        photoUrl: uri
      }
    });
  };

  state = {
    photos: [],
    page: 1,
    pageSize: 20,
    selectedIndex: null,
    fetchingCameraRoll: false
  };

  async componentDidMount() {
    Platform.OS === "android" && (await this.requestCameraPermission());
    this.loadCameraRoll(this.state.page, 20);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.page, this.state.page);
    if (this.state.page !== prevState.page) {
      this.loadCameraRoll(this.state.page, 20);
    }
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
          title: "Messenger App Camera Roll permission",
          message:
            "In order to use Camera Roll, you have to grant Camera Roll permission.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("You can use the camera");
      } else {
        // console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  _keyExtractor = (item, index) => `${index}`;

  _renderPhoto = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.handleImagePick(item.node.image.uri)}
      >
        <View style={{ borderWidth: 1, borderColor: "transparent" }}>
          <Image
            style={{
              height: calculatedPhotoHeight,
              width: calculatedPhotoWidth
            }}
            source={{ uri: item.node.image.uri }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  getCameraPhotos = async amount => {
    return await Camera.getPhotos({
      first: amount,
      assetType: "Photos"
    });
  };

  getVideos = async amount => {
    return await Camera.getPhotos({
      first: amount,
      assetType: "All"
    });
  };

  loadCameraRoll = async (page, pageSize) => {
    this.setState({ fetchingCameraRoll: true });
    let [photos, videos] = await Promise.all([
      this.getCameraPhotos(page * pageSize),
      this.getVideos(page * pageSize)
    ]);

    // console.log("refresh");
    console.log(page, pageSize);

    this.setState({
      photos: [...photos.edges, ...videos.edges],
      fetchingCameraRoll: false
    });
  };

  loadMore = () => {
    console.log("load more");
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    return (
      <ScreenContainer>
        <Header>
          <HeaderIconLeft
            iconName="chevron-left"
            onPress={this.goBack}
            color="#ffffff"
            size={28}
          />
          <HeaderTitle value="Gallery" />
        </Header>
        <ScrollView>
          <FlatList
            numColumns={4}
            data={this.state.photos}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderPhoto}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.5}
          />
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default GalleryScreen;
