import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';

import { sizes } from '../../resources/appStyles'
import Colors from '../../resources/Colors'
import DefaultButton from '../common/DefaultButton';

class ItemErrorPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/error_robot.jpg')} style={styles.image}/>
        {/* <TouchableOpacity onPress={this.props.handleButton} style={styles.button}> 
          <Text style={styles.buttonText}>Refresh !</Text>
        </TouchableOpacity> */}
        <DefaultButton 
            onButtonPress = {this.props.handleButton}
            isLoading = {this.props.todosReducer.isLoading}
            buttonText = 'Refresh !'
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    todosReducer: state.todosReducer
  }
}

export default connect(mapStateToProps)(ItemErrorPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode : 'contain',
    borderRadius: 250 / 2,
    marginBottom : 100
  },
  // button: {
  //   borderRadius: sizes.BUTTON_RADIUS,
  //   backgroundColor: Colors.redColor,
  //   marginTop: 100,
  //   marginBottom: 5,
  //   marginHorizontal: 10,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  // },
  // buttonText: {
  //   padding: 10 ,
  //   color: 'white',
  //   textAlign: 'center',
  //   fontWeight: '500',
  //   alignSelf: 'center',
  //   marginHorizontal: 10,
  // },
})