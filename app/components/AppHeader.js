import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Container, Content, Header, Body, Title, Left, Right, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../resources/Colors' ;
import { sizes } from '../resources/appStyles';

class AppHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Header transparent={this.props.transparent} style = {styles.container} androidStatusBarColor={Colors.primaryColor}>
        <Left>
          {/* {this.props.leftIconName ?
          <TouchableOpacity onPress={this.props.leftAction}>
            <Icon name={this.props.leftIconName} style = {styles.leftIcon} size ={30}/>  
          </TouchableOpacity>
          :null } */}
        {this.props.leftIcon && this.props.leftAction ?
          <TouchableOpacity onPress={() => this.props.leftAction()}>
            {this.props.leftIcon}
          </TouchableOpacity>
        : null}
        </Left>
        <Body>
          <Title style={styles.title}>{this.props.title}</Title>
          <Text style={styles.subTitle}>{this.props.subTitle}</Text>
        </Body>
        <Right>
        {this.props.rightIcon && this.props.rightAction ?
          <TouchableOpacity onPress={() => this.props.rightAction()}>
            {this.props.rightIcon}
          </TouchableOpacity>
        : null}
        </Right>
      </Header>
    )
  }
}

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    height: sizes.HEADER_HEIGHT,
    // elevation: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.greyColor,
    // shadowColor: "#000000",
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 1
    // }
  },
  title: {
    color: Colors.primaryColor, 
    fontSize : 25,
    marginBottom: 0
  },
  subTitle: {
    marginTop: -4,
  },
  leftIcon: {
    color: Colors.primaryColor,
  }
})