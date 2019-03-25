import React, { PureComponent } from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { logoutUser } from "@/actions/auth.actions";

class SettingsList extends PureComponent {
  handleLogout = async () => {
    try {
      await this.props.logoutUser();
      this.props.navigation.navigate("WelcomeScreen");
    } catch (err) {
      this.props.navigation.navigate("WelcomeScreen");
    }
  };

  render() {
    return (
      <View>
        <View
          style={{ paddingHorizontal: 32, width: "100%", marginBottom: 20 }}
        >
          <Text style={{ fontSize: 20, color: "#ffffff" }}>Preferences</Text>
        </View>
        <TouchableWithoutFeedback>
          <View
            style={{
              height: 72,
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingHorizontal: 32,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                height: 72,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  backgroundColor: "#41337A",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="bell" size={28} color="#FFFFFF" />
              </View>
            </View>
            <View
              style={{
                height: 72,
                marginLeft: 16,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 18 }}>
                Notifications and sounds
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View
            style={{
              height: 72,
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingHorizontal: 32,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                height: 72,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  backgroundColor: "#456990",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="image" size={28} color="#FFFFFF" />
              </View>
            </View>
            <View
              style={{
                height: 72,
                marginLeft: 16,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 18 }}>Photos</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View
            style={{
              height: 72,
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingHorizontal: 32,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                height: 72,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  backgroundColor: "#003B36",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="signal" size={28} color="#FFFFFF" />
              </View>
            </View>
            <View
              style={{
                height: 72,
                marginLeft: 16,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 18 }}>
                Data saving
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            paddingHorizontal: 32,
            width: "100%",
            marginBottom: 20,
            marginTop: 20
          }}
        >
          <Text style={{ fontSize: 20, color: "#ffffff" }}>Account</Text>
        </View>
        <TouchableWithoutFeedback>
          <View
            style={{
              height: 72,
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingHorizontal: 32,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                height: 72,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  backgroundColor: "#456990",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="help" size={28} color="#FFFFFF" />
              </View>
            </View>
            <View
              style={{
                height: 72,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 16
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 18 }}>
                Help and support
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.handleLogout}>
          <View
            style={{
              height: 72,
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingHorizontal: 32,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                height: 72,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  backgroundColor: "#AD6A6C",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="logout" size={28} color="#FFFFFF" />
              </View>
            </View>
            <View
              style={{
                height: 72,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 16
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 18 }}>Log out</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(SettingsList));
