import React, { PureComponent } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { NavigationActions, withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { loginUser } from "@/actions/auth.actions";
import { getUserData } from "@/selectors/user.selectors";

import RoundInput from "@/components/Input/RoundInput";
import LoginForm from "./components/LoginForm";
import ButtonRound from "@/components/Buttons/ButtonRound";
import {
  HeaderIconLeft,
  Header,
  HeaderTitle
} from "@/components/Header/HeaderNew";

const { height, width } = Dimensions.get("window");

class LoginScreen extends PureComponent {
  static navigationOptions = {
    header: null
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.logged !== this.props.user.logged &&
      nextProps.user.logged
    ) {
      this.props.navigation.navigate("HomeScreen");
    }
  }

  goBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  handleSubmit = values => {
    this.props.loginUser(values);
  };

  renderInput = ({ ...obj }) => {
    return <RoundInput {...obj} />;
  };

  render() {
    const { handleSubmit, user } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "#040D16" }}>
        <View
          style={{
            height: height - 132,
            width,
            backgroundColor: "#AD6A6C",
            borderBottomLeftRadius: width / 2
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <Header>
              <HeaderIconLeft
                onPress={this.goBack}
                iconName="chevron-left"
                color="#ffffff"
                size={28}
              />
              <HeaderTitle value="Sign in" color="#ffffff" />
            </Header>
            <LoginForm component={this.renderInput} />
            <ButtonRound
              additionalStyle={styles.button}
              onPress={handleSubmit(this.handleSubmit)}
              indicatorActive={user.fetching}
              indicatorColor="#ffffff"
              value="SIGN IN"
              textColor="#ffffff"
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state)
  };
};

const mapDispatchToProps = {
  loginUser
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    height: 48,
    width: width - 64,
    backgroundColor: "#5D2E46",
    position: "absolute",
    bottom: -24
  }
});

export default reduxForm({
  form: "loginForm",
  initialValues: {
    email: "kamil@kamil.pl",
    password: "kamilo"
  }
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNavigation(LoginScreen))
);
