import React, { Component } from 'react';
import { Text, View ,StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../resources/Colors';

export default class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      originUri: null,
      thumbUri: null,
      // position: this.props.position,
      height: 300,
      width: 300,
      format: 'JPEG',
      quality: 80,
      avatarSource: '',
    }
  }

  options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  static defaultProps = {
    icon: <IconMaterialIcons name='add-a-photo' size={70} color={Colors.primaryColor}/>
  }
  
  // sendAvatarToParent = (source) => {
  //   this.props.getAvatarSource(source)
  // }

  openImagePicker = () => {
    ImagePicker.showImagePicker(this.options, async response => {
      // console.log('Response = ', response);
      this.setState({originUri: response.uri})
      let timestamp = +new Date;
      let fileName = timestamp + '_' + response.fileName;
      if (response.didCancel) {
          console.log('User cancelled image picker')
          return
      } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
          return
      } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
          return
      } else {
          const source = { uri: response.uri };
          this.setState({
            avatarSource: source,
          });
          // this.sendAvatarToParent(source)
      }

      // const file = new FormData();
      ////Upload without resize
      // file.append('photo', {
      //     uri: this.state.originUri,
      //     name: fileName,
      //     type: 'image/png',
      //     // type: 'multipart/form-data',
      // });
      // this.props.onUpload(file);

      let { height, width, quality, format, avatarSource } = this.state

      // Resize and post the thumb 
      const resizedImageUri = await ImageResizer.createResizedImage(
          this.state.originUri,
          this.state.height,
          this.state.width,
          this.state.format,
          this.state.quality
      ).then(({uri}) => {
        // file.append('photo', {
        //   uri: uri,
        //   name: fileName,
        //   type: 'image/png',
        // });

        let imageProperties = {
          uri: uri,
          name: fileName,
          type: 'image/png',
        }
        // console.log(imageProperties)
        this.props.onUpload(imageProperties);
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.openImagePicker}>
          {/* {this.props.compText ?
          <Text>{this.props.compText}</Text>
          : null
          } */}
          {this.props.icon}
        </TouchableOpacity>
        {this.state.avatarSource != "" ?
        <Image source={this.state.avatarSource} style={styles.uploadAvatar}/>
        : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // textAlign: 'center',
    // alignItems: 'center',
  },
  uploadAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  }
})