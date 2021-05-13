import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from '../../resources/Colors';

const LoadingIndicator = (size) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={Colors.lightGreenColor} />
    </View>
  )
}

export default LoadingIndicator;