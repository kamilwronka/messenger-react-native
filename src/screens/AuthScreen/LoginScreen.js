import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";
// import { EMITTER_EVENTS, emitter } from '@/helpers/emitter';

import { loginUser } from "@/actions/auth.actions";
import { getUserData } from "@/selectors/user.selectors";

import Input from "@/components/Input/Input";
import { Button } from "@/components/Buttons";

class LoginScreen extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      nextProps.user.logged !== this.props.user.logged &&
      nextProps.user.logged
    ) {
      this.props.navigation.navigate("HomeScreen");
    }
  }

  onSubmit = async values => {
    console.log(values);
    alert("submit");
    // this.props.loginUser(values);
  };

  renderInput = ({
    input,
    label,
    type,
    meta,
    secureTextEntry,
    iconName,
    placeholder
  }) => {
    return (
      <Input
        {...input}
        secureTextEntry={secureTextEntry}
        iconName={iconName}
        placeholder={placeholder}
      />
    );
  };

  render() {
    return (
      <View style={{ marginTop: 40 }}>
        <View style={{ marginHorizontal: 40 }}>
          <Field
            name="email"
            component={this.renderInput}
            placeholder="adres e-mail"
            iconName="email"
          />
          <Field
            name="password"
            component={this.renderInput}
            secureTextEntry
            placeholder="hasło"
            iconName="lock"
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 50,
            alignSelf: "center",
            width: "60%"
          }}
        >
          <Button
            title="Zaloguj się"
            wide
            onPress={this.props.handleSubmit(this.onSubmit)}
          />
          <Text>Nie masz konta? Zarejestruj się</Text>
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

export default LoginScreen;
