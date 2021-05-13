import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OneSignal from 'react-native-onesignal';

import { getUserDetails } from '../../actions/userDetailsActions';
import UserAvatar from '../misc/UserAvatar';
import Colors from '../../resources/Colors';
import { logout } from '../../actions/logoutActions';
import * as Utils from '../../configs/utils'

const ICON_SIZE = 20;

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userProfilePic: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.loginReducer.isLoggedIn) {
      this.props.navigation.navigate('Auth');
    }//TODO: de pus un toast cu Toast.show({ text: login.get('logoutError'), buttonText: 'x', style: , textStyle: ,  duration: 5000});
    if (typeof this.props.userDetailsReducer.data.setting != 'undefined') {
      if (this.props.userDetailsReducer.data.setting !== prevProps.userDetailsReducer.data.setting) {
        OneSignal.setSubscription(Utils.numberToBoolean(this.props.userDetailsReducer.data.setting[2].setting_value_number))
      }
    }

  }

  componentDidMount() {
    // this.getUserdata()
    this.props.dispatch(getUserDetails());
  }

  // getUserdata = async () => {
  //   const username = await AsyncStorage.getItem('username');
  //   const profilePic = await AsyncStorage.getItem('profile_pic');
  //   this.setState({username: username, userProfilePic: profilePic})
  // }

  navigateToScreen = (route) => () => {
    this.props.navigation.closeDrawer();
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  handleLogout = () => {
    Alert.alert(
      'Delogare',
      'Esti sigur ca pleci ?',
      [
        {
          text: 'NU', 
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'DA', onPress: () => this.props.dispatch(logout())},
      ],
      {cancelable: false},
    );
    
    // await this.props.dispatch(logout())//.then(() => this.props.navigation.navigate('Auth'));
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.header}>
          <UserAvatar uriAvatarDatabase={this.props.userDetailsReducer.data.userImage} style={{marginBottom: 5}} size={50}/>
          <Text style={styles.usernameText}>{this.props.userDetailsReducer.data.name}</Text>
          <Text style={styles.usernameText}>{this.props.userDetailsReducer.data.username}</Text>
        </View>
        <View style = {styles.body}>
          <TouchableOpacity style = {styles.menuItem} onPress={this.navigateToScreen('TodosTabScreen')}>
            <IconMaterialIcons name='done-all' size={ICON_SIZE} color={Colors.primaryColor} style={styles.menuItemIcon}/>
            <Text> Kumparaturile </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.menuItem} onPress={this.navigateToScreen('ShoppingListScreen')}>
            <IconMaterialIcons name='format-list-bulleted' size={ICON_SIZE} color={Colors.primaryColor} style={styles.menuItemIcon}/>
            <Text> Listele de kumparaturi </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.menuItem} onPress={this.navigateToScreen('SettingsStackScreen')}>
            <IconMaterialIcons name='settings' size={ICON_SIZE} color={Colors.primaryColor} style={styles.menuItemIcon}/>
            <Text> Setari </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.menuItem} onPress={this.navigateToScreen('AboutScreen')}>
            <IconMaterialIcons name='info' size={ICON_SIZE} color={Colors.primaryColor} style={styles.menuItemIcon}/>
            <Text> Despre </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.menuItem} onPress={this.navigateToScreen('TesteScreen')}>
            <IconMaterialIcons name='home' size={ICON_SIZE} color={Colors.primaryColor} style={styles.menuItemIcon}/>
            <Text> Teste </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style = {styles.menuItem} onPress={this.handleLogout}>
            <IconMaterialIcons name='exit-to-app' size={ICON_SIZE} color={Colors.primaryColor} style={styles.menuItemIcon}/>
            <Text> Logout </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  body: {
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  menuItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: Colors.greyColorBackground,
    borderBottomWidth: 1,
  },
  menuItemIcon: {
    marginRight: 10,
  }
})

function mapStateToProps(state) {
  return {
    userDetailsReducer: state.userDetailsReducer,
    loginReducer: state.loginReducer,
  }
}

export default connect(mapStateToProps)(SideMenu);