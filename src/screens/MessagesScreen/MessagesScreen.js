import React, { PureComponent } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { isNil, isArray, get } from "lodash";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";

import withSocket from "@/hocs/withSocket.hoc";

import SearchHeader from "../../components/SearchHeader";
import SocketContext from "@/helpers/socketContext";
import {
  Header,
  HeaderTitle,
  HeaderIconRight
} from "@/components/Header/HeaderNew";

import { fetchConversations } from "./actions/homeScreen.actions";
import { getConversations } from "./selectors/homeScreen.selectors";
import { getUserData } from "../../selectors/user.selectors";
import Avatar from "../../components/Avatar";
import ConversationListItem from "./components/ConversationListItem";

class MessagesScreen extends PureComponent {
  navigateToSettings = () => {
    this.props.navigation.navigate("SettingsScreen");
  };

  handleScreenFocus = () => {
    this.props.fetchConversations();
  };

  prepareConversationName = (name, participants) => {
    if (!isNil(name)) {
      return name;
    }

    const preparedParticipants = participants.filter(
      participant => participant._id !== this.props.user.data._id
    );

    if (preparedParticipants.length > 1 && isArray(preparedParticipants)) {
      let preparedName = "";
      preparedParticipants.map(participant => {
        preparedName = preparedName + participant.username + ", ";
      });
      return preparedName;
    } else {
      return get(preparedParticipants, "[0].username");
    }
  };

  prepareConversationImage = (imageUrl, name) => (
    <Avatar name={name} imgUrl={imageUrl} size="medium" />
  );

  _keyExtractor = (item, index) => `${index}`;

  _renderItem = ({ item }) => {
    const { participants, name, lastMessage } = item;
    const currentUser = this.props.user.data._id;

    const conversationName = this.prepareConversationName(name, participants);
    const preparedParticipants = participants.filter(
      participant => participant._id !== currentUser
    );
    const conversationImage = this.prepareConversationImage(
      null,
      conversationName
    );

    return (
      <ConversationListItem
        item={item}
        conversationName={conversationName}
        preparedParticipants={preparedParticipants}
        lastMessage={lastMessage}
      >
        {conversationImage}
      </ConversationListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this.handleScreenFocus} />
        <Header>
          <HeaderTitle value="Messages" color="#FFFFFF" />
          <HeaderIconRight
            iconName="settings"
            size={28}
            color="#ffffff"
            onPress={this.navigateToSettings}
          />
        </Header>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <SearchHeader />
          <FlatList
            data={this.props.conversations.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

class MessagesScreenWithSocket extends PureComponent {
  static navigationOptions = {
    header: null
  };

  render() {
    console.log(withSocket(MessagesScreen));
    return (
      <SocketContext.Consumer>
        {socket => <MessagesScreen {...this.props} socket={socket} />}
      </SocketContext.Consumer>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversations: getConversations(state),
    user: getUserData(state)
  };
};

const mapDispatchToProps = {
  fetchConversations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSocket(MessagesScreen));

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 24
  },
  container: {
    flex: 1,
    backgroundColor: "#040D16",
    flexDirection: "column"
  }
});
