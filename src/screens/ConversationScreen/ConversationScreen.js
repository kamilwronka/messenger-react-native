import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
  RefreshControl,
  KeyboardAvoidingView,
  StatusBar
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
    scrolledTop: false
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

    console.log("mounted");

    !isNil(conversationId) &&
      Promise.all([
        this.props.fetchConversation(conversationId, 0, 20),
        this.props.fetchConversationInfo(conversationId)
      ]);

    // !isNil(photo) && console.log(photo);

    socket.on("message", this.pushMessage);

    socket.on("newConversation", conversationId => {
      this.setState({ conversationId });
    });
  }

  componentWillUnmount() {
    console.log("unmounted");
    this.props.clearConversation();
    this.props.socket.removeListener("message", this.pushMessage);
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
      fetchConversation(conversationId, this.state.page, 20);
    }
  }

  pushMessage = message => {
    console.log("message", message.messageContent);
    this.props.pushNewMessage(message);
  };

  onRefresh = () => {
    const { page } = this.state;
    console.log(page);
    this.setState({ page: page + 1 });
  };

  componentWillReceiveProps(nextProps) {
    const {
      navigation: {
        state: {
          params: { photo }
        }
      }
    } = this.props;

    const {
      navigation: {
        state: {
          params: { photo: nextPhoto }
        }
      }
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
    console.log("emitted");
    socket.emit(
      "message",
      conversationId,
      message,
      participants.map(elem => elem._id)
    );
  };

  handleEmojiSend = e => {
    console.log(e.target);
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

    console.log("to info");

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

  handleScrollingOnNewMessage = () => {
    !this.state.scrolledTop && this.refs.scrollView.scrollToEnd();
  };

  handleScroll = ({
    nativeEvent: { contentOffset, contentSize, layoutMeasurement }
  }) => {
    if (contentOffset.y + layoutMeasurement.height === contentSize.height) {
      this.setState({ scrolledTop: false });
    } else {
      this.setState({ scrolledTop: true });
    }
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
        style={{
          flex: 1,
          backgroundColor: "#040D16",
          flexDirection: "column"
        }}
      >
        <Header>
          <HeaderIconLeft
            iconName="chevron-left"
            onPress={() => goBack(null)}
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
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.props.conversation.fetching}
              onRefresh={this.onRefresh}
            />
          }
          ref="scrollView"
        >
          <FlatList
            style={{ width: "100%" }}
            data={messages}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onContentSizeChange={this.handleScrollingOnNewMessage}
          />
        </ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <ConversationBottomBar
            goToCamera={this.goToCamera}
            messageInput={this.state.messageInput}
            onInputFocus={() =>
              setTimeout(this.refs.scrollView.scrollToEnd, 100)
            }
            inputColor={color}
            handleSubmit={this.handleSubmit}
            handleChangeInput={this.handleChangeInput}
            handleEmojiSend={this.handleEmojiSend}
            emoji={emoji}
            handleImageSend={this.handleImageSend}
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
  clearConversation,
  fetchConversationInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationScreenWithSocket);
