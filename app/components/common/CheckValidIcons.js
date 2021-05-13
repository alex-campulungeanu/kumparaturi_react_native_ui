import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

export const ValidIcon = () => {
  return(
    <Icon name='smileo' size={20} style= {styles.iconInput} color='green'/>
  )
}

export const InvalidIcon = () => {
  return(
    <Icon name='frowno' size={20} style= {styles.iconInput} color='red'/>
  )
}

const styles = StyleSheet.create({
  iconInput: {
    marginRight: 5,
  }
})