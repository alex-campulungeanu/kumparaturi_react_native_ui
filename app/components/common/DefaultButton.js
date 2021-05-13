import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../resources/Colors'
import { appStyles } from './../../resources/appStyles';
import { undefinedToNA } from './../../configs/utils';

class DefaultButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity 
        onPress = {() => this.props.onButtonPress()} 
        disabled = {this.props.isLoading} 
        style = {appStyles.buttonStyle}> 
          <Text style={styles.loginText}>{undefinedToNA(this.props.buttonText, 'Press this')}</Text>
          {this.props.isLoading ?
            <ActivityIndicator size="large" color={Colors.whiteColor} />
          : null
          }
      </TouchableOpacity>
    );
  }
}

export default DefaultButton
DefaultButton.propTypes = {
  onButtonPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string
}

const styles = StyleSheet.create({
  loginText: {
    padding: 15,
    color: 'white',
    fontWeight: '500',
  },
})
