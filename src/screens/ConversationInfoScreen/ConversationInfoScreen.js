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
  Animated
} from "react-native";
import { isNil, get } from "lodash";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
import ColorPickPrompt from "./components/ColorPickPrompt";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ConversationInfoScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalVisible: false,
    emojiModalVisible: false,
    opacityAnimation: new Animated.Value(0)
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

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  setEmojiModalVisible = visible => {
    this.setState({ emojiModalVisible: visible });
  };

  renderColorItem = ({ item }) => {
    const { conversationId } = this.props.navigation.state.params;

    console.log(item);

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props
            .setConversationColor(conversationId, item)
            .then(() => this.setModalVisible(false))
        }
      >
        <View
          style={{
            height: SCREEN_WIDTH / 5 - 16,
            width: SCREEN_WIDTH / 5 - 16,
            backgroundColor: item,
            margin: 4
          }}
        />
      </TouchableWithoutFeedback>
    );
  };

  onModalShow = () => {
    Animated.timing(this.state.opacityAnimation, {
      toValue: 0.2,
      duration: 300
    }).start();
  };

  onModalDismiss = () => {
    Animated.timing(this.state.opacityAnimation, {
      toValue: 0,
      duration: 100
    }).start();
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

    const modalStyles = {
      backgroundColor: "#000",
      opacity: this.state.opacityAnimation
    };

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
            animationType="slide"
            transparent={false}
            hardwareAccelerated
            visible={this.state.emojiModalVisible}
            onRequestClose={() => {
              this.setEmojiModalVisible(false);
            }}
          />
          <ColorPickPrompt
            onModalDismiss={this.onModalDismiss}
            onModalShow={this.onModalShow}
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            modalStyles={modalStyles}
            keyExtractor={this._keyExtractor}
            renderColorItem={this.renderColorItem}
          />
          <Header>
            <HeaderIconLeft
              iconName="chevron-left"
              onPress={() => this.props.navigation.goBack()}
              color="#ffffff"
              size={28}
            />
            <HeaderTitle color="#ffffff" value="Ustawienia" />
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
