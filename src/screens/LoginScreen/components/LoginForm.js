import React from "react";
import { Field } from "redux-form";
import { Dimensions, View, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const LoginForm = ({ component }) => {
  return (
    <View style={{ marginTop: 48 }}>
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

export default LoginForm;
