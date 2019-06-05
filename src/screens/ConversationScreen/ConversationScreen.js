import React, { Component } from "react";
import {
  ScrollView,
  View,
  FlatList,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { isNil, isEqual, get } from "lodash";

import { connect } from "react-redux";

import {
  Header,
  HeaderTitle,
  HeaderIconRight,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";
import { Footer } from "@/components/Footer";
import SocketContext from "@/helpers/socketContext";
import ConvListItem from "./components/ConvListItem";

import { getUserData } from "@/selectors/user.selectors";
import {
  fetchConversation,
  pushNewMessage,
  sendPhoto,
  sendVideo,
  clearConversation,
  fetchConversationInfo
} from "@/screens/MessagesScreen/actions/homeScreen.actions";
import { getConversation } from "@/screens/MessagesScreen/selectors/homeScreen.selectors";
import ConversationBottomBar from "./components/ConversationBottomBar";

class ConversationScreen extends React.Component {
  state = {
    messageInput: "",
    conversationId: null,
    page: 0,
    keyboardHeight: 0,
    endEverReached: false,
    scrolled: false
  };

  componentDidMount() {
    const {
      socket,
      navigation: {
        state: {
          params: { conversationId }
        }
      }
    } = this.props;

    !isNil(conversationId) &&
      Promise.all([
        this.props.fetchConversation(conversationId, 0, 10),
        this.props.fetchConversationInfo(conversationId)
      ]);

    socket.on("message", this.pushMessage);

    Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
  }

  componentWillUnmount() {
    this.props.clearConversation();
    this.props.socket.removeListener("message", this.pushMessage);
    Keyboard.removeListener("keyboardDidShow", this._keyboardDidShow);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      fetchConversation,
      navigation: {
        state: {
          params: { conversationId }
        }
      }
    } = this.props;

    if (prevState.page !== this.state.page) {
      fetchConversation(conversationId, this.state.page, 10);
    }
  }

  _keyboardDidShow = e => {
    console.log(e);
    this.setState({ keyboardHeight: e.endCoordinates.height });
    this.scrollToEnd();
  };

  handleGoBack = () => {
    this.props.navigation.goBack(null);
  };

  pushMessage = message => {
    this.props.pushNewMessage(message);
  };

  loadMoreData = () => {
    const { page } = this.state;
    !this.props.conversation.fetching && this.setState({ page: page + 1 });
  };

  componentWillReceiveProps(nextProps) {
    const {
      navigation: {
        state: {
          params: { photo, video }
        }
      }
    } = this.props;

    const {
      navigation: {
        state: {
          params: { photo: nextPhoto, video: nextVideo }
        }
      }
    } = nextProps;

    if (!isEqual(photo, nextPhoto) && nextPhoto) {
      this.handlePhotoSend(nextPhoto);
    }
    if (!isEqual(video, nextVideo) && nextVideo) {
      this.handleVideoSend(nextVideo);
    }
  }

  handleChangeInput = text => {
    this.setState({ messageInput: text });
  };

  handleSubmit = () => {
    const {
      state: {
        params: { participants, conversationId }
      }
    } = this.props.navigation;

    const message = {
      userId: this.props.user.data._id,
      messageType: "text",
      messageContent: this.state.messageInput
    };
    const { socket } = this.props;
    this.setState({ messageInput: "" });
    socket.emit(
      "message",
      conversationId,
      message,
      participants.map(elem => elem._id)
    );
  };

  handleEmojiSend = e => {
    const {
      state: {
        params: { participants, conversationId }
      }
    } = this.props.navigation;

    const message = {
      userId: this.props.user.data._id,
      messageType: "emoji",
      messageContent: get(this.props.conversation, "data.emoji")
    };
    const { socket } = this.props;
    this.setState({ messageInput: "" });
    socket.emit(
      "message",
      conversationId,
      message,
      participants.map(elem => elem._id)
    );
  };

  goToCamera = () => {
    this.props.navigation.navigate({
      routeName: "CameraScreen",
      params: this.props.navigation.state.params
    });
  };

  handlePhotoSend = async photo => {
    const {
      state: {
        params: { participants, conversationId }
      }
    } = this.props.navigation;
    let data = await this.props.sendPhoto(photo);

    const message = {
      userId: this.props.user.data._id,
      messageType: "photo",
      messageContent: data.key,
      metadata: {
        width: data.width,
        height: data.height
      }
    };

    const { socket } = this.props;
    socket.emit(
      "message",
      conversationId,
      message,
      participants.map(elem => elem._id)
    );
  };

  handleVideoSend = async video => {
    const {
      state: {
        params: { participants, conversationId }
      }
    } = this.props.navigation;
    let data = await this.props.sendVideo(video);

    const message = {
      userId: this.props.user.data._id,
      messageType: "video",
      messageContent: data.key
    };

    const { socket } = this.props;
    socket.emit(
      "message",
      conversationId,
      message,
      participants.map(elem => elem._id)
    );
  };

  handleImageSend = async pickerResult => {
    const {
      state: {
        params: { participants, conversationId }
      }
    } = this.props.navigation;
    const { socket } = this.props;
    let data = await this.props.sendPhoto(pickerResult);

    const message = {
      userId: this.props.user.data._id,
      messageType: "photo",
      messageContent: data.key,
      metadata: {
        width: data.width,
        height: data.height
      }
    };

    socket.emit(
      "message",
      conversationId,
      message,
      participants.map(elem => elem._id)
    );
  };

  navigateToConversationInfo = () => {
    const {
      state: { params },
      navigate
    } = this.props.navigation;

    navigate({ routeName: "ConversationInfoScreen", params });
  };

  _renderItem = ({ item }) => {
    const {
      state: {
        params: { participants, conversationId, conversationName }
      }
    } = this.props.navigation;

    return (
      <ConvListItem
        item={item}
        participants={participants}
        color={get(this.props.conversation, "data.color", "#912F56")}
        conversationName={conversationName}
        conversationId={conversationId}
      />
    );
  };

  scrollToEnd = () => {
    !this.state.scrolled && setTimeout(this.refs.scrollView.scrollToEnd, 100);
  };

  _keyExtractor = (item, index) => String(index);

  render() {
    const {
      goBack,
      state: {
        params: { participants, conversationId, conversationName }
      }
    } = this.props.navigation;
    const color = get(this.props.conversation, "data.color");
    const messages = get(
      this.props.conversation,
      "data.messagesContainer.messages"
    );
    const emoji = get(this.props.conversation, "data.emoji");

    return (
      <View
        renderToHardwareTextureAndroid
        style={{
          flex: 1,
          backgroundColor: "#040D16",
          flexDirection: "column"
        }}
      >
        <Header>
          <HeaderIconLeft
            iconName="chevron-left"
            onPress={this.handleGoBack}
            color={color}
            size={28}
          />
          <HeaderTitle value={conversationName} color={color} />
          <HeaderIconRight
            iconName="dots-vertical"
            size={28}
            color={color}
            onPress={this.navigateToConversationInfo}
          />
        </Header>
        <ScrollView
          onScroll={e => {
            console.log(e.nativeEvent);
            if (e.nativeEvent.contentOffset.y < 300) {
              this.state.endEverReached && this.loadMoreData();
            }

            if (
              e.nativeEvent.contentOffset.y +
                e.nativeEvent.layoutMeasurement.height >
              e.nativeEvent.contentSize.height - 100
            ) {
              this.setState({ endEverReached: true });
            }
            if (
              e.nativeEvent.contentOffset.y +
                e.nativeEvent.layoutMeasurement.height <
              e.nativeEvent.contentSize.height
            ) {
              this.setState({ scrolled: true });
            }
          }}
          scrollEventThrottle={50}
          ref="scrollView"
        >
          <FlatList
            style={{ width: "100%" }}
            data={messages}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onContentSizeChange={this.scrollToEnd}
            inverted
            initialNumToRender={10}
          />
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
          <ConversationBottomBar
            goToCamera={this.goToCamera}
            messageInput={this.state.messageInput}
            inputColor={color}
            handleSubmit={this.handleSubmit}
            handleChangeInput={this.handleChangeInput}
            handleEmojiSend={this.handleEmojiSend}
            emoji={emoji}
            handleImageSend={this.handleImageSend}
            keyboardHeight={this.state.keyboardHeight}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

class ConversationScreenWithSocket extends Component {
  static navigationOptions = {
    header: null
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
    conversation: getConversation(state)
  };
};

const mapDispatchToProps = {
  fetchConversation,
  pushNewMessage,
  sendPhoto,
  sendVideo,
  clearConversation,
  fetchConversationInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationScreenWithSocket);
