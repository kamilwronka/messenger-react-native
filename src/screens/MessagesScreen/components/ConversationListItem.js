import React, { PureComponent } from "react";
import { Text, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { isEmpty, isNil } from "lodash";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import { getUserData } from "@/selectors/user.selectors";
import { prepareLastMessage, prepareLastMessageDate } from "@/helpers";

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
        conversationName
      }
    });
  };

  render() {
    const {
      preparedParticipants,
      conversationName,
      children,
      lastMessage,
      user
    } = this.props;

    const lastMessagePrefix =
      user.data._id === lastMessage.userId ? "You: " : "";
    const lastMessageContent = prepareLastMessage(lastMessage);
    const lastMessageDate = prepareLastMessageDate(lastMessage);

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
                <Text numberOfLines={1} style={styles.lastMessageContent}>
                  {lastMessagePrefix + lastMessageContent}
                </Text>
              )}
            </View>
            <View style={{ height: 48 }}>
              <Text style={styles.lastMessageDate}>{lastMessageDate}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state)
  };
};

export default connect(mapStateToProps)(withNavigation(ConversationListItem));

const styles = StyleSheet.create({
  lastMessageDate: { fontSize: 14, color: "#bbbbbb" },
  lastMessageContent: {
    fontSize: 14,
    color: "#bbbbbb"
  }
});
