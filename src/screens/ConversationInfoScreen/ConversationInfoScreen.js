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
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF"
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
            animationType="slide"
            transparent={false}
            hardwareAccelerated
            visible={this.state.emojiModalVisible}
            onRequestClose={() => {
              this.setEmojiModalVisible(false);
            }}
          />
          <Modal
            animationType="slide"
            transparent={true}
            hardwareAccelerated={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                flexDirection: "column"
              }}
            >
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  height: SCREEN_HEIGHT / 2,
                  backgroundColor: "#fff",
                  padding: 20
                }}
              >
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Set your chat color
                </Text>
                <TouchableOpacity
                  onPress={() => this.setModalVisible(false)}
                  style={{ position: "absolute", right: 20, top: 20 }}
                >
                  <View
                    style={{
                      height: 36,
                      width: 36,
                      borderRadius: 18,
                      backgroundColor: "#f0f0f0",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Icon name="close" size={24} color="#000" />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 40
                  }}
                >
                  <FlatList
                    style={{ width: "100%", height: "100%" }}
                    contentContainerStyle={{ width: "100%" }}
                    data={colors}
                    numColumns={5}
                    renderItem={this.renderColorItem}
                    keyExtractor={this._keyExtractor}
                  />
                </View>
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
