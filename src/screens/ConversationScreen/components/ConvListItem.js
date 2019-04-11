import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { isNil, find } from "lodash";

import { prepareAvatar } from "@/helpers";
import { getUserData } from "@/selectors/user.selectors";
import ConversationPhoto from "./ConversationPhoto";
import ConversationVideo from "./ConversationVideo";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ConvListItem extends Component {
  state = {
    opened: false
  };

  handleClick = () => {
    this.setState({ opened: !this.state.opened });
  };

  colorsArr = ["#b0003a"];

  prepareMessageAvatar = (item, participants) => {
    const preparedUser = find(participants, { _id: item.userId });

    if (preparedUser) {
      if (preparedUser.avatar) {
        return (
          <Image
            style={{ height: 36, width: 36, borderRadius: 18, marginRight: 10 }}
            source={{
              uri: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                preparedUser.avatar
              }`
            }}
          />
        );
      } else {
        return (
          <View
            style={{
              borderRadius: 18,
              backgroundColor: this.colorsArr[
                Math.floor(Math.random() * this.colorsArr.length)
              ],
              height: 36,
              width: 36,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10
            }}
          >
            <Text style={{ color: "#fff", fontSize: 24 }}>
              {prepareAvatar(preparedUser.username)}
            </Text>
          </View>
        );
      }
    }
  };

  render() {
    const {
      item,
      isTheSameSender,
      participants,
      user: {
        data: { _id }
      }
    } = this.props;

    const isCurrentUser = item.userId === _id;
    console.log(isTheSameSender);

    switch (item.messageType) {
      case "text":
        return (
          <TouchableWithoutFeedback onPress={this.handleClick}>
            <View
              style={{
                marginLeft: isCurrentUser ? 60 : 20,
                marginRight: isCurrentUser ? 20 : 60
              }}
            >
              <View
                style={{
                  alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                  flexDirection: "row"
                }}
              >
                {this.prepareMessageAvatar(item, participants)}
                <View
                  style={{
                    minHeight: 36,
                    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                    backgroundColor:
                      item.userId !== _id ? "#cccccc" : this.props.color,
                    marginTop: isTheSameSender ? 0 : 20,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 18,
                    paddingHorizontal: 10,
                    paddingVertical: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 20,
                      color: !isCurrentUser ? "#000000" : "#FFFFFF"
                    }}
                  >
                    {item.messageContent}
                  </Text>
                </View>
              </View>
              {this.state.opened ? (
                <Text
                  style={{
                    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                    fontSize: 10,
                    color: "#cccccc"
                  }}
                >
                  {item.date}
                </Text>
              ) : (
                <Text
                  style={{
                    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                    fontSize: 10,
                    color: "#cccccc"
                  }}
                >
                  &nbsp;
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        );
      case "emoji":
        return (
          <View style={{ marginHorizontal: 20, flex: 1 }}>
            <Text
              style={{
                fontSize: 48,
                alignSelf: isCurrentUser ? "flex-end" : "flex-start"
              }}
            >
              {item.messageContent}
            </Text>
          </View>
        );
      case "photo":
        const { height, width } = item.metadata;
        const ratio = height / width;

        return (
          <ConversationPhoto
            id={_id}
            item={item}
            conversationName={this.props.conversationName}
          />
        );
      case "video":
        return <ConversationVideo video={item} id={_id} />;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state)
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(ConvListItem);
