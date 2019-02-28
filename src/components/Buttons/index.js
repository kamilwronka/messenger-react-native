import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { isNil } from 'lodash';

export const Button = props => {
  return (
    <View style={props.wide ? styles.wideButtonContainer : styles.buttonContainer}>
      <TouchableHighlight
        style={[
          props.bright ? styles.buttonBright : styles.button,
          props.small ? styles.buttonSmall : {},
          props.medium ? styles.buttonMedium : {},
        ]}
        underlayColor={props.bright ? '#FFFFFF' : '#912F56'}
        {...props}>
        {isNil(props.icon) ? (
          <Text
            style={[
              props.bright ? styles.textBtnBright : styles.text,
              props.small ? styles.textBtnSmall : {},
            ]}>
            {props.title.toUpperCase()}
          </Text>
        ) : (
          {/*<Ionicons name={props.icon} size={24} color="#ffffff" />*/}
        )}
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    width: 148,
  },
  wideButtonContainer: {
    flex: 1,
    margin: 10,
  },
  text: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textBtnBright: {
    color: '#912F56',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textBtnSmall: {
    fontSize: 10,
  },
  button: {
    height: 48,
    backgroundColor: '#912F56',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonSmall: {
    height: 26,
  },
  buttonMedium: {
    height: 36,
  },
  buttonBright: {
    height: 48,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#BEBBBB',
    borderWidth: 2,
  },
  bottom: {
    alignSelf: 'flex-end',
  },
});
