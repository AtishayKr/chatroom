import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Error = ({message}) => {
  return (
    <View>
      <Text style={styles.error}>{message}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    color: 'red',
    marginTop: 5
  }
});
