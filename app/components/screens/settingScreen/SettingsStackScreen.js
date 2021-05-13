import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppHeader from '../../../components/AppHeader';
import DrawerIcon from './../../common/DrawerIcon';
import SettingsHome from './SettingsHome';
import SettingsChangePassword from './SettingsChangePassword';
import SettingsChangeAvatar from './SettingsChangeAvatar';
import SettingsLogout from './SettingsLogout';
import { appStyles, sizes } from './../../../resources/appStyles';

const SettingsStack = createStackNavigator({
  SettingsHome: {
    screen: SettingsHome,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title='Setari' leftIcon={<DrawerIcon/>} leftAction={() => navigation.dispatch(DrawerActions.openDrawer())}/>
    })
  },
  SettingsChangePassword: {
    screen: SettingsChangePassword,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title='Change Password' leftIcon={<IconMaterialCommunityIcons name='arrow-left' style = {appStyles.leftIcon} size ={sizes.ICON_SIZE_HEADER}/>} leftAction={() => navigation.navigate('SettingsHome')}/>
    })
  },
  SettingsChangeAvatar: {
    screen: SettingsChangeAvatar,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title='Change Photo' leftIcon={<IconMaterialCommunityIcons name='arrow-left' style = {appStyles.leftIcon} size ={sizes.ICON_SIZE_HEADER}/>}leftAction={() => navigation.navigate('SettingsHome')}/>
    })
  },
  // SettingsLogout: {
  //   screen: SettingsLogout,
  //   navigationOptions: ({ navigation }) => ({
  //     header: <AppHeader title='Logout' leftIcon={<IconMaterialCommunityIcons name='arrow-left' style = {appStyles.leftIcon} size ={sizes.ICON_SIZE_HEADER}/>} leftAction={() => navigation.navigate('SettingsHome')}/>
  //   })
  // }
},
{
  // headerMode: 'none',
  // navigationOptions: {
  //   headerVisible: false,
  // },
  initialRouteName: 'SettingsHome',
}
)

class SettingsStackScreen extends Component {
  constructor(props) {
    super(props)
  }
  static router = SettingsStack.router;

  render() {
    return(
      <View style={{flex: 1}}>
        {/* <AppHeader title='Setari' leftIconName='menu' leftAction={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}/> */}
        <SettingsStack navigation={this.props.navigation}/>
      </View>
    )
  }
}

export default SettingsStackScreen;