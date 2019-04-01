import React, { Component } from "react";
import {
  Image,
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  RefreshControl
} from "react-native";

import { isNil } from "lodash";

import { connect } from "react-redux";
import { prepareAvatar } from "@/helpers";
import { Header, HeaderTitle } from "@/components/Header/HeaderNew";
import { Button } from "@/components/Buttons";
import SocketContext from "@/helpers/socketContext";

import {
  fetchNotifications,
  confirmRequest,
  ignoreRequest,
  pushNotification
} from "./actions/notifications.actions";
import { getNotifications } from "./selectors/notifications.selectors";

class NotificationsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  _onRefresh = () => {
    this.props.fetchNotifications();
  };

  componentDidMount() {
    this.props.fetchNotifications();
    this.props.socket.on("request", data => {
      this.props.pushNotification(data);
    });
  }

  formatMessage = (type, data) => {
    switch (type) {
      case "friendsRequest":
        return `Otrzymano zaproszenie do grona znajomych od użytkownika ${data}`;
      default:
    }
  };

  colorsArr = ["#b0003a", "#6a0080", "#002984", "#00675b"];

  confirmRequest = async id => {
    await this.props.confirmRequest(id);
    this.props.fetchNotifications();
  };

  ignoreRequest = async id => {
    await this.props.ignoreRequest(id);
    this.props.fetchNotifications();
  };

  _renderItem = ({ item }) => {
    const date = new Date(item.date).toLocaleDateString();

    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: 108,
            paddingHorizontal: 20,
            alignItems: "center"
          }}
        >
          <View>
            {!isNil(item.fromUser.avatar) ? (
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
                  {prepareAvatar(item.fromUser.username)}
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
            <Text style={{ fontSize: 14, color: "#fff" }}>
              {this.formatMessage(item.type, item.fromUser.username)}
            </Text>
            <View
              style={{
                marginTop: 5,
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                flexDirection: "row"
              }}
            >
              <Button
                title="Potwierdź"
                small
                onPress={() => this.confirmRequest(item._id)}
              />
              <Button
                title="Ignoruj"
                bright
                small
                onPress={() => this.ignoreRequest(item._id)}
              />
            </View>
          </View>
          {/* <View style={{ height: 48 }}>
            <Text style={{ fontSize: 12, color: '#000000', marginLeft: 10 }}>{date}</Text>
          </View> */}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  _keyExtractor = (item, index) => item._id;

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#040D16",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <Header>
          <HeaderTitle value="Notifications" color="#ffffff" />
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.notifications.fetching}
              onRefresh={this._onRefresh}
            />
          }
        >
          <FlatList
            data={this.props.notifications.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

class NotificationsScreenWithSocket extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SocketContext.Consumer>
        {socket => <NotificationsScreen {...this.props} socket={socket} />}
      </SocketContext.Consumer>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: getNotifications(state)
  };
};

const mapDispatchToProps = {
  fetchNotifications,
  confirmRequest,
  ignoreRequest,
  pushNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreenWithSocket);
