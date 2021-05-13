import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Switch, Alert, ActivityIndicator, Modal } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
// import codePush from "react-native-code-push";

import Colors from '../../../resources/Colors';
import Separator from '../../misc/Separator';
import UserAvatar from './../../misc/UserAvatar';
import * as Utils from './../../../configs/utils';
import { changeSendNotification, changeReceiveNotification, resetReceiveNotification } from '../../../actions/changeSettingActions';

const MENU_ICON_SIZE = 25;


const CustomProgressBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
)

class SettingsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendNotification: '',
      receiveNotification: '',
      showUpdateProgress: false
    };
  }

  componentDidMount() {
    if (typeof this.props.userDetailsReducer.data.setting != 'undefined') {
      this.setState({
        sendNotification: Utils.numberToBoolean(this.props.userDetailsReducer.data.setting[1].setting_value_number),
        receiveNotification: Utils.numberToBoolean(this.props.userDetailsReducer.data.setting[2].setting_value_number)
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (typeof this.props.userDetailsReducer.data.setting != 'undefined') {
      if (this.props.userDetailsReducer.data.setting !== prevProps.userDetailsReducer.data.setting) {
        this.setState({
          sendNotification: Utils.numberToBoolean(this.props.userDetailsReducer.data.setting[1].setting_value_number),
          receiveNotification: Utils.numberToBoolean(this.props.userDetailsReducer.data.setting[2].setting_value_number)
        })
      }
    }
    if(this.props.changeSettingReducer.changeSettingReceiveNotificationSuccess && this.props.changeSettingReducer.changeSettingReceiveNotificationSuccess != prevProps.changeSettingReducer.changeSettingReceiveNotificationSuccess ) {
      OneSignal.setSubscription(this.state.receiveNotification)
      //TODO: sa ramana decomentata
      this.props.dispatch(resetReceiveNotification())
    }
  }

  handleChangePassNavigation = () => {
    this.props.navigation.navigate('SettingsChangePassword')
  }

  handleLogout = () => {
    this.props.navigation.navigate('SettingsLogout')
  }

  handleChangePhoto = () => {
    this.props.navigation.navigate('SettingsChangeAvatar')
  }

  handleSendNotification = (value) => {
    this.setState({sendNotification: value})
    this.props.dispatch(changeSendNotification(Utils.booleanToNumber(value)))
  }
  
  handleReceiveNotification = (value) => {
    this.setState({receiveNotification: value})
    this.props.dispatch(changeReceiveNotification(Utils.booleanToNumber(value)))
  }

  handleUpdateCheck = () =>  {

  }

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                        <CustomProgressBar visible={this.state.showUpdateProgress}/>

        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <View style={styles.itemHeaderName}>
              <IconMaterialCommunityIcons name='account-edit' size={MENU_ICON_SIZE} color={Colors.primaryColor}/>
              <Text style={styles.itemHeaderText}>Schimba parola super secreta!</Text>
            </View>
            <TouchableWithoutFeedback onPress={this.handleChangePassNavigation}>
              <IconMaterialCommunityIcons name='arrow-right' size={MENU_ICON_SIZE} color={Colors.lightGreenColor}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.itemBody}>
            <Text><Text style={{fontWeight: 'bold'}}>Name:</Text> {Utils.undefinedToNA(this.props.userDetailsReducer.data.name)}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Username:</Text> {Utils.undefinedToNA(this.props.userDetailsReducer.data.username)}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Email:</Text> {Utils.undefinedToNA(this.props.userDetailsReducer.data.email)}</Text>
          </View>
          <Separator />
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <View style={styles.itemHeaderName}>
              <IconMaterialCommunityIcons name='image-filter' size={MENU_ICON_SIZE} color={Colors.primaryColor}/>
              <Text style={styles.itemHeaderText}>Schimba poza de profil!</Text>
            </View>
            <TouchableOpacity onPress={this.handleChangePhoto}>
                <IconMaterialCommunityIcons name='arrow-right' size={MENU_ICON_SIZE} color={Colors.lightGreenColor}/>
            </TouchableOpacity>
          </View>
          <View style={styles.itemBody}>
            <UserAvatar uriAvatarDatabase={this.props.userDetailsReducer.data.userImage} style={{marginBottom: 5}} size={50}/>
          </View>
          <Separator />
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <View style={styles.itemHeaderName}>
              <IconMaterialCommunityIcons name='bell-outline' size={MENU_ICON_SIZE} color={Colors.primaryColor}/>
              <Text style={styles.itemHeaderText}>Notificari </Text>
            </View>
          </View>
          <View style={styles.itemBody}>
            <View style={styles.itemBodyChild}>
              <Text>Trimite notificari</Text>
              {!this.props.userDetailsReducer.isLoading ?
              (<Switch 
                disabled = {this.props.changeSettingReducer.isLoading}
                value={this.state.sendNotification}
                onValueChange = {(value) => this.handleSendNotification(value)}
                // thumbColor={Colors.primaryColor}
                // tintColor={Colors.primaryColor}
              />)
              :null }
            </View>
            <View style={[styles.itemBodyChild, {marginBottom: 0}]}>
              <Text>Primeste notificari</Text>
              {!this.props.userDetailsReducer.isLoading ?
              (<Switch 
                disabled = {this.props.changeSettingReducer.isLoading}
                value={this.state.receiveNotification}
                onValueChange = {(value) => this.handleReceiveNotification(value)}
              />)
              : null }
            </View>
          </View>
          <Separator />
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <View style={styles.itemHeaderName}>
              <IconMaterialCommunityIcons name='autorenew' size={MENU_ICON_SIZE} color={Colors.primaryColor}/>
              <Text style={styles.itemHeaderText}>Vezi daca a aparut ceva nou !</Text>
            </View>
              <TouchableOpacity onPress={() => this.handleUpdateCheck() }>
                <IconMaterialCommunityIcons name='arrow-right' size={MENU_ICON_SIZE} color={Colors.lightGreenColor}/>
              </TouchableOpacity>
          </View>
          <Separator />
        </View>

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetailsReducer: state.userDetailsReducer,
    loginReducer: state.loginReducer,
    changeSettingReducer: state.changeSettingReducer,
  }
}

export default connect(mapStateToProps)(SettingsHome);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  itemContainer: {
    // borderBottomColor: Colors.greyColor,
    // borderBottomWidth: 0.2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: Colors.blackColor,
    // alignItems: 'center',
  },
  itemHeaderName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBody: {
    marginLeft: 30,
  },
  itemBodyChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemHeaderText: {
    color: Colors.blackColor,
    fontSize: 15,
    marginLeft: 5,
  },
  icon: {
    padding: 20
  }
})