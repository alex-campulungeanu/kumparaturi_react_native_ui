import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class UserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let defaultUri = require('../../../assets/default_avatar.png')
    let uriUserAvatar = this.props.uriAvatarDatabase !== '' && typeof this.props.uriAvatarDatabase !== 'undefined' ? {uri: 'data:image/gif;base64,' + this.props.uriAvatarDatabase} : defaultUri
    let isRound = this.props.isRound || typeof this.props.isRound == 'undefined' ? 2 : this.props.size 

    return (
      <Image
        style={{width: this.props.size, height: this.props.size, borderRadius: this.props.size/isRound}}
        source={uriUserAvatar}
      />
    );
  }
}

UserAvatar.propTypes = {
  uriUserAvatar: PropTypes.string,
  style: PropTypes.object,
  isRound: PropTypes.bool,
  size: PropTypes.number
}