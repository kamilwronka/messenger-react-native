import React, { Component } from "react";
import { connect } from "react-redux";
import Sound from "react-native-sound";
import { Vibration } from "react-native";

import apiConfig from "./config/api_config";
import SocketContext from "@/helpers/socketContext";
import io from "socket.io-client";
import { getUserData } from "./selectors/user.selectors";
import { fetchConversations } from "./screens/MessagesScreen/actions/homeScreen.actions";

const VIBRATION_DURATION = 200;

class AppSocketWrapper extends Component {
  socket = io(apiConfig.ROOT_URL, {
    query: {
      token: this.props.user.token
    }
  });

  sound = new Sound(
    "https://fsa.zobj.net/download/bHGd7vJCMekZuwAMEv0zfI-UYx8SuFlDM_7D9IdQA8I39EQwujqnkK3gHwWHYwTTxz8cT8ThIg_YT4E17Dj3fgn0gw9avkhFf2LIPlcOkanowoPx9nCnKl27k_RI/?a=web&c=72&f=messenger_2013.mp3&special=1553122204-kiSV4Uglth0zi%2FVahE9qpv7YwSGN1BJPNSXM0VeykJA%3D",
    null,
    error => {
      console.log(error);
    }
  );

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (
      this.props.user.logged !== nextProps.user.logged ||
      nextProps.user.logged === true
    ) {
      this.socket = io(apiConfig.ROOT_URL, {
        query: {
          token: nextProps.user.token
        }
      });
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    this.socket.on("message", msg => {
      if (msg.userId !== this.props.user.data._id) {
        this.sound.play();
        Vibration.vibrate(VIBRATION_DURATION);
      }
      this.props.fetchConversations();
    });

    return (
      <SocketContext.Provider value={this.socket}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state)
  };
};

const mapDispatchToProps = {
  fetchConversations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSocketWrapper);
