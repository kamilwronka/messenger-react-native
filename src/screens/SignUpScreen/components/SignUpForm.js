import React from "react";
import { Field } from "redux-form";
import { Dimensions, View, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const SignUpForm = ({ component }) => {
  return (
    <View style={{ marginTop: 84 }}>
      <Field
        name="username"
        component={component}
        placeholder="Username"
        icon
        iconName="account"
        additionalStyle={styles.inputField}
      />
      <Field
        name="email"
        component={component}
        placeholder="E-mail address"
        icon
        iconName="email"
        additionalStyle={styles.inputField}
      />
      <Field
        name="password"
        component={component}
        secureTextEntry
        placeholder="Password"
        icon
        iconName="lock"
        additionalStyle={styles.inputField}
      />
      <Field
        name="repeatPassword"
        component={component}
        secureTextEntry
        placeholder="Repeat password"
        icon
        iconName="lock-reset"
        additionalStyle={styles.inputField}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    width: width - 64,
    height: 48,
    backgroundColor: "#FFFFFF",
    marginTop: 20
  }
});

export default SignUpForm;
