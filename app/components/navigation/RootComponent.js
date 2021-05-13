import React, { Component } from 'react';
import { StatusBar, View, Text} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
// import { Container, Spinner } from 'native-base';

import Colors from '../../resources/Colors';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import Drawer from './Drawer';

// import { YellowBox } from 'react-native';
// YellowBox.ignoreWarnings(['Remote debugger']);


const AppStack = createStackNavigator({
  Drawer: { screen: Drawer, }
  // Drawer: { screen: Drawer, navigationOptions: () => ({header: null})},
})

const AuthStack = createStackNavigator({
  SignIn: { screen: LoginScreen, navigationOptions: () => ({header: null})},
  Register: { screen: RegisterScreen, navigationOptions: () => ({header: null}) },
  ForgotPassword: {screen: ForgotPasswordScreen, navigationOptions: () => ({header: null})}
}, {
  initialRouteName: 'SignIn',
})

const RootComponent = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export default createAppContainer(RootComponent);

// class RootComponent extends Component {
//   // state = {
//   //   isReady: false,
//   // };
// //   async componentWillMount() {
// //     await Expo.Font.loadAsync({
// //       Roboto: require('native-base/Fonts/Roboto.ttf'),
// //       Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
// //       Ionicons: require('native-base/Fonts/Ionicons.ttf'),
// //     });

// //     this.setState({ isReady: true });
// //   }

//   // renderStatusBar = () => <StatusBar backgroundColor={Colors.secondaryColor} barStyle="dark-content" />;

//   render = () => {
//     // if (!this.state.isReady) {
//     //   return (
//     //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     //       {this.renderStatusBar()}
//     //       <Spinner color={Colors.primaryColor} />
//     //     </View>
//     //   );
//     // }

//     return (
//        <View style = {{flex: 1}}>
//           <AppHeader />
//           <StatusBar barStyle="light-content" backgroundColor={Colors.primaryColor} />
//           <TodosTabNavigator />
//         </View>
//     );
//   };
// }
