import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal, ScrollView } from 'react-native';
// import { connect } from 'react-redux';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import UserAvatar from './../misc/UserAvatar';
import Colors from '../../resources/Colors';
import AppHeader from './../AppHeader';
import { appStyles, sizes } from '../../resources/appStyles';
import * as Api from '../../configs/api'
import { addUserToShareList } from './../../configs/api';

const HEADER_IMAGE_SIZE = 100

class ShoppingListCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareModalVisible: 'false',
      sharedUserList: ''
    };
  }

  changeFavoriteList(id, name) {
    this.props.setShoppingFavoriteId(id, name)
  }

  handleShowModal = async (shoppingListId) => {
    this.setState({shareModalVisible: true})
    this.getUsersFromShareList(shoppingListId)
  }

  handleModalSave() {
    // this.setState({shareModalVisible: false, fabActive : false,})
    // this.props.dispatch(addShoppingListAction(this.state.shoppingName, this.state.shoppingDescription, this.state.shoppingImage))
  }

  handleModalCancel() {
    this.setState({shareModalVisible: false})
  }

  getUsersFromShareList(shoppingListId) {
    Api.getUsersListForShare(shoppingListId).then(response => this.setState({sharedUserList: response.body.payload}))
  }

  handleAddUserToShareList(shoppingListId, userId) {
    //TODO: ar trebui refactorizat asta, poate ar trebui pus in store
    //TODO: m-am grabit si merge si asa, lipsesc cateva chestii: Loading, check if rest response is ok stuff like that ...
    Api.addUserToShareList(shoppingListId, userId).then(response => {
      this.getUsersFromShareList(shoppingListId)
    })
  }

  handleRemoveUserFromShareList(shoppingListId, userId) {
    //TODO: ar trebui refactorizat asta, poate ar trebui pus in store
    //TODO: m-am grabit si merge si asa, lipsesc cateva chestii: Loading, check if rest response is ok stuff like that ...
    console.log(shoppingListId)
    console.log(userId)
    Api.deleteUserFromShareList(shoppingListId, userId).then(response => {
      this.getUsersFromShareList(shoppingListId)
    })
  }

  render() {
    let favoriteIcon = this.props.list.id == this.props.favoriteId ? 'favorite' : 'favorite-border'
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerImage}>
            <UserAvatar 
              uriAvatarDatabase={this.props.list.photo} 
              style={{marginBottom: 5}} 
              size={HEADER_IMAGE_SIZE} 
              isRound={false}
            />
          </View>
          <View style={styles.headerDescription}>
            <Text style={{color: Colors.lightGreenColor, fontSize: 20}}>{this.props.list.name} {this.props.list.id}</Text>
            <Text>{this.props.list.description}</Text>
          </View>
        </View>
        {/* <View style={styles.infoContainer}>

        </View> */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionsBtn, {backgroundColor: Colors.lightBlueColor}]} onPress={() => this.changeFavoriteList(this.props.list.id, this.props.list.name)}>
            <Text style={{color: Colors.whiteColor}}>ACTIVEAZA</Text>
          </TouchableOpacity>
          <View style={styles.favoriteContainerIcon}>
            <IconMaterialIcons name={favoriteIcon} size={20} color={Colors.redColor}/>
          </View>
          {this.props.list.isShared == 0 ?
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.actionsBtn}>
                <Text style={{color: Colors.lightBlueColor}}>MODIFICA</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionsBtn} onPress={() => this.props.onDeleteList(this.props.list.id)}>
                <Text style={{color: Colors.lightBlueColor}}>STERGE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionsBtn} onPress={() => this.handleShowModal(this.props.list.id)}>
                <IconMaterialIcons name='share' size={20} color={Colors.greenColor}/>
              </TouchableOpacity>
            </View>
            : 
            null
          }
        </View>

        {/* TODO: make this modal something else, maybe i can put it to ShoppingListScreen component */}
        <Modal
          animationType="slide" 
          transparent={false}
          visible={this.state.shareModalVisible}
          onRequestClose = {() => console.log('close modal')}
        >
          <View style={{flex: 1}}>
            <AppHeader title={this.props.list.name} rightIcon={<IconFontAwesome name='close' style = {appStyles.rightIcon} size ={sizes.ICON_SIZE_HEADER}/>} rightAction={() => this.handleModalCancel()}/>
            <View style={styles.sharedModalContainer}>
              <View style={styles.sharedModalPhotoContainer}>
                <Text>Aici poti shareui lista <Text style={{fontWeight: 'bold'}}>{this.props.list.name}</Text> la urmatorii useri: </Text>
              </View>
              <ScrollView>
                {/* <Text>thi is user</Text> */}
                {this.state.sharedUserList != '' && this.state.sharedUserList.map((item, index) => (
                  <View key={item.id} style={styles.itemModal}>
                    <Text>User: {item.name}</Text>
                      {item.isShared == 1 ?
                        <TouchableOpacity onPress={() => this.handleRemoveUserFromShareList(this.props.list.id, item.id)}>
                          <IconMaterialIcons name='delete-forever' size={20} color={Colors.redColor}/>
                        </TouchableOpacity>
                      :
                        <TouchableOpacity onPress={() => this.handleAddUserToShareList(this.props.list.id, item.id)}>
                          <IconMaterialIcons name='share' size={20} color={Colors.redColor}/>
                        </TouchableOpacity>
                      }
                  </View>
                  ))
                }
              </ScrollView>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     userDetailsReducer: state.userDetailsReducer
//   }
// }

// export default connect(mapStateToProps)(ShoppingListCmp)

export default ShoppingListCmp

const styles=StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.3,
    borderColor: Colors.greyColor,
    borderRadius: 7,
    backgroundColor: Colors.whiteColor,
    shadowColor: Colors.blackColor,
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContainer: {
    // flex: 3,
    flexDirection: 'row',
  },
  headerImage: {
    // alignSelf: 'center'
  },
  headerDescription: {
    marginHorizontal: 20,
  },
  infoContainer: {
    // flex: 1,
  },
  actionsContainer: {
    // flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.greyColorBackground,
  },
  actionsBtn: {
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center'
  },
  favoriteContainerIcon: {
    alignSelf: 'center',
  },
  itemModal: {
    flexDirection: 'row'
  }
})
