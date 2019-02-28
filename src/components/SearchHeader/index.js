import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    // borderColor: '#cccccc',
    // borderWidth: 1,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 21,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginHorizontal: 25,
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    height: 42,
    paddingLeft: 25,
  },
  text: {
    fontSize: 16,
    color: '#cccccc',
  },
  icon: {
    left: 10,
  },
  iconRight: {
    right: 10,
  },
});

class SearchHeader extends Component {
  componentDidMount() {
    console.log('mount');
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.)
  }

  handleSearch = () => {
    this.props.navigation.navigate({
      routeName: 'SearchScreen',
      params: { callback: () => {} },
    });
  };

  render() {
    const desiredColor = this.props.inputColor ? this.props.inputColor : '#912F56';
    // console.log(this.props.navigation);
    return (
      <TouchableWithoutFeedback onPress={this.handleSearch}>
        <View style={styles.container}>
          <View style={styles.icon}>
            {/*<Ionicons name="ios-search" size={28} color={desiredColor} />*/}
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
