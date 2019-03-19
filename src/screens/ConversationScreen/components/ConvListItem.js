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
      participants,
      user: {
        data: { _id }
      }
    } = this.props;

    switch (item.messageType) {
      case "text":
        return (
          <TouchableWithoutFeedback onPress={this.handleClick}>
            <View style={{ marginHorizontal: 20, flex: 1 }}>
              <View
                style={{
                  alignSelf: item.userId === _id ? "flex-end" : "flex-start",
                  flexDirection: "row"
                }}
              >
                {this.prepareMessageAvatar(item, participants)}
                <View
                  style={{
                    height: 36,
                    alignSelf: item.userId === _id ? "flex-end" : "flex-start",
                    backgroundColor:
                      item.userId !== _id ? "#cccccc" : this.props.color,
                    marginTop: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    paddingHorizontal: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: item.userId !== _id ? "#000000" : "#FFFFFF"
                    }}
                  >
                    {item.messageContent}
                  </Text>
                </View>
              </View>
              {this.state.opened ? (
                <Text
                  style={{
                    alignSelf: item.userId === _id ? "flex-end" : "flex-start",
                    fontSize: 10,
                    color: "#cccccc"
                  }}
                >
                  {item.date}
                </Text>
              ) : (
                <Text
                  style={{
                    alignSelf: item.userId === _id ? "flex-end" : "flex-start",
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
                alignSelf: item.userId === _id ? "flex-end" : "flex-start"
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
