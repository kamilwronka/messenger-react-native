import React, { PureComponent } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import withSocket from "@/hocs/withSocket.hoc";
import { colorsArr } from "@/constants/Colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ColorPicker extends PureComponent {
  componentDidMount() {
    const { socket, setColorPickerVisibility } = this.props;

    socket.on("changeConversationColor", setColorPickerVisibility(false));
  }

  onColorChange = color => () => {
    const { socket } = this.props;
    const { conversationId } = this.props;

    socket.emit("changeConversationColor", { conversationId, color });
  };

  renderColorItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={this.onColorChange(item)}>
        <View
          style={{
            height: SCREEN_WIDTH / 5 - 16,
            width: SCREEN_WIDTH / 5 - 16,
            backgroundColor: item,
            margin: 4
          }}
        />
      </TouchableWithoutFeedback>
    );
  };

  _keyExtractor = (item, index) => index;

  render() {
    const { colorPickerVisible, setColorPickerVisibility } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        hardwareAccelerated={true}
        visible={colorPickerVisible}
        onRequestClose={setColorPickerVisibility(false)}
      >
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={styles.header}>Set your chat color</Text>
            <TouchableOpacity
              onPress={setColorPickerVisibility(false)}
              style={styles.touchableContainer}
            >
              <View style={styles.iconContainer}>
                <Icon name="close" size={24} color="#000" />
              </View>
            </TouchableOpacity>
            <View style={styles.flatListContainer}>
              <FlatList
                style={styles.flatList}
                contentContainerStyle={{ width: "100%" }}
                data={colorsArr}
                numColumns={5}
                renderItem={this.renderColorItem}
                keyExtractor={this._keyExtractor}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "column"
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    height: SCREEN_HEIGHT / 2,
    backgroundColor: "#fff",
    padding: 20
  },
  flatList: { width: "100%", height: "100%" },
  flatListContainer: {
    marginTop: 20,
    marginBottom: 40
  },
  iconContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center"
  },
  touchableContainer: { position: "absolute", right: 20, top: 20 },
  header: { fontSize: 22, fontWeight: "bold" }
});

export default withSocket(ColorPicker);
