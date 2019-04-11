import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
  Animated,
  RefreshControl,
  KeyboardAvoidingView
} from "react-native";
import { isNil, isEqual, get } from "lodash";
import { emitter, EMITTER_EVENTS } from "@/helpers/emitter";

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

const SCROLLED_OFFSET = 100;

class ConversationScreen extends React.Component {
  state = {
    messageInput: "",
    conversationId: null,
    page: 0,
    scrolledTop: false,
    scrollViewShow: new Animated.Value(0),
    initialAnimationShow: true
  };

  componentDidMount() {
    const {
      navigation: {
        state: {
          params: { conversationId }
        }
      }
    } = this.props;

    !isNil(conversationId) &&
      Promise.all([
        this.props.fetchConversation(conversationId, 0, 20),
        this.props.fetchConversationInfo(conversationId)
      ]);
    this.setupListeners();
  }

  componentWillUnmount() {
    this.props.clearConversation();
    this.removeListeners();
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

    if (
      this.state.initialAnimationShow &&
      !this.state.scrolledTop &&
      this.state.scrolledTop !== prevState.scrolledTop
    ) {
      Animated.timing(this.state.scrollViewShow, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true
      }).start(() => {
        this.setState({ initialAnimationShow: false });
      });
    }
  }

  setupListeners = () => {
    const { socket } = this.props;

    socket.on("message", this.pushMessage);

    this.actionSheetListener = emitter.addListener(
      EMITTER_EVENTS.MESSAGE_INPUT_RESIZE,
      this.handleScrollingOnNewMessage
    );
  };

  removeListeners = () => {
    this.actionSheetListener && this.actionSheetListener.remove();
    this.props.socket &&
      this.props.socket.removeListener("message", this.pushMessage);
  };

  handleGoBack = () => {
    this.props.navigation.goBack(null);
  };

  pushMessage = message => {
    this.props.pushNewMessage(message);
  };

  onRefresh = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
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

  _renderItem = ({ item, index }) => {
    const {
      state: {
        params: {
          participants,
          conversationId,
          conversationName,
          conversationColor
        }
      }
    } = this.props.navigation;
    const messages = get(
      this.props.conversation,
      "data.messagesContainer.messages"
    );
    let isTheSameSender = false;

    if (index > 0) {
      if (item.userId === get(messages, `[${index - 1}].userId`)) {
        isTheSameSender = true;
      }
    }

    return (
      <ConvListItem
        item={item}
        participants={participants}
        color={conversationColor}
        conversationName={conversationName}
        conversationId={conversationId}
        isTheSameSender={isTheSameSender}
      />
    );
  };

  handleScrollingOnNewMessage = () => {
    console.log(this.state.scrolledTop);
    !this.state.scrolledTop && this.refs.scrollView.scrollToEnd();
    // this.refs.scrollView.scrollToEnd();
  };

  handleScroll = ({
    nativeEvent: { contentOffset, contentSize, layoutMeasurement }
  }) => {
    if (
      contentOffset.y + layoutMeasurement.height >=
      contentSize.height - SCROLLED_OFFSET
    ) {
      this.setState({ scrolledTop: false });
    } else {
      this.setState({ scrolledTop: true });
    }
  };

  _keyExtractor = (item, index) => String(index);

  render() {
    const {
      state: {
        params: { conversationName, conversationColor }
      }
    } = this.props.navigation;
    const color = conversationColor;
    const messages = get(
      this.props.conversation,
      "data.messagesContainer.messages"
    );
    const emoji = get(this.props.conversation, "data.emoji");

    const scrollViewContainerStyles = {
      opacity: this.state.scrollViewShow.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

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
        <Animated.View
          style={[
            { flex: 1, flexDirection: "column" },
            scrollViewContainerStyles
          ]}
        >
          <ScrollView
            onScroll={this.handleScroll}
            scrollEventThrottle={50}
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
        </Animated.View>
        <KeyboardAvoidingView behavior="padding">
          <ConversationBottomBar
            goToCamera={this.goToCamera}
            messageInput={this.state.messageInput}
            onInputFocus={() =>
              setTimeout(this.handleScrollingOnNewMessage, 100)
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
  sendVideo,
  clearConversation,
  fetchConversationInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationScreenWithSocket);
