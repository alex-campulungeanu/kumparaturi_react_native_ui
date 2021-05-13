import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../resources/Colors';

const Separator = () => {
  return (
    <View style={styles.container}/>
  )
}

export default Separator;

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyColorBackground,
    height: 5,
    marginVertical: 20,
    // marginHorizontal: 20,
  }
})