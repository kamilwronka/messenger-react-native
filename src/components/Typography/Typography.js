import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const H1 = ({ children, color }) => {
  return (
    <Text style={[styles.h1, { color, textAlignVertical: 'center', textAlign: 'center' }]}>
      {children}
    </Text>
  );
};

export const H3 = ({ children, color }) => {
  return (
    <Text style={[styles.h3, { color, textAlignVertical: 'center', textAlign: 'center' }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontFamily: 'georgia',
  },
  h3: {
    fontSize: 18,
    fontFamily: 'georgia',
  },
});
