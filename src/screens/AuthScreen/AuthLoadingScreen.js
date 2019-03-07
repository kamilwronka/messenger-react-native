import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { isNil } from "lodash";
import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";

import { getUserData } from "../../selectors/user.selectors";

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    authToken: null
  };

  componentDidMount() {
    const { logged, intact } = this.props.user;

    console.log(logged);

    if (logged) {
      this.props.navigation.navigate("HomeScreen");
    } else {
      console.log("navigating to welcome screen");
      this.props.navigation.navigate("AuthScreen");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { logged, intact } = this.props.user;
    const { logged: newLoggedStatus, intact: newIntactStatus } = nextProps.user;

    console.log(newLoggedStatus);

    if (
      logged !== newLoggedStatus &&
      newLoggedStatus &&
      (intact !== newIntactStatus && !intact)
    ) {
      this.props.navigation.navigate("HomeScreen");
    } else {
      this.props.navigation.navigate("AuthScreen");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" transcluent />
      </View>
    );
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});