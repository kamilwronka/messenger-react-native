import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import { isNil, isEqual, get } from "lodash";

import { connect } from "react-redux";
// import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { prepareAvatar } from "../../helpers";
import {
  Header,
  HeaderTitle,
  HeaderIcon,
  HeaderLeftIcon
} from "@/components/Header";
import { Footer } from "@/components/Footer";
import SocketContext from "@/helpers/socketContext";
import ConvListItem from "./components/ConvListItem";

import { getUserData } from "@/selectors/user.selectors";
import {
  fetchConversation,
  pushNewMessage,
  sendPhoto,
  clearConversation
} from "@/screens/MessagesScreen/actions/homeScreen.actions";
import { getConversation } from "@/screens/MessagesScreen/selectors/homeScreen.selectors";
import ConversationBottomBar from "./components/ConversationBottomBar";

class ConversationScreen extends React.Component {
  state = {
    messageInput: "",
    conversationId: null
  };

  componentDidMount() {
    const {
      socket,
      navigation: {
        state: {
          params: { conversationId, photo }
        }
      }
    } = this.props;

    console.log("mounted");

    !isNil(conversationId) && this.props.fetchConversation(conversationId);
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

  pushMessage = message => {
    console.log("message", message.messageContent);
    this.props.pushNewMessage(message);
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
    return (
      <ConvListItem
        item={item}
        participants={this.props.navigation.state.params.participants}
        color={get(this.props.conversation, "data.color", "#912F56")}
      />
    );
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
    const messages = get(this.props.conversation, "data.messages");
    const emoji = get(this.props.conversation, "data.emoji");

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <Header>
          <HeaderLeftIcon onPress={() => goBack(null)}>
            <Icon name="arrow-left" size={28} color={color} />
          </HeaderLeftIcon>
          <HeaderTitle color={color}>{conversationName}</HeaderTitle>
          <HeaderIcon onPress={this.navigateToConversationInfo}>
            <Icon name="dots-vertical" size={28} color={color} />
          </HeaderIcon>
        </Header>
        <ScrollView ref="scrollView">
          <FlatList
            style={{ width: "100%" }}
            data={messages}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onContentSizeChange={() => this.refs.scrollView.scrollToEnd()}
          />
        </ScrollView>
        <ConversationBottomBar
          goToCamera={this.goToCamera}
          messageInput={this.state.messageInput}
          inputColor={color}
          handleSubmit={this.handleSubmit}
          handleChangeInput={this.handleChangeInput}
          handleEmojiSend={this.handleEmojiSend}
          emoji={emoji}
          handleImageSend={this.handleImageSend}
        />
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
  clearConversation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationScreenWithSocket);
