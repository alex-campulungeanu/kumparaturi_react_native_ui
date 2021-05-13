import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { recordAutoLogin } from '../../actions/loginActions';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props)
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    // console.log(userToken)
    if (userToken) { // !userToken for disabling Auth Screen
      this.props.dispatch(recordAutoLogin())
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Auth')
    }
  }
  render() {
    return (
      <View>
        {/* <ActivityIndicator /> */}
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

export default connect()(AuthLoadingScreen);