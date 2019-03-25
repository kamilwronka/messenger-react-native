import React, { PureComponent } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import { registerUser } from "@/actions/auth.actions";
import { getUserData } from "@/selectors/user.selectors";

import SignUpForm from "./components/SignUpForm";
import ButtonRound from "@/components/Buttons/ButtonRound";
import RoundInput from "@/components/Input/RoundInput";
import {
  Header,
  HeaderTitle,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";

const { height, width } = Dimensions.get("window");

class SignUpScreen extends PureComponent {
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

  handleSubmit = values => {
    this.props.registerUser(values);
  };

  goBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
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
            backgroundColor: "#5D2E46",
            borderBottomLeftRadius: width / 2
          }}
        />
        <View style={StyleSheet.absoluteFill}>
          <Header>
            <HeaderIconLeft
              onPress={this.goBack}
              iconName="chevron-left"
              color="#ffffff"
              size={28}
            />
            <HeaderTitle value="Sign up" color="#ffffff" />
          </Header>
          <SignUpForm component={this.renderInput} />
          <ButtonRound
            additionalStyle={styles.button}
            onPress={handleSubmit(this.handleSubmit)}
            indicatorActive={user.fetching}
            indicatorColor="#ffffff"
            value="SIGN UP"
            textColor="#ffffff"
          />
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
  registerUser
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    height: 48,
    width: width - 64,
    backgroundColor: "#AD6A6C",
    position: "absolute",
    top: height - 156
  }
});

export default reduxForm({
  form: "registerForm",
  initialValues: {
    email: "kamil@kamil.pl",
    password: "kamilo"
  }
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUpScreen)
);
