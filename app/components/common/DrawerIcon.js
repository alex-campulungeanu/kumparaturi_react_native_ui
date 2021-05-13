import React, { Component } from 'react';
import { View, Text } from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { appStyles, sizes } from '../../resources/appStyles'

export default class DrawerIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <IconFontAwesome5 name='stream' style = {appStyles.leftIcon} size ={sizes.ICON_SIZE_HEADER}/>
    );
  }
}
