import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { isNil, isEqual, get } from 'lodash';

import { connect } from 'react-redux';
// import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import { prepareAvatar } from '../../helpers';
import { Header, HeaderTitle, HeaderIcon, HeaderLeftIcon } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Input from '@/components/Input/MessageInput';
import SocketContext from '@/helpers/socketContext';
import ConvListItem from './components/ConvListItem';

import { getUserData } from '@/selectors/user.selectors';
import {
  fetchConversation,
  pushNewMessage,
  sendPhoto,
  clearConversation,
} from '@/screens/MessagesScreen/actions/homeScreen.actions';
import { getConversation } from '@/screens/MessagesScreen/selectors/homeScreen.selectors';

class ConversationScreen extends React.Component {
  state = {
    messageInput: '',
    conversationId: null,
  };

  componentDidMount() {
    const {
      socket,
      navigation: {
        state: {
          params: { conversationId, photo },
        },
      },
    } = this.props;

    console.log('mounted');

    !isNil(conversationId) && this.props.fetchConversation(conversationId);
    // !isNil(photo) && console.log(photo);

    socket.on('message', this.pushMessage);

    socket.on('newConversation', conversationId => {
      this.setState({ conversationId });
    });
  }

  componentWillUnmount() {
    console.log('unmounted');
    this.props.clearConversation();
    this.props.socket.removeListener('message', this.pushMessage);
  }

  pushMessage = message => {
    console.log('message', message.messageContent);
    this.props.pushNewMessage(message);
  };

  componentWillReceiveProps(nextProps) {
    const {
      navigation: {
        state: {
          params: { photo },
        },
      },
    } = this.props;

    const {
      navigation: {
        state: {
          params: { photo: nextPhoto },
        },
      },
    } = nextProps;

    if (!isEqual(photo, nextPhoto) && nextPhoto) {
      this.handlePhotoSend(nextPhoto);
    }
  }

  handleChangeInput = text => {
    this.setState({ messageInput: text });
  };

  handleSubmit = () => {
    const {
      state: {
        params: { participants, conversationId },
      },
    } = this.props.navigation;

    const message = {
      userId: this.props.user.data._id,
      messageType: 'text',
      messageContent: this.state.messageInput,
    };
    const { socket } = this.props;
    this.setState({ messageInput: '' });
    console.log('emitted');
    socket.emit('message', conversationId, message, participants.map(elem => elem._id));
  };

  handleEmojiSend = e => {
    console.log(e.target);
    const {
      state: {
        params: { participants, conversationId },
      },
    } = this.props.navigation;

    const message = {
      userId: this.props.user.data._id,
      messageType: 'emoji',
      messageContent: get(this.props.conversation, 'data.emoji'),
    };
    const { socket } = this.props;
    this.setState({ messageInput: '' });
    socket.emit('message', conversationId, message, participants.map(elem => elem._id));
  };

  handlePhotoSend = async photo => {
    const {
      state: {
        params: { participants, conversationId },
      },
    } = this.props.navigation;
    let data = await this.props.sendPhoto(photo);

    const message = {
      userId: this.props.user.data._id,
      messageType: 'photo',
      messageContent: data.key,
      metadata: {
        width: data.width,
        height: data.height,
      },
    };

    const { socket } = this.props;
    socket.emit('message', conversationId, message, participants.map(elem => elem._id));
  };

  // _pickImage = async () => {
  //   const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   const {
  //     state: {
  //       params: { participants, conversationId },
  //     },
  //   } = this.props.navigation;
  //   const { socket } = this.props;
  //
  //   // only if user allows permission to camera roll
  //   if (cameraRollPerm === 'granted') {
  //     let pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
  //     console.log(pickerResult);
  //     // this.props.setUserAvatar(pickerResult);
  //     let data = await this.props.sendPhoto(pickerResult);
  //     const message = {
  //       userId: this.props.user.data._id,
  //       messageType: 'photo',
  //       messageContent: data.key,
  //       metadata: {
  //         width: data.width,
  //         height: data.height,
  //       },
  //     };
  //     socket.emit('message', conversationId, message, participants.map(elem => elem._id));
  //   }
  // };

  navigateToConversationInfo = () => {
    const {
      state: { params },
      navigate,
    } = this.props.navigation;

    console.log('to info');

    navigate({ routeName: 'ConversationInfoScreen', params });
  };

  _renderItem = ({ item }) => {
    return (
      <ConvListItem
        item={item}
        participants={this.props.navigation.state.params.participants}
        color={get(this.props.conversation, 'data.color', '#912F56')}
      />
    );
  };

  _keyExtractor = (item, index) => String(index);

  render() {
    const {
      goBack,
      state: {
        params: { participants, conversationId, conversationName },
      },
    } = this.props.navigation;

    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'column', flexGrow: 1 }}>
        <Header>
          <HeaderLeftIcon onPress={() => goBack(null)}>
            <Text>Icon</Text>
          </HeaderLeftIcon>
          <HeaderTitle color={get(this.props.conversation, 'data.color')}>
            {conversationName}
          </HeaderTitle>
          <HeaderIcon onPress={this.navigateToConversationInfo}>
<Text>Icon</Text>
          </HeaderIcon>
        </Header>
        <ScrollView ref="scrollView">
          <FlatList
            style={{ width: '100%' }}
            data={get(this.props.conversation, 'data.messages')}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onContentSizeChange={() => this.refs.scrollView.scrollToEnd()}
          />
        </ScrollView>
        <Footer>
          <View style={{ marginLeft: 10 }}>
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'CameraScreen',
                  params: this.props.navigation.state.params,
                })
              }>
              <Text>Camera</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ marginLeft: 10 }}>
            <TouchableWithoutFeedback onPress={this._pickImage}>
              <Text>icon</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 1, flexGrow: 1, marginHorizontal: 10 }}>
            <Input
              placeholder="Wiadomość..."
              value={this.state.messageInput}
              onChangeText={this.handleChangeInput}
              inputColor={get(this.props.conversation, 'data.color')}
            />
          </View>
          <View style={{ marginRight: 10 }}>
            {this.state.messageInput.length < 1 ? (
              <TouchableWithoutFeedback
                // onPress={this.handleEmojiSend}
                onLongPress={this.handleEmojiSend}>
                <View>
                  <Text style={{ fontSize: 24 }}>
                    {get(this.props.conversation, 'data.emoji', '')}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={this.handleSubmit}>
                <Text>Send</Text>
              </TouchableWithoutFeedback>
            )}
          </View>
        </Footer>
      </View>
    );
  }
}

class ConversationScreenWithSocket extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SocketContext.Consumer>
        {socket => <ConversationScreen {...this.props} socket={socket} />}
      </SocketContext.Consumer>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state),
    conversation: getConversation(state),
  };
};

const mapDispatchToProps = {
  fetchConversation,
  pushNewMessage,
  sendPhoto,
  clearConversation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationScreenWithSocket);
