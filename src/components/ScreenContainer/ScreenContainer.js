import React from "react";
import { View, StyleSheet } from "react-native";
import { object, string, node } from "prop-types";

import colors from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexGrow: 1
  }
});

const ScreenContainer = ({ backgroundColor, children, style }) => {
  const mergedStyles = [styles.container, { backgroundColor }, style];

  return (
    <View renderToHardwareTextureAndroid style={mergedStyles}>
      {children}
    </View>
  );
};

ScreenContainer.defaultProps = {
  backgroundColor: colors.screenBackgroundColor,
  style: {}
};

ScreenContainer.propTypes = {
  style: object,
  backgroundColor: string,
  children: node
};

export default ScreenContainer;
