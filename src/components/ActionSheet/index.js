import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class ActionSheet extends PureComponent {
  renderActionSheetItems = () => {
    const { data, onDismiss } = this.props;

    return data.menuItems.map((item, index) => {
      const isCancelBtn = data.cancelButtonIndex === index;
      let onPress;

      if (isCancelBtn) {
        onPress = onDismiss;
      } else {
        onPress = () => {
          item.onPress();
          onDismiss();
        };
      }

      return (
        <TouchableNativeFeedback key={item.id} onPress={onPress}>
          <View style={styles.actionSheetItem}>
            {item.icon && (
              <View style={styles.iconContainer}>
                <Icon
                  name={item.icon}
                  size={24}
                  color={isCancelBtn ? "red" : "#000"}
                />
              </View>
            )}
            <View style={styles.actionSheetTextContainer}>
              <Text
                style={
                  isCancelBtn
                    ? styles.actionSheetTextCancel
                    : styles.actionSheetText
                }
              >
                {item.text}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      );
    });
  };

  render() {
    const { data, onDismiss } = this.props;
    const actionSheetItems = this.renderActionSheetItems();

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.actionSheet,
            { height: data.menuItems.length * styles.actionSheetItem.height }
          ]}
        >
          {actionSheetItems}
        </View>
      </View>
    );
  }
}

ActionSheet.defaultProps = {
  data: {
    menuItems: [],
    cancelButtonIndex: 0
  }
};

export default ActionSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionSheet: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    left: 0,
    right: 0
  },
  actionSheetItem: {
    height: 56,
    justifyContent: "flex-start",
    paddingLeft: 32,
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%"
  },
  actionSheetTextCancel: {
    color: "red"
  },
  actionSheetText: {
    color: "#000"
  },
  iconContainer: {
    height: 56,
    justifyContent: "center",
    marginRight: 16
  },
  actionSheetTextContainer: {
    height: 56,
    justifyContent: "center"
  }
});
