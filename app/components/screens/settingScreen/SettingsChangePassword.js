import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ActivityIndicator, Alert, KeyboardAvoidingView } from 'react-native';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import changeSettingReducer from './../../../reducers/changeSettingReducer';
import Colors from '../../../resources/Colors';
import Constants from '../../../constants/constants';
import { changePassword, resetPassword } from '../../../actions/changeSettingActions';
import InputWithIcon from './../../common/InputWithIcon';
import { appStyles, misc, sizes } from '../../../resources/appStyles';
import regexpList from '../../../constants/regexpList';

class SettingsChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      isNewPasswordValid: '',
      isValid: false,
    };
    this.baseState = this.state 
  }

  componentDidUpdate() {
    const {navigation, changeSettingReducer} = this.props;
    if (changeSettingReducer.changeSettingSuccess) {
      Toast.show({ text: "Password changed", style: appStyles.toastStyle, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton, duration: 5000});
      this.props.navigation.navigate('SettingsHome');
      this.props.dispatch(resetPassword());
      this.setState(this.baseState)
    } else if(changeSettingReducer.changeSettingError !== '') {
      console.log('erorare din componentdidupate settings: ', changeSettingReducer.changeSettingError);
      Toast.show({ text: changeSettingReducer.changeSettingError.errors, style: appStyles.toastStyle, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton, duration: 5000});
      // this.setState({error: registerReducer.registerError})
      this.props.dispatch(resetPassword());
    }
  }

  componentWillUnmount() {
    this.setState({isNewPasswordValid: ''})
  }

  validatePassword = () => {
    let regExpPassword = regexpList.PASSWORD_REGEXP
    let isValid = true
    if (!regExpPassword.test(this.state.newPassword)) {
      this.setState({isNewPasswordValid: 'no'})
      isValid = false
    }
    return isValid 
  }

  changePassword = () => {
    Keyboard.dismiss()
    if(this.validatePassword()) {
      console.log('pass is valid')
      this.props.dispatch(changePassword(this.state.oldPassword, this.state.newPassword))
    } else {
      console.log('pass is invvalid')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.avatar}>
          <Image source={require('../../../../assets/change_pwd.png')} />
        </View>
        <InputWithIcon 
          icon={<IconAntDesing name='lock' size={sizes.INPUT_ICON_SIZE} color={Colors.primaryColor}/>}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder='Old password'
          returnKeyType="next"
          clearButtonMode="always"
          onChangeText = {(text) => this.setState({oldPassword: text})}
        />
        <InputWithIcon 
          icon={<IconAntDesing name='lock' size={sizes.INPUT_ICON_SIZE} color={Colors.primaryColor}/>}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder='New password'
          returnKeyType="go"
          clearButtonMode="always"
          onChangeText = {(text) => this.setState({newPassword: text})}
          // onEndEditing = {this.validatePassword}
          isValid = {this.state.isNewPasswordValid == 'yes'? true : this.state.isNewPasswordValid == 'no' ? false : undefined}

        />
        <TouchableOpacity onPress={this.changePassword} disabled={this.props.changeSettingReducer.isLoading} style={styles.changeBtnContainer} disabled={this.props.changeSettingReducer.isLoading}> 
          <Text style={styles.changePassText}>Schimba parola</Text>
          {this.props.changeSettingReducer.isLoading ?
          <ActivityIndicator size="large" color={Colors.whiteColor} />
          : null}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 100,
  },
  changeBtnContainer: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    // borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePassText: {
    padding: 15,
    color: Colors.whiteColor,
    fontWeight: '500',
  }
})

function mapStateToProps(state) {
  return {
    changeSettingReducer: state.changeSettingReducer,
    userDetailsReducer: state.userDetailsReducer,
  }
}

export default connect(mapStateToProps)(SettingsChangePasswordScreen);
