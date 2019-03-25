import React, { Component } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Input from "@/components/Input/Input";
import { Button } from "@/components/Buttons";

import { registerUser } from "@/actions/auth.actions";
import { getUserData } from "@/selectors/user.selectors";

class RegisterScreen extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.logged !== this.props.user.logged &&
      nextProps.user.logged
    ) {
      this.props.navigation.navigate("HomeScreen");
    }
  }

  onSubmit = values => {
    // this.props.registerUser(values);
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
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding">
          <View style={{ marginHorizontal: 10 }}>
            <Field
              name="username"
              placeholder="nazwa użytkownika"
              component={this.renderInput}
              iconName="account"
            />
            <Field
              name="email"
              placeholder="adres e-mail"
              component={this.renderInput}
              iconName="email"
            />
            <Field
              name="password"
              placeholder="hasło"
              component={this.renderInput}
              secureTextEntry
              iconName="lock"
            />
            <Field
              name="passwordConfirmation"
              placeholder="powtórz hasło"
              component={this.renderInput}
              secureTextEntry
              iconName="lock-reset"
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 30,
              alignSelf: "center",
              width: "60%"
            }}
          >
            <Button
              title="Zarejestruj się"
              wide
              onPress={this.props.handleSubmit(this.onSubmit)}
            />
          </View>
        </KeyboardAvoidingView>
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
  )(RegisterScreen)
);
