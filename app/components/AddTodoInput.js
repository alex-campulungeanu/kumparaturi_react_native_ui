import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Keyboard, BackHandler, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import SpeechAndroid from 'react-native-android-voice';
import { Toast } from 'native-base';

import Colors from '../resources/Colors';
import { appStyles, misc } from '../resources/appStyles';
import regexpList from '../constants/regexpList';
import StringList from '../constants/StringList';

class AddTodoInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      title: '',
      actionsBtnVisible: false
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.visibility !== this.props.visibility) {
  //     this.setState({
  //       modalVisible: this.props.visibility
  //     })
  //   }
  // }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleCancelAction);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleCancelAction);
  }
  
  handleAddAction = () => {
    let itemRegexpt = regexpList.ITEM_REGEXP
    if (itemRegexpt.test(this.state.title) ) {
      this.props.onAdd(this.state.title)
    } else {
      Toast.show({ text: StringList.ITEM_NOT_MATCH_RULES, style: appStyles.toastStyleError, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton,  duration: misc.toastDurationLong});
    }
    this.setState({title: ''})
  }

  handleCancelAction = () => {
    this.setState({title: ''})
    Keyboard.dismiss();
  }

  toggleActionsBtn = () => {
    this.setState({actionsBtnVisible: !this.state.actionsBtnVisible})
  }
  //TODO: de vazut daca gasesc al voice recognizer
  // async startSpeech(){
  //   try{
  //       //More Locales will be available upon release.
  //       var spokenText = await SpeechAndroid.startSpeech("Vorbeste-mi !", SpeechAndroid.ROMANIAN);
  //     //   ToastAndroid.show(spokenText , ToastAndroid.LONG);
  //       this.setState({title: spokenText})
  //       console.log('spoken text: ', spokenText)
  //   }catch(error){
  //       switch(error){
  //           case SpeechAndroid.E_VOICE_CANCELLED:
  //                 console.log('canceled')
  //             //   ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
  //             Toast.show({ text: 'Fii amabil si completeaza ambele campuri !', style: appStyles.toastStyle, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton,  duration: 5000});
  //             break;
  //           case SpeechAndroid.E_NO_MATCH:
  //                 console.log('canceled')
  //             //   ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
  //               break;
  //           case SpeechAndroid.E_SERVER_ERROR:
  //             //   ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
  //               // this.setState({error: 'Google Server Error'})
  //               console.log('Google Server Error')
  //               break;
  //           /*And more errors that will be documented on Docs upon release*/
  //       }
  //   }
  // }

  render() {
    return (
      <View style = {styles.container}>
          <View style = {styles.textInput}>
            <TextInput
              placeholder="Ce avem de cumparat, gascane ?"
              underLineColorAndroid="transparent"
              underlineColor="transparent"
              onChangeText={(text) => this.setState({title: text})}
              onSubmitEditing={() => this.handleAddAction(false)}
              value={this.state.title}
              autoCorrect={false}
              autoCapitalize="none"
              onFocus={this.toggleActionsBtn}
              onEndEditing={this.toggleActionsBtn}
            />
          </View>
          {this.state.actionsBtnVisible ? (
            <View style = {styles.btnActionsContainer}>
              {this.props.isLoading ? 
                <ActivityIndicator size="large" color={Colors.blackColor} />
                : null
              }
              {/* <TouchableOpacity onPress={() => this.startSpeech() } style={[styles.btnContainer, { backgroundColor: Colors.lightBlueColor }]} >
                  <Icon size={20} name={'bullhorn'} color={'#fff'} />
              </TouchableOpacity>               */}
              <TouchableOpacity onPress={() => { this.handleCancelAction() }} style={[styles.btnContainer, { backgroundColor: Colors.redColor}]}>
                  <Icon size={20} name={'times'} color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.handleAddAction() }} style={[styles.btnContainer, { backgroundColor: Colors.lightGreenColor }]} >
                  <Icon size={20} name={'check'} color={'#fff'} />
              </TouchableOpacity>
            </View>
          ) : null }
      </View>
    )
  }
}

export default AddTodoInput

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyColorBackground,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 0.2,
    borderTopColor: 'grey'
  },
  btnActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: Colors.primaryColor,
  },
  btnContainer: {
    padding: 7,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
})