import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeaderTitle = props => {
  return (
    <Text style={[styles.title, { color: props.color ? props.color : '#912F56' }]}>
      {props.children}
    </Text>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',

    fontSize: 24,
    fontWeight: 'bold',
  },
});
