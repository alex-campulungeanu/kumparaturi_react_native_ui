import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Image, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

import Colors from '../../resources/Colors';
import { register, resetRegister } from '../../actions/registerActions';
import LoadingIndicator from '../Loading/LoadingIndicator';
import ImageUpload from '../ImageUpload';
import InputWithIcon from './../common/InputWithIcon';
import { sizes, appStyles } from '../../resources/appStyles';
import { ValidIcon, InvalidIcon } from '../common/CheckValidIcons';
import Constants from '../../constants/constants'
import DefaultButton from './../common/DefaultButton';
import regexpList from '../../constants/regexpList';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValid: '', 
      username: '',
      usernameValid: '',
      email: '',
      emailValid: '',
      password: '',
      passwordValid: '',
      userImage: '',
      userImageValid: '',
      secretWord: '',
      secretWordValid: '',
      sendActivationEmail: false,
      error: '',
      // avatarSource: '',
    };
    this.baseState = this.state
  }

  handleSignUp = () => {
    Keyboard.dismiss();
    let isValid = true;
    let regExpUsername = /.{1,}/
    let regExpEmail = regexpList.EMAIL_REGEXP
    let regExpPassword = regexpList.PASSWORD_REGEXP
    let regExpName = /^.{1,200}$/
    let regExpSecretWord = /^.{1,200}$/
    if (!regExpUsername.test(this.state.username)) {
      this.setState({usernameValid: 'no'})
      isValid = false;
    } else {
      this.setState({usernameValid: 'yes'})
    }
    if (!regExpEmail.test(this.state.email)) {
      this.setState({emailValid: 'no'})
      isValid = false;
    } else {
      this.setState({emailValid: 'yes'})
    }
    if (!regExpPassword.test(this.state.password)) {
      this.setState({passwordValid: 'no'})
      isValid = false;
    } else {
      this.setState({passwordValid: 'yes'})
    }
    if (!regExpName.test(this.state.name)) {
      this.setState({nameValid: 'no'})
      isValid = false;
    } else {
      this.setState({nameValid: 'yes'})
    }
    if(this.state.userImage === '') {
      this.setState({userImageValid: 'no'})
      isValid = false;
    } else {
      this.setState({userImageValid: 'yes'})
    }
    if(!regExpSecretWord.test(this.state.secretWord)) {
      this.setState({secretWordValid: 'no'})
      isValid = false;
    } else {
      this.setState({secretWordValid: 'yes'})
    }
    if (isValid) {
      this.props.dispatch(register(this.state.name, this.state.username, this.state.email, this.state.password, this.state.userImage, this.state.secretWord, this.state.sendActivationEmail))
    }
  }
  
  goToLogin = () => {
    // this.setState({ username: '', email: '', password: '', })
    this.setState(this.baseState)
    // const navigateAction = NavigationActions.navigate({
    //   routeName: 'SignIn',
    // });
    // this.props.navigation.dispatch(navigateAction);
    this.props.navigation.navigate('SignIn');
    // this.props.navigation.dispatch(
    //   NavigationActions.navigate({ routeName: "SignIn" })
    //  );
    // const navigateAction = StackActions.push({
    //     routeName: 'SignIn' 
    //   });
    //   this.props.navigation.dispatch(navigateAction);
  }

  getUserImage = (image) => {
    this.setState({userImage: image})
  }

  handleSendActivationEmail = (value) => {
    this.setState({sendActivationEmail: value})
  }

  componentDidUpdate() {
    const {navigation, registerReducer} = this.props;
    // console.log('registerReducer: ', registerReducer)
    if (registerReducer.registerSuccess) {
      // this.setState({ username: '', email: '', password: '', })
      // this.setState(this.baseState)
      this.props.navigation.navigate('SignIn');
      this.props.dispatch(resetRegister());
    } else if(registerReducer.registerError !== '') {
      this.setState({error: registerReducer.registerError})
      this.props.dispatch(resetRegister());
    }
  }
  
  componentWillUnmount () {
    this.props.dispatch(resetRegister());
  }

  render() {
    if (this.props.registerReducer.isLoading) {
      return (
        <LoadingIndicator />
      );
    }

    return (
      // <View style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.containerKeyboard}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Icon name='adduser' size={80} color={Colors.primaryColor}/>
        </View>

        <View style={styles.formContainer}>
          <InputWithIcon 
            icon = {<Icon name='adduser' size={20} style= {styles.iconInput} color={Colors.primaryColor}/>}
            autoCapitalize="none"
            placeholder='Name'
            returnKeyType="next"
            value={this.state.name}
            clearButtonMode="always"
            onChangeText={(text) => this.setState({name: text})}
            isValid = {this.state.nameValid == 'yes' ? true : this.state.nameValid == 'no' ? false : undefined}
          />
          <InputWithIcon 
            icon = {<Icon name='user' size={20} style= {styles.iconInput} color={Colors.primaryColor}/>}
            autoCapitalize="none"
            placeholder='Username'
            returnKeyType="next"
            value={this.state.username}
            clearButtonMode="always"
            onChangeText={(text) => this.setState({username: text})}
            isValid = {this.state.usernameValid == 'yes'? true : this.state.usernameValid == 'no' ? false : undefined}
          />
          <InputWithIcon 
            icon = {<Icon name='mail' size={20} style= {styles.iconInput} color={Colors.primaryColor}/>}
            autoCapitalize="none"
            placeholder='Email'
            returnKeyType="next"
            keyboardType='email-address'
            value={this.state.email}
            clearButtonMode="always"
            onChangeText={(text) => this.setState({email: text})}
            isValid = {this.state.emailValid == 'yes'? true : this.state.emailValid == 'no' ? false : undefined}
          />
          <InputWithIcon 
            icon = {<Icon name='lock' size={20} style= {styles.iconInput} color={Colors.primaryColor}/>}
            autoCapitalize="none"
            placeholder='Password'
            returnKeyType="go"
            value={this.state.password}
            clearButtonMode="always"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            isValid = {this.state.passwordValid == 'yes'? true : this.state.passwordValid == 'no' ? false : undefined}
          />
          <InputWithIcon 
            icon = {<Icon name='eyeo' size={20} style= {styles.iconInput} color={Colors.primaryColor}/>}
            autoCapitalize="none"
            placeholder='Cuvantul secret pentru inregistrare'
            returnKeyType="go"
            value={this.state.secretWord}
            clearButtonMode="always"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({secretWord: text})}
            isValid = {this.state.secretWordValid == 'yes'? true : this.state.secretWordValid == 'no' ? false : undefined}
          />
          <View style={styles.inlineInput}>
            <Icon name='picture' size={20} style= {styles.iconInput} color={Colors.primaryColor}/>
            <View style={styles.textInput}>
              <ImageUpload onUpload={this.getUserImage} compText='Alege o poza'/>
            </View>
            {this.state.userImageValid != '' ?
                this.state.userImageValid == 'yes' ? (<ValidIcon/>)
                :this.state.userImageValid  == 'no' ? (<InvalidIcon/>)
              : null : null}
          </View>
          <View style={styles.inlineInput}>
            <View style={styles.textInput}>
              <Text>Trimite mail de activare ?</Text>
            </View>
            <Switch 
                value={this.state.sendActivationEmail}
                onValueChange = {(value) => this.handleSendActivationEmail(value)}
              />
          </View>
          <DefaultButton 
            onButtonPress = {this.handleSignUp}
            isLoading = {this.props.registerReducer.isLoading}
            buttonText = 'FA-TI CONT !'
          />
          <View>
            <Text style={{color: 'red'}}>{this.state.error}</Text>
          </View>
        </View>
        <View style={styles.alreadyContainer}>
          <Text style={styles.alreadyText}>Ai cont? </Text>
          <TouchableOpacity onPress={this.goToLogin}><Text style={styles.alreadyButton}>Login</Text></TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
      // </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    registerReducer: state.registerReducer
  }
}

export default connect(mapStateToProps)(RegisterScreen);

const styles = StyleSheet.create({
  containerKeyboard: {
    flex:1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20
  },
  inlineInput: {
    flexDirection: 'row',
    marginHorizontal: 50,
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyColorBackground,
    height: 40,
    justifyContent: 'space-between',
  },
  textInput: {
    width: '100%',
  },
  iconInput: {
    marginRight: 5,
  },
  signupText: {
    padding: 15 ,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    alignSelf: 'center',
  },
  alreadyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  alreadyText: {
    fontSize: 16,
  },
  alreadyButton: {
    fontSize: 16,
    fontWeight:'500',
    color: Colors.primaryColor,
  },
  uploadAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  }
})
