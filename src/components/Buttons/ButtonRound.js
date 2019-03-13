import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View
} from "react-native";

const ButtonRound = ({
  additionalStyle,
  indicatorActive,
  onPress,
  value,
  indicatorColor,
  textColor
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 24,
            flexDirection: "row"
          },
          { ...additionalStyle }
        ]}
      >
        <Text style={{ color: textColor }}>{value}</Text>
        <View style={{ right: 20, position: "absolute" }}>
          {indicatorActive && <ActivityIndicator color={indicatorColor} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonRound;
