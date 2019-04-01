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

import { connect } from "react-redux";
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
  setConversationColor
} from "@/screens/MessagesScreen/actions/homeScreen.actions";
import { getConversationInfo } from "@/screens/MessagesScreen/selectors/homeScreen.selectors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ConversationInfoScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalVisible: false,
    emojiModalVisible: false
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

    this.props.fetchConversationInfo(conversationId);
  }

  prepareConversationImage = conversation => {
    if (!conversation) {
      return "";
    }
    const preparedParticipants = conversation.participants.filter(
      participant => participant._id !== this.props.user.data._id
    );
    // const conversationName = this.prepareConversationName(
    //   conversation.name,
    //   conversation.participants
    // );

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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setEmojiModalVisible = visible => {
    this.setState({ emojiModalVisible: visible });
  };

  _keyExtractor = (item, index) => index;

  render() {
    const {
      conversationInfo: { data },
      navigation: {
        goBack,
        state: {
          params: { participants, conversationId, conversationName }
        }
      }
    } = this.props;

    const colors = [
      "#29335C",
      "#DB2B39",
      "#534D41",
      "#519E8A",
      "#243B4A",
      "#805E73",
      "#87BCDE",
      "#000000",
      "#66101F",
      "#8A8E91"
    ];

    return (
      !isNil(data) && (
        <View
          style={{
            flex: 1,
            backgroundColor: "#040D16",
            flexDirection: "column",
            flexGrow: 1
          }}
        >
          <Modal
            animationType="fade"
            transparent={false}
            hardwareAccelerated
            presentationStyle="pageSheet"
            visible={this.state.emojiModalVisible}
            onRequestClose={() => {
              this.setEmojiModalVisible(false);
            }}
          />

          <Modal
            animationType="fade"
            transparent={false}
            hardwareAccelerated={true}
            presentationStyle="pageSheet"
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>Wybierz sobie kolor ryjku</Text>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  height: SCREEN_HEIGHT / 2,
                  width: SCREEN_WIDTH - 200,
                  flexWrap: "wrap",
                  flexDirection: "row"
                }}
              >
                {colors.map(color => {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.props
                          .setConversationColor(conversationId, color)
                          .then(() => this.setModalVisible(false))
                      }
                    >
                      <View
                        style={{
                          height: 64,
                          width: 64,
                          backgroundColor: color
                        }}
                      />
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            </View>
          </Modal>
          <Header>
            <HeaderIconLeft
              iconName="chevron-left"
              onPress={() => this.props.navigation.goBack()}
              color="#ffffff"
              size={28}
            />
            <HeaderTitle color="#ffffff" value="Ustawienia" />
            <HeaderIconRight
              iconName="dots-vertcal"
              onPress={this.toggleSearchBar}
              color="#ffffff"
              size={28}
            />
          </Header>
          <ScrollView style={{ flex: 1, flexDirection: "column", flexGrow: 1 }}>
            <View
              style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={this._pickBackgroundImage}
              >
                <Image
                  style={{
                    flex: 1,
                    resizeMode: "cover",
                    height: SCREEN_WIDTH / 2.5,
                    width: SCREEN_WIDTH
                  }}
                  source={{
                    uri: get(data, "participants[0].backgroundImage", "")
                      ? `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${get(
                          data,
                          "participants[0].backgroundImage",
                          ""
                        )}`
                      : "https://media.boingboing.net/wp-content/uploads/2018/05/cool-background1.png"
                  }}
                />
              </TouchableOpacity>
              <View style={{ top: -56, zIndex: 2 }}>
                <TouchableOpacity onPress={this._pickImage}>
                  <Image
                    style={{
                      width: 112,
                      height: 112,
                      resizeMode: "cover",
                      borderRadius: 56,
                      borderWidth: 5,
                      borderColor: "#ffffff",
                      alignSelf: "center"
                    }}
                    source={{
                      uri: this.prepareConversationImage(data)
                    }}
                  />
                </TouchableOpacity>
                {/* <Text
                  style={{
                    fontSize: 26,
                    marginVertical: 10,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  {get(data.u}
                </Text> */}
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: 40,
                  flexGrow: 1,
                  flexDirection: "column"
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      width: SCREEN_WIDTH,
                      height: 48,
                      // alignItems: 'flex-end',
                      alignContent: "space-between",
                      flexWrap: "nowrap"
                      // flex: 1,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>Kolor</Text>
                    <View
                      style={{
                        height: 36,
                        width: 36,
                        borderRadius: 10,
                        backgroundColor: get(data, "color", "#912F56")
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => this.setEmojiModalVisible(true)}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      width: SCREEN_WIDTH,
                      height: 48,
                      // alignItems: 'flex-end',
                      alignContent: "space-between",
                      flexWrap: "nowrap"
                      // flex: 1,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>Emoji</Text>
                    <Text style={{ fontSize: 26 }}>{data.emoji}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      width: SCREEN_WIDTH,
                      height: 48,
                      // alignItems: 'flex-end',
                      alignContent: "space-between",
                      flexWrap: "nowrap"
                      // flex: 1,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>Nazwa konwersacji</Text>
                    {/* <Text>{get(data, '[0].name', '')}</Text> */}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
        </View>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state),
    conversationInfo: getConversationInfo(state)
  };
};

const mapDispatchToProps = {
  fetchConversationInfo,
  pushNewMessage,
  setConversationColor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationInfoScreen);
