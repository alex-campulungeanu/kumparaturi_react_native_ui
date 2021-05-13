import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback,Keyboard,Button, SafeAreaView, Alert } from 'react-native'
import IconAntDesing from 'react-native-vector-icons/AntDesign';

import Colors from '../../resources/Colors'
import { sizes } from '../../resources/appStyles'
import InputWithIcon from './../common/InputWithIcon'
import * as Api from '../../configs/api'
import Constants from '../../constants/constants'
import DefaultButton from './../common/DefaultButton';
import regexpList from '../../constants/regexpList';

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailValid: ''
    }
    this.baseState = this.state
  }

  handleResetButton = () => {
    console.log(this.state.email)
    
    let regExpEmail = regexpList.EMAIL_REGEXP
    if(regExpEmail.test(this.state.email)) {
      this.setState({emailValid: 'yes'})
      Api.resetPassword(this.state.email)
      this.setState(this.baseState)
      this.props.navigation.navigate('SignIn');
    } else {
      this.setState({emailValid: 'no'})
    }
  }

  handleRememberYes = () => {
    this.props.navigation.navigate('SignIn');
  }

  handleRememberNo = () => {
    Alert.alert(
      'Pfff',
      'Urmareste indicatiile de pe ecran !',
      [
        {text: 'OK',},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <View style={styles.avatar }>
                      <Image source={require('../../../assets/forgot_pwd.png')} />
                    </View>
                    <View style={styles.formContainer}>
                      <View style={styles.formContent}>
                        <Text style={{color: Colors.redColor, fontSize: 30, marginBottom: 10, fontFamily: 'Loto'}}>Esti cam uituc de fel !</Text>
                        <Text style={{fontSize: 20, marginHorizontal: 20, marginBottom: 5}}>Nu-i bai !</Text>
                        <Text style={{fontSize: 15, marginHorizontal: 20, marginBottom: 30, textAlign: 'center'}}>Introdu adresa de email si o sa primesti un link de resetare !</Text>
                        <InputWithIcon
                          icon = {<IconAntDesing name='user' size={20} color={Colors.primaryColor} />}
                          placeholder='Adresa email'
                          value={this.state.name}
                          keyboardType='email-address'
                          onChangeText={(text) => this.setState({email: text})}
                          isValid = {this.state.emailValid == 'yes' ? true : this.state.emailValid == 'no' ? false : undefined}
                        />
                        <DefaultButton 
                          onButtonPress = {this.handleResetButton}
                          isLoading = {false}
                          buttonText = 'Trimite !'
                        />
                      </View>
                    </View>
                    <View style={styles.rememberContainer}>
                      <Text style={styles.rememberQuestion}>Ti-ai adus aminte ?</Text>
                      <TouchableOpacity onPress={this.handleRememberYes} style={styles.button}>
                        <Text style={styles.buttonText}>DA</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.handleRememberNo} style={styles.button}>
                        <Text style={styles.buttonText}>NU</Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={{ flex : 1 }} /> */}
                </View>
            </TouchableWithoutFeedback>
        </View>
    </KeyboardAvoidingView>
    )
  }

}
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-end",
  },
  avatar: {
    // position: 'absolute',
    top: 50,
    alignItems: 'center',
    marginBottom: 80,
  },
  formContainer: {
    borderWidth: 0.6,
    borderColor: Colors.lightGreenColor,
    // flex: 1,
    // flexDirection: 'column',
    // // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 5,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    padding:10,
    // // backgroundColor: Colors.whiteColor,
    // // shadowColor: Colors.blackColor,
    // // shadowOffset: { width: 3, height: 2 },
    // // shadowOpacity: 0.5,
    // // shadowRadius: 10,
    // // elevation: 5,
    // // flexWrap: 'wrap',
    // // zIndex: 1
  },
  formContent: {
    alignItems: 'center',
  },
  button: {
    // width: sizes.BUTTON_WIDTH,
    borderRadius: sizes.BUTTON_RADIUS,
    backgroundColor: Colors.primaryColor,
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    padding: 10 ,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  rememberQuestion:{
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default ForgotPasswordScreen


// render() {
//   return (
//     <View style={{flex: 1}}>
//     <KeyboardAvoidingView style={styles.mainContainer}>
//       <View style={styles.avatar }>
//         <Image source={require('../../../assets/forgot_pwd.png')} />
//       </View>
//      <View style={styles.formContainer}>
//        <View style={styles.formContent}>
//           <Text style={{color: Colors.redColor, fontSize: 30, marginBottom: 10, fontFamily: 'Loto'}}>Esti cam uituc de fel !</Text>
//           <Text style={{fontSize: 20, marginHorizontal: 20, marginBottom: 5}}>Nu-i bai !</Text>
//           <Text style={{fontSize: 15, marginHorizontal: 20, marginBottom: 30, textAlign: 'center'}}>Introdu adresa de email si o sa primesti un link de resetare !</Text>
//           <InputWithIcon
//             icon = {<IconAntDesing name='user' size={20} />}
//             placeholder='Adresa email'
//           />
//        </View>
//        <TouchableOpacity onPress={this.handleResetButton} style={styles.resetButton}> 
//           <Text style={styles.resetText}>Trimite !</Text>
//         </TouchableOpacity>
//      </View>
//      {/* <View style={styles.textBottom}>
//       <TouchableOpacity onPress={this.handleResetButton}> 
//         <Text style={styles.resetText}>Trimite !</Text>
//       </TouchableOpacity>
//      </View> */}
//     </KeyboardAvoidingView>
//     </View>
//   )
// }
// }

// const styles = StyleSheet.create({
// mainContainer: {
//   flex: 1,
// },
// avatar: {
//   position: 'absolute',
//   top: 50,
//   left: (Dimensions.get('window').width / 2) - 70,
//   alignItems: 'center',
//   // backgroundColor: Colors.whiteColor,
//   // zIndex: 1
// },
// formContainer: {
//   borderWidth: 0.6,
//   borderColor: Colors.greyColor,
//   flex: 1,
//   flexDirection: 'column',
//   // justifyContent: 'center',
//   alignItems: 'center',
//   borderRadius: 5,
//   marginBottom: 80,
//   marginTop: 130,
//   marginLeft: 20,
//   marginRight: 20,
//   padding:10,
//   // backgroundColor: Colors.whiteColor,
//   // shadowColor: Colors.blackColor,
//   // shadowOffset: { width: 3, height: 2 },
//   // shadowOpacity: 0.5,
//   // shadowRadius: 10,
//   // elevation: 5,
//   // flexWrap: 'wrap',
//   // zIndex: 1
// },
// formContent: {
//   flex: 1,
//   marginTop: 130,
//   alignItems: 'center',
// },
// resetButton: {
//   width: sizes.BUTTON_WIDTH,
//   borderRadius: sizes.BUTTON_RADIUS,
//   backgroundColor: Colors.primaryColor,
//   marginTop: 20,
//   flexDirection: 'row',
//   justifyContent: 'center',
// },
// resetText: {
//   padding: 15 ,
//   color: 'white',
//   textAlign: 'center',
//   fontWeight: '500',
//   alignSelf: 'center',
// },
// textBottom: {
//   flex: 1,
//   justifyContent: 'flex-end',
//   marginBottom: 10
// }
// })