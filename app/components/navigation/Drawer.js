// https://www.bootdey.com/react-native-snippet/12/User-profile-with-options
import React, { Component } from 'react'
import { Text, View, ScrollView, SafeAreaView } from 'react-native'
import { StackNavigator, DrawerItems } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import ShoppingListScreen from './../screens/ShoppingListScreen';
import TodosTabScreen from '../screens/TodosTabScreen';
import TesteScreen from '../screens/TesteScreen'
import SettingsStackScreen from './../screens/settingScreen/SettingsStackScreen';
import AboutScreen from '../screens/AboutScreen';
import SideMenu from './SideMenu';

// const CustomDrawerComponent = (props) => (
//   <SafeAreaView style={{flex : 1}}>
//     <ScrollView>
//       <DrawerItems {...props} />
//     </ScrollView>
//   </SafeAreaView>
// )

const Drawer = createDrawerNavigator(
  {
    TodosTabScreen: TodosTabScreen,
    ShoppingListScreen: ShoppingListScreen,
    SettingsStackScreen: SettingsStackScreen,
    AboutScreen: AboutScreen,
    TesteScreen: { screen: TesteScreen, },

  },
  {
    contentComponent: SideMenu,
    initialRouteName: 'TodosTabScreen',
    drawerType: 'slide'
  }
);

Drawer.navigationOptions = ({ navigation }) => {
  return {
    // header: <AppHeader navigation = {navigation}/>
    header: null,
  };
};

export default Drawer;