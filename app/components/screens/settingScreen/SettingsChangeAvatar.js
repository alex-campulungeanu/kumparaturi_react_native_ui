import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ActivityIndicator, Alert } from 'react-native';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import ImageUpload from '../../ImageUpload';
import UserAvatar from '../../misc/UserAvatar';
import LoadingIndicator from '../../Loading/LoadingIndicator';
import changeAvatarReducer from './../../../reducers/changeAvatarReducer';
import Colors from '../../../resources/Colors';
import Constants from '../../../constants/constants';
import { changeAvatar, resetAvatar } from '../../../actions/changeAvatarActions';
import { getUserDetails } from '../../../actions/userDetailsActions';
import InputWithIcon from './../../common/InputWithIcon';
import { appStyles, misc } from '../../../resources/appStyles';

class SettingsChangeAvatarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      userImage: null,
    };
  }

  componentDidUpdate() {
    const {navigation, changeAvatarReducer} = this.props;
    if (changeAvatarReducer.changeAvatarSuccess) {
      this.props.navigation.navigate('SettingsHome');
      this.props.dispatch(resetAvatar());
      this.props.dispatch(getUserDetails());
      this.setState({userImage: null})
    } else if(changeAvatarReducer.changeAvatarError !== '') {
      // console.log('erorare din componentdidupate settings: ', changeAvatarReducer.changeAvatarError.errors);
      Toast.show({ text: changeAvatarReducer.changeAvatarError.errors, style: appStyles.toastStyle, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton, duration: 5000});
      // this.setState({error: registerReducer.registerError})
      this.props.dispatch(resetAvatar());
    }
  }

  // componentWillUnmount() {
  //   console.log('enter compoemntwilunmount');
  //   this.setState({isNewPasswordValid: ''})
  // }

  // validatePassword = () => {
  //   let regExpPassword = Constants.PASSWORD_REGEXP
  //   let isValid = true
  //   if (!regExpPassword.test(this.state.newPassword)) {
  //     this.setState({isNewPasswordValid: 'no'})
  //     isValid = false
  //   }
  //   return isValid 
  // }

  changeAvatar = () => {
    Keyboard.dismiss()
    this.props.dispatch(changeAvatar(this.state.userImage))
  }

  getUserImage = (image) => {
    this.setState({userImage: image})
  }

  render() {
    // console.log('this.state.userImage', this.state.userImage);
    if (this.props.userDetailsReducer.isLoading) {
      return (
          <LoadingIndicator />
      );
    }
    return (
      <View style={styles.container}>
        <UserAvatar uriAvatarDatabase={this.props.userDetailsReducer.data.userImage} style={{marginBottom: 10}} size={200}/>
        <View style={styles.inlineInput}>
          <IconAntDesing name='picture' size={20} style= {styles.iconInput} color={Colors.primaryColor}/>
          <View style={styles.textInput}>
            <ImageUpload onUpload={this.getUserImage} compText='Alege o poza (optional)'/>
          </View>
        </View>
        <TouchableOpacity onPress={this.changeAvatar} disabled={this.props.changeAvatarReducer.isLoading} style={styles.changeBtnContainer} disabled={this.props.changeAvatarReducer.isLoading}> 
          <Text style={styles.loginText}>Schimba poza de profil</Text>
          {this.props.changeAvatarReducer.isLoading ?
          <ActivityIndicator size="large" color={Colors.whiteColor} />
          : null}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineInput: {
    flexDirection: 'row',
    marginHorizontal: 50,
    marginBottom: 30,
    textAlign: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    height: 40
  },
  textInput: {
    width: '100%',
  },
  changeBtnContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    padding: 15,
    color: Colors.whiteColor,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  signupText: {
    fontSize: 16,
    fontWeight:'500',
    color: Colors.primaryColor,
  }
})

function mapStateToProps(state) {
  return {
    changeAvatarReducer: state.changeAvatarReducer,
    userDetailsReducer: state.userDetailsReducer,
  }
}

export default connect(mapStateToProps)(SettingsChangeAvatarScreen);
