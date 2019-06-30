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

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ColorPicker extends PureComponent {
  onColorChange = item => () => {
    const {
      setConversationColor,
      setColorPickerVisibility,
      conversationId
    } = this.props;

    setConversationColor(conversationId, item).then(
      setColorPickerVisibility(false)
    );
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
                data={colors}
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

export default ColorPicker;

const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF"
];
