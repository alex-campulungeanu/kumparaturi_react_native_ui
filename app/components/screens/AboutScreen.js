import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'
import Config from 'react-native-config'

import Colors from '../../resources/Colors';
import { appStyles, sizes } from '../../resources/appStyles';
import AppHeader from './../AppHeader';
import DrawerIcon from './../common/DrawerIcon';

class AboutScreenStack extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Text style={[styles.row, {fontWeight: 'bold', color: Colors.lightGreenColor, fontSize: 20}]}>Kumparaturi</Text>
        <Text style={styles.row}><Text style={{fontWeight: 'bold'}}>Versiune:</Text> {Config.ENV_VERSION_NAME}</Text>
        <Text style={styles.row}><Text style={{fontWeight: 'bold'}}>Mediu:</Text> {Config.ENV_RUNNING_ENVIROMENT}</Text>
        <Text style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>Atentie !</Text> aceasta aplicatie te face sa cheltui bani la Kaufland
        </Text>
        
        <View style={styles.textBottom}>
          <Text style={{fontWeight: 'bold', color: Colors.lightGreenColor, fontSize: 15}}>&copy; Alex</Text>
        </View>
      </View>
    )
  }
}

const AboutScreen = createStackNavigator({
  AboutScreen: {
    screen: AboutScreenStack,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title='About' leftIcon={<DrawerIcon />} leftAction={() => navigation.dispatch(DrawerActions.openDrawer())}/>
    })
  },
});

export default AboutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius:15,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding:10,
    backgroundColor: Colors.whiteColor,
    shadowColor: Colors.blackColor,
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'column',
  },
  row: {
    marginBottom: 30,
  },
  textBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  }
})