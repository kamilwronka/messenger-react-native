import React from 'react';
import { View, StyleSheet } from 'react-native';

const Jumbotron = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Jumbotron;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
  },
});
