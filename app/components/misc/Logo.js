import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import Colors from '../../resources/Colors';

class Logo extends Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/logo.jpg')}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logoContainer: {
justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200/2,
  }
})

export default Logo;