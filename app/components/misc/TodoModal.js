import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native'

import Colors from '../../resources/Colors'

class TodoModal extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <Modal
          // animationType="slide"
          transparent={true}
          visible={this.props.visibil}
          onRequestClose = {() => console.log('close modal')}
        >
          <View style = {styles.editModalContainer}>
            <View style={styles.editModal}>
              <View style={styles.editModalHeader}>
                <Text style={styles.editModalHeaderText}>{this.props.header}</Text>
              </View>
              <View style={styles.editModalBody}>
                {this.props.body}
              </View>
              <View style={styles.editModalFooter}>
                <TouchableOpacity style={styles.CancelAction} onPress={() => this.props.handleCancel()}>
                  <Text style={{fontSize: 15}}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.OkAction} onPress={() => this.props.handleSave()}>
                  <Text style={{fontSize: 15, fontWeight: 'bold', color: Colors.greenColor}}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    )
  }
}

export default TodoModal;

const styles = StyleSheet.create({
  editModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: Colors.greyColor,
  },
  editModal: {
    backgroundColor: Colors.whiteColor,
    width: 300,
    height: 300,
    borderRadius: 5,
  },
  editModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    height: 50,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.greyColor,
    // shadowColor: Colors.whiteColor,
    // shadowOffset: { height: -10 },
    // shadowOpacity: 1.5,
    // shadowRadius: 30,
    // elevation: 2,
  },
  editModalHeaderText: {
    // marginLeft: 15,
    color: Colors.primaryColor,
  },
  editModalBody: {
    flex: 1,
    marginTop: 30,
    marginLeft: 30,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  editModalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 30,
    marginBottom: 30,
    borderBottomColor: Colors.greyColor,
  },
  OkAction: {
    marginLeft: 30,
  }
})