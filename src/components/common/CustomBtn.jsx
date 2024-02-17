import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomBtn = ({ title, customStyle, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, customStyle]}>
      <Text style={[styles.text, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  text: { fontWeight: 'bold' }
});
