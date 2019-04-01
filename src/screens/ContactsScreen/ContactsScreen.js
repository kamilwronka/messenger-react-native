import React, { PureComponent } from "react";
import {
  Image,
  Platform,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  RefreshControl
} from "react-native";
import SearchHeader from "@/components/SearchHeader";
import { isNil } from "lodash";

import { connect } from "react-redux";
import { prepareAvatar } from "../../helpers";
import {
  Header,
  HeaderTitle,
  HeaderIconRight
} from "@/components/Header/HeaderNew";

import { fetchFriends } from "./actions/contactsScreen.actions";
import { getFriends } from "./selectors/contactsScreen.selectors";

class ContactsScreen extends PureComponent {
  static navigationOptions = {
    header: null
  };

  state = {
    isSearchBarOpened: false,
    searchValue: "",
    active: false
  };

  colorsArr = ["#b0003a", "#6a0080", "#002984", "#00675b"];

  componentDidMount() {
    this.props.fetchFriends();
  }

  _onRefresh = () => {
    this.props.fetchFriends();
  };

  navigateToSettings = () => {
    this.props.navigation.navigate("SettingsScreen");
  };

  handleFriendRequest = userId => {
    this.props.sendFriendRequest(userId).then(res => {
      alert(res.value.data.data);
    });
  };

  goToConversation = item => {
    const { navigate } = this.props.navigation;

    navigate("Conversation", {
      participants: [item],
      conversationName: item.username
    });
  };

  goToSearchScreen = () => {
    this.props.navigation.navigate("Search");
  };

  _keyExtractor = (item, index) => `${index}`;

  _renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.goToConversation(item)}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: 72,
            paddingHorizontal: 20,
            alignItems: "center"
          }}
        >
          <View>
            {!isNil(item.avatar) ? (
              <Image
                style={{ height: 56, width: 56, borderRadius: 28 }}
                source={{
                  uri: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                    item.avatar
                  }`
                }}
              />
            ) : (
              <View
                style={{
                  borderRadius: 28,
                  backgroundColor: this.colorsArr[
                    Math.floor(Math.random() * this.colorsArr.length)
                  ],
                  height: 56,
                  width: 56,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: "#fff", fontSize: 24 }}>
                  {prepareAvatar(item.username)}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              marginLeft: 20,
              flex: 1,
              alignContent: "space-between",
              flexWrap: "nowrap"
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#ffffff" }}
            >
              {item.username}
            </Text>
            <Text style={{ fontSize: 14, color: "#aaaaaa" }}>
              3 wspólnych znajomych
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#040D16",
          flexDirection: "column"
        }}
      >
        <Header>
          <HeaderTitle value="Contacts" color="#ffffff" />
          <HeaderIconRight
            iconName="settings"
            size={28}
            color="#ffffff"
            onPress={this.navigateToSettings}
          />
        </Header>
        <ScrollView
          contentContainerStyle={{
            marginTop: 24
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.friends.fetching}
              onRefresh={this._onRefresh}
            />
          }
        >
          <SearchHeader />
          <FlatList
            style={{ width: "100%" }}
            data={this.props.friends.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    friends: getFriends(state)
  };
};

const mapDispatchToProps = {
  fetchFriends
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsScreen);
