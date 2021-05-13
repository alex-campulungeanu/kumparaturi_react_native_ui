//appcenter codepush release-react -a nipu_ro/kumparaturi -d Staging
import React, { Component } from 'react';
import { YellowBox, Platform, StatusBar, Text, View, StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import OneSignal from 'react-native-onesignal';
// import codePush from "react-native-code-push";

import store from './configs/store';
import RootComponent from './components/navigation/RootComponent';
import AddTodoInput from './components/AddTodoInput';
import Colors from './resources/Colors';

console.disableYellowBox = true;

// let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

export default class App extends Component {
  constructor(props) {
    super(props)
   OneSignal.init("<One signal API KEY>");
   OneSignal.inFocusDisplaying(2);
   OneSignal.enableVibrate(false);
   OneSignal.enableSound(false);
   OneSignal.addEventListener('received', this.onReceived);
   OneSignal.addEventListener('opened', this.onOpened);
   OneSignal.addEventListener('ids', this.onIds);
  // Setting setSubscription
  OneSignal.setSubscription(false);
  OneSignal.getPermissionSubscriptionState((status) => {
      // console.log(status);
  });
  }


  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
      console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    // console.log('Device info: ', device);
  }

  render() {
    // if (Platform.OS == "android"){
    //   StatusBar.setBackgroundColor(Colors.primaryColor);
    // }
    return (
      <Root>
        <Provider store = {store}>
          <RootComponent />
        </Provider>
      </Root>
    )
  }
}

// App = codePush(codePushOptions)(App);