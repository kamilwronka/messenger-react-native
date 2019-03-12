import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from "react-navigation";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 24,
    marginBottom: 20,
    marginHorizontal: 25,
    width: width - 64
  },
  search: {
    flex: 1,
    justifyContent: "center",
    height: 48,
    paddingLeft: 16
  },
  text: {
    fontSize: 16,
    color: "#bbbbbb"
  },
  icon: {
    left: 10
  },
  iconRight: {
    right: 10
  }
});

class SearchHeader extends Component {
  componentDidMount() {
    console.log("mount");
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.)
  }

  handleSearch = () => {
    this.props.navigation.navigate({
      routeName: "SearchScreen",
      params: { callback: () => {} }
    });
  };

  render() {
    const desiredColor = this.props.inputColor
      ? this.props.inputColor
      : "#912F56";

    return (
      <TouchableWithoutFeedback onPress={this.handleSearch}>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Icon name="magnify" size={28} color={desiredColor} />
          </View>
          <View style={styles.search} {...this.props}>
            <Text style={styles.text}>Szukaj...</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(SearchHeader);
