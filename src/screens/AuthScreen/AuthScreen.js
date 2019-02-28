import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';

import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';

import Input from '@/components/Input/Input';
import { Button } from '@/components/Buttons';
import { H1, H3 } from '@/components/Typography/Typography';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class AuthScreen extends Component {
  state = {
    tabOpened: 'register',
  };

  switchToLogin = () => {
    this.setState({ tabOpened: 'login' });
  };

  switchToRegister = () => {
    this.setState({ tabOpened: 'register' });
  };

  showProperTab = () => {
    switch (this.state.tabOpened) {
      case 'login':
        return <LoginScreen {...this.props} />;
      case 'register':
        return <RegisterScreen {...this.props} />;
      default:
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: '70%', alignSelf: 'center', marginTop: 20 }}>
          <H3>By móc w pełni korzystać z aplikacji wymagana jest rejestracja lub logowanie.</H3>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center' }}>
          <Button
            onPress={this.switchToLogin}
            title="Logowanie"
            bright={this.state.tabOpened === 'register'}
            medium
          />
          <Button
            onPress={this.switchToRegister}
            title="Rejestracja"
            bright={this.state.tabOpened === 'login'}
            medium
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: 20,
            flex: 1,
            justifyContent: 'center',
          }}
          style={{}}>
          {this.showProperTab()}
        </ScrollView>
      </View>
    );
  }
}

export default AuthScreen;
