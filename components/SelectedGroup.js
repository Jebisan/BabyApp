import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const SelectedGroup = props => {

  return (
    <View style={styles.parent}>
    <Text>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'white',
    width: 350,
    height: 95,
    borderRadius: 15,
    padding: 10
  }
});

export default SelectedGroup;
