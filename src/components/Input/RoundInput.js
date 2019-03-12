import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, View } from "react-native";
import { omit } from "lodash";

const RoundInput = props => {
  const { iconSize, icon, iconColor, iconName, additionalStyle, input } = props;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: 24,
          paddingLeft: 10,
          zIndex: 3
        },
        { ...additionalStyle }
      ]}
    >
      {icon && <Icon name={iconName} size={iconSize} color={iconColor} />}
      <TextInput
        style={{ paddingLeft: 6, height: 48 }}
        {...input}
        {...omit(props, ["meta", "input"])}
      />
    </View>
  );
};

RoundInput.defaultProps = {
  iconSize: 24,
  iconColor: "#040D16",
  icon: false
};

export default RoundInput;
