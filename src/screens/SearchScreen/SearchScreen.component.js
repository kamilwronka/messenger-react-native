import React, { PureComponent } from 'react';
import {
  Image,
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  RefreshControl,
} from 'react-native';

import { isNil, get } from 'lodash';

import { connect } from 'react-redux';
import { prepareAvatar } from '@/helpers';
import { Header, HeaderTitle, HeaderIcon, HeaderLeftIcon } from '@/components/Header';
import BorderedInput from '@/components/Input/BorderedInput';

import {
  fetchUserByQuery,
  sendFriendRequest,
} from '@/screens/ContactsScreen/actions/contactsScreen.actions';
import { getUsers } from '@/screens/ContactsScreen/selectors/contactsScreen.selectors';
import { getUserData } from '@/selectors/user.selectors';

class SearchScreen extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  state = {
    isSearchBarOpened: false,
    searchValue: '',
    active: false,
  };

  colorsArr = ['#b0003a', '#6a0080', '#002984', '#00675b'];

  componentDidMount() {
    console.log('search screen', this.props.navigation);
    this.props.navigation.state.params.callback();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.props.fetchUserByQuery(this.state.searchValue);
    }
  }

  handleSearch = value => {
    this.setState({ searchValue: value });
  };

  toggleSearchBar = () => {
    this.setState({ isSearchBarOpened: !this.state.isSearchBarOpened });
  };

  clearSearchBar = () => {
    this.setState({ searchValue: '' });
  };

  handleFriendRequest = userId => {
    this.props.sendFriendRequest(userId).then(res => {
      alert(res.value.data.data);
    });
  };

  goToConversation = item => {
    const { navigate } = this.props.navigation;

    navigate('Conversation', {
      participants: [item],
      conversationName: item.username,
    });
  };

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
        onPress={() => this.goToConversation(item)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 72,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <View>
            {!isNil(item.avatar) ? (
              <Image
                style={{ height: 56, width: 56, borderRadius: 28 }}
                source={{
                  uri: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${item.avatar}`,
                }}
              />
            ) : (
              <View
                style={{
                  borderRadius: 28,
                  backgroundColor: this.colorsArr[
                    Math.floor(Math.random() * this.colorsArr.length)
                  ],
                  height: 56,
                  width: 56,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#fff', fontSize: 24 }}>{prepareAvatar(item.username)}</Text>
              </View>
            )}
          </View>
          <View
            style={{
              marginLeft: 20,
              flex: 1,
              alignContent: 'space-between',
              flexWrap: 'nowrap',
            }}>
            <Text style={{ fontSize: 16 }}>{item.username}</Text>
            <Text style={{ fontSize: 12, color: '#aaaaaa' }}>3 wspólnych znajomych</Text>
          </View>
          <View style={{ height: 72, flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.handleFriendRequest(item._id)}>
                <Text>ikonka dodawania</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'column', flexGrow: 1 }}>
        <Header>
          <HeaderLeftIcon />
          <HeaderTitle>Szukaj</HeaderTitle>
        </Header>
        <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <BorderedInput
            placeholder="Szukaj..."
            value={this.state.searchValue}
            onChangeText={this.handleSearch}
            handleIconPress={this.clearSearchBar}
          />
        </View>
        {!this.props.users.fetching ? (
          <ScrollView>
            <FlatList
              style={{ width: '100%' }}
              data={this.props.users.data}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </ScrollView>
        ) : (
          <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: getUsers(state),
    userData: getUserData(state),
  };
};

const mapDispatchToProps = {
  fetchUserByQuery,
  sendFriendRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
