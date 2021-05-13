import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from '../../resources/Colors'
import IconWithColor from './../misc/IconWithColor';
import {ValidIcon, InvalidIcon} from '../common/CheckValidIcons'

class InputWithIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focusColor: Colors.greyColorBackground,
      isFocused: false,
    }
  }

  static defaultProps = {
    icon: <IconFontAwesome name='smile-o' size={20} />
  }

  render() {
    return (
      <View style={[styles.inlineInput, {borderBottomColor: this.state.focusColor, backgroundColor: this.props.backColor}]}>
        <IconWithColor icon={this.props.icon}/>
        {/* {this.props.icon} */}
        <TextInput
          style={styles.textInput}
          onFocus = {() => this.setState({ isFocused: true, focusColor: Colors.lightGreenColor })}
          onEndEditing = {() => this.setState({ isFocused: false, focusColor: Colors.greyColorBackground })}
          autoCapitalize="none"
          {...this.props}
          />
        {typeof this.props.isValid !== 'undefined' ?
          this.props.isValid ? (<ValidIcon/>)
          :!this.props.isValid ? (<InvalidIcon/>)
        : null : null}
      </View>
    )
  }
}

export default InputWithIcon;

const styles = StyleSheet.create({
  inlineInput: {
    flexDirection: 'row',
    marginHorizontal: 50,
    marginBottom: 30,
    textAlign: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.greyColorBackground,
    height: 40
  },
  textInput: {
    width: '100%',
  },
})