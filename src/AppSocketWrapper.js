import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Sound from "react-native-sound";
import { Vibration, AsyncStorage } from "react-native";
// import PushNotification from "react-native-push-notification";

import apiConfig from "./config/api_config";
import SocketContext from "@/helpers/socketContext";
import io from "socket.io-client";
import { getUserData } from "./selectors/user.selectors";
import { fetchConversations } from "./screens/MessagesScreen/actions/homeScreen.actions";
import { pushNotification } from "./screens/NotificationsScreen/actions/notifications.actions";

const VIBRATION_DURATION = 200;
const MESSAGE_SOUND = new Sound(
  "https://fsa.zobj.net/download/bHGd7vJCMekZuwAMEv0zfI-UYx8SuFlDM_7D9IdQA8I39EQwujqnkK3gHwWHYwTTxz8cT8ThIg_YT4E17Dj3fgn0gw9avkhFf2LIPlcOkanowoPx9nCnKl27k_RI/?a=web&c=72&f=messenger_2013.mp3&special=1553122204-kiSV4Uglth0zi%2FVahE9qpv7YwSGN1BJPNSXM0VeykJA%3D",
  null,
  error => {
    // console.log(error);
  }
);

class AppSocketWrapper extends PureComponent {
  state = {
    token: null,
    os: null
  };

  socket = io(apiConfig.ROOT_URL, {
    query: {
      token: this.props.user.token
    }
  });

  // pushNotifications = PushNotification.configure({
  //   // (optional) Called when Token is generated (iOS and Android)
  //   onRegister: async data => {
  //     await AsyncStorage.setItem("pushNotificationsKey", data.token);
  //   },

  //   // (required) Called when a remote or local notification is opened or received
  //   onNotification: function(notification) {},

  //   // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  //   senderID: "819638503388",

  //   // IOS ONLY (optional): default: all - Permissions to register.
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true
  //   },

  //   // Should the initial notification be popped automatically
  //   // default: true
  //   popInitialNotification: true,
  //   requestPermissions: true
  // });

  async componentDidMount() {
    const token = await AsyncStorage.getItem("pushNotificationsKey");
    this.setupListeners();
    if (this.props.user.logged) {
      if (this.socket) {
        this.socket.emit("newPushToken", token);
      }
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { logged } = this.props.user;
    const { logged: nextLogged } = nextProps.user;

    if (logged !== nextLogged || logged === true) {
      this.socket = io(apiConfig.ROOT_URL, {
        query: {
          token: nextProps.user.token
        }
      });
      const token = await AsyncStorage.getItem("pushNotificationsKey");
      this.socket.emit("newPushToken", token);
    }

    if (logged !== nextLogged && nextLogged === false) {
      this.socket.disconnect();
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  setupListeners = () => {
    this.socket.on("message", msg => {
      if (msg.userId !== this.props.user.data._id) {
        MESSAGE_SOUND.play();
        Vibration.vibrate(VIBRATION_DURATION);
      }
      this.props.fetchConversations();
    });

    this.socket.on("requestReceived", data => {
      console.log(data);
      this.props.pushNotification(data);
    });

    this.socket.on("requestSent", data => {
      if (data.error) {
        return alert(data.error);
      }
      alert(`Zaproszenie do użytkownika ${data.toUser} zostało wysłane.`);
    });
  };

  render() {
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
  fetchConversations,
  pushNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSocketWrapper);
