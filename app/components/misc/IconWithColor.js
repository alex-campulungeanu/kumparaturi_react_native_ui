import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class IcontWithColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // console.log('this.props.incon', this.props.icon);
    return this.props.icon
  }
}
