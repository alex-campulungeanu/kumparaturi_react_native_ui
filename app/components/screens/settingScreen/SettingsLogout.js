import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation-drawer';

import Colors from '../../../resources/Colors';
import { getUserDetails } from '../../../actions/userDetailsActions';
import LoadingIndicator from '../../Loading/LoadingIndicator';
import UserAvatar from '../../misc/UserAvatar';
import AppHeader from '../../AppHeader';
import { logout } from '../../../actions/logoutActions';
import { sizes } from '../../../resources/appStyles'

class LogoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userProfilePic: '',
    };
  }

  componentDidMount() {
    /*AsyncStorage.getItem("username")
      .then( (value) =>
            {
              this.setState({username: value})
              // return AsyncStorage.getItem("profile_pic")
            }
      )
      // .then( (value) =>
      //     {
      //         this.setState({userP value})
      //     }
      // )
      .done();*/
      // this.props.dispatch(getUserDetails());
  }

  componentDidUpdate(prevProps) {
    // console.log('prevProps', prevProps);
    if (!this.props.loginReducer.isLoggedIn) {
      this.props.navigation.navigate('Auth');
    }//TODO: de pus un toast cu Toast.show({ text: login.get('logoutError'), buttonText: 'x', style: , textStyle: ,  duration: 5000});
  }

  handleLogout = async () => {
    await this.props.dispatch(logout())//.then(() => this.props.navigation.navigate('Auth'));
  }

  render() {
    // if (this.props.userDetailsReducer.isLoading || this.props.loginReducer.isLoadingLogout) {
    //   return (
    //       <LoadingIndicator />
    //   );
    // }

    return (
      <View style={{flex: 1}}>
        {/* <AppHeader leftIconName='menu' leftAction={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}/> */}
        <View style={styles.container}>
          <UserAvatar uriAvatarDatabase={this.props.userDetailsReducer.data.userImage} style={{marginBottom: 10}} size={100}/>
          <Text style = {styles.userText}>{this.props.userDetailsReducer.data.username}</Text>
          <Text style = {styles.userText}>{this.props.userDetailsReducer.data.email}</Text>
          <TouchableOpacity 
            style={styles.logoutBtn}
            onPress={this.handleLogout}
          > 
            <Text style={styles.loginText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    userDetailsReducer: state.userDetailsReducer,
    loginReducer: state.loginReducer,
  }
}

export default connect(mapStateToProps)(LogoutScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userText: {
    fontSize: 20,
    marginBottom: 20,
  },
  logoutBtn: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: sizes.BUTTON_RADIUS,
    position: 'absolute',
    width: 150,
    bottom: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white'
  }
})