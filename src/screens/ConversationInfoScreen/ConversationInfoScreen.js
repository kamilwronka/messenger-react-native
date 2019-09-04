import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  Alert
} from "react-native";
import { isNil, get } from "lodash";
import { ListItem, List } from "@/components/List";
import { updateConversationColor } from "@/actions/msg.actions";

import { connect } from "react-redux";

import withSocket from "@/hocs/withSocket.hoc";

import {
  Header,
  HeaderTitle,
  HeaderIconRight,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";
import { Footer } from "@/components/Footer";

import { getUserData } from "@/selectors/user.selectors";
import {
  fetchConversationInfo,
  pushNewMessage,
  setConversationColor,
  fetchConversationPhotos
} from "@/screens/MessagesScreen/actions/homeScreen.actions";
import {
  getConversationInfo,
  getConversationPhotos
} from "@/screens/MessagesScreen/selectors/homeScreen.selectors";
import ColorPicker from "./components/ColorPicker";

import { ScreenContainer } from "@/components/ScreenContainer";
import Switch from "@/components/Switch";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ConversationInfoScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    colorPickerVisible: false,
    emojiModalVisible: false,
    savePhotos: false,
    muteConversation: false
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

    socket.on("changeConversationColor", ({ color, conversationId }) => {
      this.props.updateConversationColor(conversationId, color);
    });

    this.props.fetchConversationInfo(conversationId);
    this.props.fetchConversationPhotos(conversationId, 0, 12);
  }

  prepareConversationImage = conversation => {
    if (!conversation) {
      return "";
    }
    const preparedParticipants = conversation.participants.filter(
      participant => participant._id !== this.props.user.data._id
    );

    if (preparedParticipants.length === 1) {
      const desiredParticipant = get(preparedParticipants, "[0]");

      if (desiredParticipant.avatar) {
        return `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
          desiredParticipant.avatar
        }`;
      } else {
        return "http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png";
      }
    }
  };

  setColorPickerVisibility = visibility => () => {
    this.setState({ colorPickerVisible: visibility });
  };

  setEmojiModalVisible = visible => {
    this.setState({ emojiModalVisible: visible });
  };

  toggleSavePhotos = () => {
    this.setState({ savePhotos: !this.state.savePhotos });
  };

  toggleMuteConversation = () => {
    this.setState({ muteConversation: !this.state.muteConversation });
  };

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "transparent"
        }}
      >
        <Image
          source={{
            uri: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
              item.messageContent
            }`
          }}
          style={{
            width: SCREEN_WIDTH / 3,
            height: SCREEN_WIDTH / 3,
            borderWidth: 2,
            borderColor: "transparent"
          }}
        />
      </View>
    );
  };

  render() {
    const {
      conversationInfo: { data },
      conversationPhotos,
      navigation: {
        goBack,
        state: {
          params: { participants, conversationId, conversationName }
        }
      }
    } = this.props;
    // console.log(conversationPhotos);

    console.log(data);

    return (
      !isNil(data) && (
        <ScreenContainer>
          <Header>
            <HeaderIconLeft
              iconName="chevron-left"
              onPress={() => this.props.navigation.goBack()}
              color="#ffffff"
              size={28}
            />
            <HeaderTitle color="#ffffff" value={conversationName} />
          </Header>
          <Modal
            animationType="slide"
            transparent={false}
            hardwareAccelerated
            visible={this.state.emojiModalVisible}
            onRequestClose={() => {
              this.setEmojiModalVisible(false);
            }}
          />
          <ColorPicker
            setColorPickerVisibility={this.setColorPickerVisibility}
            colorPickerVisible={this.state.colorPickerVisible}
            setConversationColor={this.props.setConversationColor}
            conversationId={conversationId}
          />

          <ScrollView style={{ flex: 1, flexDirection: "column", flexGrow: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 40
              }}
            >
              <TouchableOpacity onPress={this.setProfilePicture}>
                <Image
                  style={{
                    width: 112,
                    height: 112,
                    resizeMode: "cover",
                    borderRadius: 56,
                    borderWidth: 5,
                    borderColor: "#ffffff"
                  }}
                  source={{
                    uri:
                      data && data.avatar
                        ? `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                            data.avatar
                          }`
                        : "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 20,
                  alignSelf: "center",
                  color: "#ffffff"
                }}
              >
                Aktywny(a) 12 min temu
              </Text>
            </View>
            <List>
              <ListItem
                iconName="palette"
                value="Color"
                iconColor="#FFFFFF"
                iconBackground={get(data, "color", "#912F56")}
                onPress={this.setColorPickerVisibility(true)}
              />
              <ListItem
                iconName="emoticon"
                value="Emoji"
                iconColor="#FFFFFF"
                iconBackground="#E9AFA3"
              />
              <ListItem
                iconName="account-multiple"
                value="Nicknames"
                iconColor="#FFFFFF"
                iconBackground="#4C3B4D"
              />
              <View
                style={{
                  paddingHorizontal: 32,
                  width: "100%",
                  marginBottom: 20,
                  marginTop: 20
                }}
              >
                <Text style={{ fontSize: 20, color: "#ffffff" }}>More</Text>
              </View>
              <ListItem
                iconName="image"
                value="Save photos"
                iconColor="#FFFFFF"
                iconBackground="#3A405A"
              >
                <Switch
                  onChange={this.toggleSavePhotos}
                  value={this.state.savePhotos}
                />
              </ListItem>
              <ListItem
                iconName={this.state.muteConversation ? "bell-off" : "bell"}
                value="Mute conversation"
                iconColor="#FFFFFF"
                iconBackground="#6B0504"
              >
                <Switch
                  onChange={this.toggleMuteConversation}
                  value={this.state.muteConversation}
                />
              </ListItem>
            </List>
            <View
              style={{
                paddingHorizontal: 32,
                width: "100%",
                marginBottom: 20,
                marginTop: 20
              }}
            >
              <Text style={{ fontSize: 20, color: "#ffffff" }}>
                Shared multimedia
              </Text>
            </View>
            <FlatList
              data={get(conversationPhotos, "data.photos")}
              renderItem={this.renderItem}
              numColumns={3}
            />
          </ScrollView>
        </ScreenContainer>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state),
    conversationInfo: getConversationInfo(state),
    conversationPhotos: getConversationPhotos(state)
  };
};

const mapDispatchToProps = {
  fetchConversationInfo,
  fetchConversationPhotos,
  pushNewMessage,
  setConversationColor,
  updateConversationColor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSocket(ConversationInfoScreen));
