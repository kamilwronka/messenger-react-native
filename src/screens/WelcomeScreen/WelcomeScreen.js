import React, { Component } from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  Animated,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from '@/components/Buttons';

import InitialScreen from './InitialScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    currentScreenIndex: 1,
  };

  screens = [<InitialScreen />, <InitialScreen />, <InitialScreen />];

  componentDidMount() {
    console.log('welcome screen appear!');
  }

  updatePage = event => {
    let newPage = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH + 1);

    if (newPage !== this.state.currentPage) {
      this.setState({ currentScreenIndex: newPage });
    }
  };

  checkIfLastSlide = () => {
    return this.state.currentScreenIndex === this.screens.length;
  };

  handleNextStep = () => {
    this.props.navigation.navigate('AuthScreen');
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <ScrollView
          ref="scrollView"
          horizontal
          pagingEnabled
          onScroll={this.updatePage}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}>
          {this.screens.map((elem, index) => {
            return (
              <View key={index} style={{ width: SCREEN_WIDTH }}>
                {elem}
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            alignSelf: 'flex-end',
            width: SCREEN_WIDTH,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            {this.screens.map((screen, index) => {
              if (index === this.state.currentScreenIndex - 1) {
                return (
                  <Animated.View
                    key={index}
                    style={{
                      height: 6,
                      width: 6,
                      borderRadius: 3,
                      backgroundColor: '#912F56',
                      marginHorizontal: 5,
                    }}
                  />
                );
              } else {
                return (
                  <Animated.View
                    key={index}
                    style={{
                      height: 6,
                      width: 6,
                      borderRadius: 3,
                      backgroundColor: '#BEBBBB',
                      marginHorizontal: 5,
                    }}
                  />
                );
              }
            })}
          </View>
          <View style={{ marginHorizontal: 10 }}>
            {this.checkIfLastSlide() && (
              <Button title="Zaczynajmy!" onPress={this.handleNextStep} wide />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default WelcomeScreen;
