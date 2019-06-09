import React from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { noop } from "lodash";
import { string, func } from "prop-types";

const ListItem = ({
  iconName,
  iconBackgroundColor,
  text,
  iconColor,
  onPress
}) => {
  console.log(iconBackgroundColor);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.listItemContainer}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconBackground,
              { backgroundColor: { iconBackgroundColor } }
            ]}
          >
            <Icon name={iconName} size={28} color={iconColor} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

ListItem.defaultProps = {
  iconColor: "#fff",
  iconBackgroundColor: "#4a4a4a",
  onPress: noop,
  text: ""
};

ListItem.propTypes = {
  iconColor: string,
  iconBackgroundColor: string,
  onPress: func,
  text: string,
  iconName: string.isRequired
};

export default ListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    height: 72,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 32,
    flexDirection: "row"
  },
  iconContainer: {
    height: 72,
    alignItems: "center",
    justifyContent: "center"
  },
  iconBackground: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 6 : 0
  },
  textContainer: {
    height: 72,
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#ffffff",
    fontSize: 18
  }
});
