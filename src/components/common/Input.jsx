import { StyleSheet, TextInput, } from 'react-native';
import React from 'react';

const Input = ({ onBlur, placeholder, secureTextEntry, value, onChangeText, customStyle }) => {
  return (
    <TextInput
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
      style={[styles.input, customStyle]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: '100%',
    borderRadius: 10,
    padding: 10
  }
});
