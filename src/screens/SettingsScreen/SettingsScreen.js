import React, { Component } from 'react';
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
} from 'native-base';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/auth.actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  handleLogout = () => {
    this.props
      .logoutUser()
      .then(() => {
        Toast.show({ text: 'Pomyślnie wylogowano' });
        this.props.navigation.navigate('AuthLoading');
      })
      .catch(() => {
        Toast.show({ text: 'Nie udało się wylogować', buttonText: 'OK' });
      });
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Title>Ustawienia</Title>
          </Left>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>Personalizacja</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate('Profile')} icon>
              <Left>
                <Button style={{ backgroundColor: '#FF9501' }}>
                  <Icon active name="person" />
                </Button>
              </Left>
              <Body>
                <Text>Profil</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: '#FF9501' }}>
                  <Icon active name="brush" />
                </Button>
              </Left>
              <Body>
                <Text>Motyw</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: '#FF9501' }}>
                  <Icon active name="musical-note" />
                </Button>
              </Left>
              <Body>
                <Text>Dźwięk wiadomości</Text>
              </Body>
            </ListItem>
            <ListItem itemDivider>
              <Text>Bezpieczeństwo</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: 'blue' }}>
                  <Icon active name="key" />
                </Button>
              </Left>
              <Body>
                <Text>Hasło</Text>
              </Body>
            </ListItem>
            <ListItem itemDivider />
            <ListItem icon onPress={this.handleLogout}>
              <Left>
                <Button style={{ backgroundColor: 'blue' }}>
                  <Icon active name="hand" />
                </Button>
              </Left>
              <Body>
                <Text>Wyloguj się</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logoutUser,
};

export default connect(
  null,
  mapDispatchToProps
)(SettingsScreen);
