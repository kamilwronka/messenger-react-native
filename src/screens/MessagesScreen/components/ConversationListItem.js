import React, { PureComponent } from "react";
import { Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import { isEmpty, isNil } from "lodash";
import { withNavigation } from "react-navigation";

class ConversationListItem extends PureComponent {
  handleConversationSelect = () => {
    const {
      item,
      preparedParticipants,
      conversationName,
      navigation
    } = this.props;

    navigation.navigate({
      routeName: "ConversationScreen",
      params: {
        conversationId: item._id,
        participants: preparedParticipants,
        conversationName,
        conversationColor: item.color
      }
    });
  };

  render() {
    const {
      preparedParticipants,
      conversationName,
      children,
      lastMessage,
      lastMessageDate
    } = this.props;

    return (
      !isEmpty(preparedParticipants) && (
        <TouchableWithoutFeedback onPress={this.handleConversationSelect}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              height: 72,
              paddingHorizontal: 25,
              backgroundColor: "transparent",
              alignItems: "center"
            }}
          >
            <View>{children}</View>
            <View
              style={{
                marginLeft: 20,
                flex: 1,
                alignContent: "space-between",
                flexWrap: "nowrap"
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#ffffff", fontWeight: "bold" }}
              >
                {conversationName}
              </Text>
              {!isNil(lastMessage) && (
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 14, color: "#bbbbbb", paddingRight: 20 }}
                >
                  {lastMessage}
                </Text>
              )}
            </View>
            <View style={{ height: 48 }}>
              {!isNil(lastMessage) && (
                <Text style={{ fontSize: 12, color: "#bbbbbb" }}>
                  {lastMessageDate}
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    );
  }
}

export default withNavigation(ConversationListItem);
