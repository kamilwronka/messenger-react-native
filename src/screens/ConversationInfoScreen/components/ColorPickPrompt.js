import React from "react";
import {
  Animated,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const ColorPickPrompt = ({
  onModalDismiss,
  onModalShow,
  setModalVisible,
  modalVisible,
  modalStyles,
  keyExtractor,
  renderColorItem
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      hardwareAccelerated={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      onShow={onModalShow}
      onDismiss={onModalDismiss}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "column"
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <Animated.View style={[StyleSheet.absoluteFill, modalStyles]} />
        </TouchableWithoutFeedback>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            height: SCREEN_HEIGHT / 2,
            backgroundColor: "#fff",
            padding: 20
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Set your chat color
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ position: "absolute", right: 20, top: 20 }}
          >
            <View
              style={{
                height: 36,
                width: 36,
                borderRadius: 18,
                backgroundColor: "#f0f0f0",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon name="close" size={24} color="#000" />
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              marginBottom: 40
            }}
          >
            <FlatList
              style={{ width: "100%", height: "100%" }}
              contentContainerStyle={{ width: "100%" }}
              data={colors}
              numColumns={5}
              renderItem={renderColorItem}
              keyExtractor={keyExtractor}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

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

export default ColorPickPrompt;
