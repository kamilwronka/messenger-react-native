'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class BadInstagramCloneApp extends Component {
  state = {
    photo: null
  };

  render() {
    if(this.state.photo) {
      return(
        <View style={{ flex: 1 }}>
          <ImageBackground style={{ flex: 1 }} source={{ uri: this.state.photo }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={this.sendPhoto}
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  marginBottom: 50,
                }}>
                <View
                  style={{
                    height: 64,
                    width: 64,
                    borderRadius: 32,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>Wyślij</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1}}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1, justifyContent: 'flex-end' }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
            }}
          >
            <View style={{ alignSelf: 'center', bottom: 50 }}>
              <TouchableOpacity onPress={this.takePicture.bind(this)}>
                <View
                  style={{
                    alignSelf: 'center',
                    // marginBottom: 50,
                    height: 64,
                    width: 64,
                    borderRadius: 32,
                    borderWidth: 4,
                    borderColor: '#ffffff',
                    backgroundColor: 'transparent',
                  }}
                />
              </TouchableOpacity>
            </View>
          </RNCamera>
        </View>
      )
    }
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ photo: data.uri})
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

// export default class CameraExample extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };
//
//   _didFocusSubscription;
//   _willBlurSubscription;
//
//   constructor(props) {
//     super(props);
//     this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
//       BackHandler.addEventListener('hardwareBackPress', this.removeTakenPhoto)
//     );
//   }
//
//   componentWillUnmount() {
//     this._didFocusSubscription && this._didFocusSubscription.remove();
//     this._willBlurSubscription && this._willBlurSubscription.remove();
//   }
//
//   state = {
//     hasCameraPermission: null,
//     type: Camera.Constants.Type.back,
//     photo: null,
//   };
//
//   async componentDidMount() {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === 'granted' });
//
//     this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
//       BackHandler.removeEventListener('hardwareBackPress', this.removeTakenPhoto)
//     );
//   }
//
//   sendPhoto = () => {
//     this.props.navigation.navigate({
//       routeName: 'Conversation',
//       params: { ...this.props.navigation.state.params, photo: this.state.photo },
//     });
//   };
//
//   removeTakenPhoto = () => {
//     if (this.state.photo) {
//       this.setState({ photo: null });
//       return true;
//     } else {
//       return false;
//     }
//   };
//
//   takePhotoTimeout = () => {
//     return new Promise((resolve, reject) => {
//       let id = setTimeout(() => {
//         clearTimeout(id);
//         resolve();
//       }, 4000);
//     });
//   };
//
//   takePhoto = async () => {
//     console.log(this.refs.camera);
//     if (this.refs.camera) {
//       let photo = await Promise.race([
//         this.refs.camera.takePictureAsync(),
//         this.takePhotoTimeout(),
//       ]);
//       console.log(photo);
//       if (photo) {
//         this.setState({ photo });
//       }
//     }
//   };
//
//   switchCamera = () => {
//     this.setState({
//       type:
//         this.state.type === Camera.Constants.Type.back
//           ? Camera.Constants.Type.front
//           : Camera.Constants.Type.back,
//     });
//   };
//
//   render() {
//     const { hasCameraPermission } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       if (this.state.photo) {
//       }
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera ref="camera" style={{ flex: 1 }} type={this.state.type} ratio="16:9">
//             <View
//               style={{
//                 flex: 1,
//                 flexGrow: 1,
//                 backgroundColor: 'transparent',
//                 alignItems: 'flex-end',
//                 // justifyContent: 'center',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//               }}>
//               <View style={{ alignSelf: 'flex-end', top: 20, right: 20 }}>
//                 <TouchableOpacity onPress={this.switchCamera}>
//                   <Ionicons name="ios-reverse-camera" size={36} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//               <View style={{ alignSelf: 'center', marginBottom: 50 }}>

//               </View>
//             </View>
//           </Camera>
//         </View>
//       );
//     }
//   }
// }
