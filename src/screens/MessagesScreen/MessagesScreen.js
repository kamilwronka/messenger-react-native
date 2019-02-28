import React, { PureComponent } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { isNil, isArray, get, isEmpty } from 'lodash';
// import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import SearchHeader from '../../components/SearchHeader';

import SocketContext from '@/helpers/socketContext';

import { prepareAvatar, prepareLastMessage } from '@/helpers';
import { Header, HeaderTitle, HeaderIcon } from '@/components/Header';

import { fetchConversations } from './actions/homeScreen.actions';
import { getConversations } from './selectors/homeScreen.selectors';
import { getUserData } from '../../selectors/user.selectors';
import Avatar from '../../components/Avatar';
import ConversationListItem from './components/ConversationListItem';

class MessagesScreen extends PureComponent {
  componentDidMount() {
    this.props.fetchConversations();
  }

  state = {
    isSearchBarOpened: false,
    searchValue: '',
    refreshing: false,
  };

  _onRefresh = () => {
    this.props.fetchConversations();
  };

  prepareConversationName = (name, participants) => {
    if (!isNil(name)) {
      return name;
    }

    const preparedParticipants = participants.filter(
      participant => participant._id !== this.props.user.data._id
    );

    if (preparedParticipants.length > 1 && isArray(preparedParticipants)) {
      let preparedName = '';
      preparedParticipants.map(participant => {
        preparedName = preparedName + participant.username + ', ';
      });
      return preparedName;
    } else {
      return get(preparedParticipants, '[0].username');
    }
  };

  prepareLastMessageDate = lastMessage => {
    if (!isNil(lastMessage)) {
      const date = Date.now();
      const messageDate = new Date(lastMessage.date);
      const hour = messageDate.getHours();
      const minute = messageDate.getMinutes();

      return `${hour}:${minute}`;
    }
  };

  prepareConversationImage = conversation => {
    const preparedParticipants = conversation.participants.filter(
      participant => participant._id !== this.props.user.data._id
    );
    const conversationName = this.prepareConversationName(
      conversation.name,
      conversation.participants
    );

    if (preparedParticipants.length === 1) {
      const desiredParticipant = get(preparedParticipants, '[0]');

      return <Avatar name={conversationName} imgUrl={desiredParticipant.avatar} size="medium" />;
    }
  };

  _keyExtractor = (item, index) => `${index}`;

  _renderItem = ({ item }) => {
    const conversationName = this.prepareConversationName(item.name, item.participants);
    const currentUser = this.props.user.data._id;
    const preparedParticipants = item.participants.filter(
      participant => participant._id !== currentUser
    );
    const conversationImage = this.prepareConversationImage(item);
    const lastMessage = prepareLastMessage(item.lastMessage);
    const lastMessageDate = this.prepareLastMessageDate(item.lastMessage);

    return (
      <ConversationListItem
        item={item}
        conversationName={conversationName}
        preparedParticipants={preparedParticipants}
        lastMessage={lastMessage}
        lastMessageDate={lastMessageDate}>
        {conversationImage}
      </ConversationListItem>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'column', flexGrow: 1 }}>
        <Header>
          <HeaderTitle>Wiadomości</HeaderTitle>
          {/* <HeaderIcon onPress={() => navigation.navigate('SettingsScreen')}>
              <MaterialCommunityIcons size={18} name="settings" color="#912F56" />
            </HeaderIcon> */}
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.conversations.fetching}
              onRefresh={this._onRefresh}
            />
          }>
          <SearchHeader />
          <FlatList
            data={this.props.conversations.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

class MessagesScreenWithSocket extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SocketContext.Consumer>
        {socket => <MessagesScreen {...this.props} socket={socket} />}
      </SocketContext.Consumer>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversations: getConversations(state),
    user: getUserData(state),
  };
};

const mapDispatchToProps = {
  fetchConversations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesScreenWithSocket);
