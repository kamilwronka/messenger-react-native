import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { getUserData } from "../../selectors/user.selectors";

class AuthLoadingScreen extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  state = {
    authToken: null
  };

  componentDidMount() {
    const { logged } = this.props.user;

    if (logged) {
      this.props.navigation.navigate("HomeScreen");
    } else {
      this.props.navigation.navigate("WelcomeScreen");
    }
  }

  render() {
    return <View style={styles.container} />;
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state)
  };
};

export default connect(mapStateToProps)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
