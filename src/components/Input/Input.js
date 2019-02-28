import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

const Input = props => {
  return (
    <View style={styles.container}>
      {/*<Ionicons style={styles.icon} name="md-person" size={24} color="#912F56" />*/}
      <TextInput
        underlineColorAndroid="rgba(0,0,0,0)"
        selectionColor="#912F56"
        style={styles.input}
        placeholderTextColor="#bbbbbb"
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  input: {
    height: 30,
    paddingLeft: 36,
    marginBottom: 10,
    color: '#912F56',
  },
  icon: {
    left: 0,
    bottom: -26,
  },
});
