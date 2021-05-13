import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import Logo from '../misc/Logo';
import InputWithIcon from './../common/InputWithIcon';
import { login, resetlogin } from '../../actions/loginActions';
import Colors from '../../resources/Colors';
import { appStyles, misc, sizes } from '../../resources/appStyles';
import DefaultButton from './../common/DefaultButton';
import StringList from '../../constants/StringList';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: '',
      // email: '',
      // emailError: '',
      password: '',
      passwordError: '',
    };
  }

  componentDidMount() {
    // console.log('loginReducer: ', this.props.loginReducer)
  }

  componentDidUpdate() {
    if (this.props.loginReducer.isLoggedIn) {
      this.props.navigation.navigate('App');
    }
    //THIS IS ONLY FOR LEARNING PURPOSE, I DECIDE TO PUT THE ERROR INSIDE A View
    /*if (this.props.loginReducer.loginError != '') {
      Toast.show({ text: this.props.loginReducer.loginError, style: appStyles.toastStyle, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton,  duration: 5000});
    this.props.dispatch(resetlogin());
    }*/
  }

  handleLoginPress = () => {
    Keyboard.dismiss();
    let isValid = true;
    // let regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regexpPassword = /.{1,}/;
    let regexpUserName = /.{1,}/

    if (!regexpUserName.test(this.state.username)) {
      this.setState({usernameError: 'invalid usernmae'})
      isValid = false;
    } 

    if (!regexpPassword.test(this.state.password)) {
      this.setState({password: 'parola incorecta'})
      isValid = false;
    }
    
    if (isValid) {
      this.props.dispatch(login(this.state.username, this.state.password));
      // this.props.dispatch(login('test_login', 'pass'));
    } else {
      Toast.show({ text: StringList.LOGIN_FIELDS_ERROR, style: appStyles.toastStyleError, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton,  duration: misc.toastDurationShort});
    }
  }

  handleSignUpPress = () => {
    this.props.navigation.navigate('Register')
  }

  handleForgotPasswordPress = () => {
    this.props.navigation.navigate('ForgotPassword')
  }

  render() {
    // if (this.props.loginReducer.isLoading) {
    //   return (
    //       <LoadingIndicator />
    //   );
    // }
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 60}}>
          <Logo />
        </View>
        <InputWithIcon 
          icon = {<IconAntDesing name='user' size={20} color={Colors.primaryColor}/>}
          placeholder='Username'
          returnKeyType="next"
          onChangeText = {(text) => this.setState({username: text})}
          />
        <InputWithIcon 
          icon = {<IconAntDesing name='lock' size={20} color={Colors.primaryColor} />}
          secureTextEntry={true}
          placeholder='Password'
          returnKeyType="go"
          onChangeText = {(text) => this.setState({password: text})}
        />
        {/* <TouchableOpacity onPress={this.handleLoginPress} disabled={this.props.loginReducer.isLoading} style={appStyles.buttonStyle} disabled={this.props.loginReducer.isLoading}> 
          <Text style={styles.loginText}>PATRUNDE !</Text>
          {this.props.loginReducer.isLoading ?
          <ActivityIndicator size="large" color={Colors.whiteColor} />
          : null}
        </TouchableOpacity> */}
        <DefaultButton 
          onButtonPress = {this.handleLoginPress}
          // handleOnpress = {() => console.log('etnere dsadadad')}
          isLoading = {this.props.loginReducer.isLoading}
          buttonText = 'PATRUNDE !'
        />
        <View style={styles.signupContainer}>
          <Text style={{fontSize: 16}}>Vrei cont? Apasa</Text>
          <TouchableOpacity onPress={this.handleSignUpPress}><Text style={styles.signupText}> aici</Text></TouchableOpacity>
        </View>
        <View style={styles.forgotContainer}>
          <Text style={{fontSize: 16}}>Ai uitat parola? Apasa</Text>
          <TouchableOpacity onPress={this.handleForgotPasswordPress}><Text style={styles.signupText}> aici</Text></TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
            <Text style={{color: 'red', fontSize: 15}}>{this.props.loginReducer.loginError}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inlineInput: {
    flexDirection: 'row',
    marginHorizontal: 50,
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    height: 40
  },
  textInput: {
    width: '100%',
  },
  loginText: {
    padding: 15,
    color: 'white',
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    fontWeight:'500',
    color: Colors.primaryColor,
  },
  errorContainer: {
    marginBottom: 10
  }
})

function mapStateToProps(state) {
  return {
    loginReducer: state.loginReducer,
  }
}

export default connect(mapStateToProps)(LoginScreen);