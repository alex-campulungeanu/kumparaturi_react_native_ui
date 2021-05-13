import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Keyboard, ActivityIndicator, Modal } from 'react-native'
import { CheckBox, Body, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Colors from '../resources/Colors';
import UserAvatar from './misc/UserAvatar';
import InputWithIcon from './common/InputWithIcon';
import TodoModal from './misc/TodoModal';
import { sizes, appStyles, misc } from '../resources/appStyles';
import * as Utils from '../configs/utils';
import StringList from '../constants/StringList';
import regexpList from '../constants/regexpList';

const ICON_SIZE = 25;

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
        completed: this.props.completed,
        isEditing: false,
        editedItem: '',
        newEditedItem: '',
        isLoadingStatus: false,
        isEditModalVisible: false,
        isInfoModalVisible: false,
        isSelected: false
    }
  }
  
  componentDidMount() {
    this.setState({ editedItem: this.props.todo.name })
  }

  componentWillUnmount() {
    //not sure if this is used, see loading indicator for TodosContainer
    // this.setState({isLoadingStatus: false})
  }

  componentDidUpdate(prevProps) {
    if (this.props.completed !== prevProps.completed) {
      this.setState({isLoadingStatus: false})
    }
    if (this.props.todoName !== prevProps.todoName) {
      this.setState({isLoadingStatus: false})
    }
  }
  
  toogleCompleted () {
    this.setState({
      completed: !this.state.completed,
      isLoadingStatus: true,
    }, () => {
      let new_status_id = this.props.completed ? 0 : 1
      this.props.onUpdateStatus(this.props.todo.id, new_status_id)
    })
  }

  handleEdit() {
    // this.props.changeVisibility()
    // this.setState({isEditing: true})
    this.setState({isEditModalVisible: !this.state.isEditModalVisible})
    this.handleShowOptions(this.props.todo.id)
  }

  handleDelete(id) {
    // this.setState({isLoadingStatus: true})
    this.props.onDelete(id)
  }

  handleShowInfo() {
    this.setState({isInfoModalVisible: !this.state.isInfoModalVisible})
    this.handleShowOptions(this.props.todo.id)
  }
  
  handleSaveEdit() {
    Keyboard.dismiss()
    let itemRegexp = regexpList.ITEM_REGEXP
    this.setState({isEditModalVisible: false})
    if (itemRegexp.test(this.state.newEditedItem) ) {
      this.setState({isLoadingStatus: true,}, () => this.props.onEditItemName(this.props.todo.id, this.state.newEditedItem) )
      // this.props.onEditItemName(this.props.todo.id, this.state.newEditedItem)
    } else {
      Toast.show({ text: StringList.ITEM_NOT_MATCH_RULES, style: appStyles.toastStyleError, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton,  duration: misc.toastDurationLong});
    }
    // this.props.changeVisibility()
    // this.setState({editedItem: this.state.newEditedItem, newEditedItem: '', isEditing: false})
  }
  
  handleCancelEdit(){
    // this.props.changeVisibility()
    Keyboard.dismiss();
    this.setState({newEditedItem: '', isEditing: false, isEditModalVisible: false})
  }

  handleShowOptions(itemId) {
    this.props.onShowOptions(itemId)
  }

  handleLongPressItem(id) {
    this.props.onSelectItem(id)
  }

  renderEditModalBody() {
    return (
      <InputWithIcon 
        placeholder= {this.props.todo.name}
        onChangeText={(text) => this.setState({newEditedItem: text})}
        icon = {<IconMaterialCommunityIcons name='pencil' size={ICON_SIZE} color={Colors.lightGreenColor} />}
        autoFocus = {true} 
      />
    )
  }

  renderInfoModalBody() {
    return (
      <View>
        <View style={styles.textInfoContainer}><Text><Text style={styles.textInfo}>Kumparatura:</Text> {this.props.todo.name}</Text></View>
        <View style={styles.textInfoContainer}><Text><Text style={styles.textInfo}>Cine a adaugat:</Text> {this.props.todo.username}</Text></View>
        <View style={styles.textInfoContainer}><Text><Text style={styles.textInfo}>Data:</Text> {this.props.todo.create_date}</Text></View>
      </View>
    )
  }

  getItemStyle() {
    if (this.props.completed) {
      return styles.itemCompleted;
    } else {
      return styles.itemInCompleted;
    }
  }

  render() {
    const {onDelete, todo, completed, onEditItemName} = this.props
    let completedIconName = completed ? 'check-square-o' : 'square-o';
    let selectedStyle = this.props.isSelected ? styles.selected : null;
      return (
        <View style={{flex: 1}}>
        <View style = {[styles.container, selectedStyle]}>
            <View style={styles.itemContainer}>
                <View style = {styles.textBody}>
                  <TouchableOpacity onPress={() => this.handleLongPressItem(todo.id)}>
                    <View>
                      <UserAvatar uriAvatarDatabase={todo.user_photo} style={{marginBottom: 5}} size={30}/>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.itemText} onPress = {() => this.handleShowOptions(todo.id)} disabled={this.state.isLoadingStatus}>
                    <Text style = {[{fontSize: 15}, this.getItemStyle()]}> 
                      {todo.name}
                    </Text>
                  </TouchableOpacity>
                </View>
                {!this.state.isLoadingStatus ?
                <View style = {styles.actionsBtnContainer}>
                  <TouchableOpacity onPress = {() => this.toogleCompleted()}>
                    <IconFontAwesome name={completedIconName} size={ICON_SIZE} color={Utils.getRandomColor(todo.name)}/>
                  </TouchableOpacity>
                </View>
                : 
                <View style = {styles.actionsBtnContainer}>
                  <ActivityIndicator color={Colors.lightGreenColor} size='small'/>
                </View> }
          </View>
          {this.props.showOptions ?
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => this.handleShowInfo() }>
                <IconFontAwesome name='info' size={ICON_SIZE} color={Colors.lightGreenColor}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => this.handleEdit() }>
                <IconFontAwesome name='edit' size={ICON_SIZE} color={Colors.lightGreenColor}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => this.handleDelete([todo.id]) }>
                <IconFontAwesome name='remove' size={ICON_SIZE} color={Colors.lightGreenColor}/>
              </TouchableOpacity>
            </View>
          : null
          }
        </View>
        <TodoModal 
          visibil={this.state.isEditModalVisible}
          header='Edit kumparatura'
          body={this.renderEditModalBody()}
          handleCancel={() => this.handleCancelEdit()}
          handleSave={() => this.handleSaveEdit()}
        />
        <TodoModal 
          visibil={this.state.isInfoModalVisible}
          header='Info kumparatura'
          body={this.renderInfoModalBody()}
          handleCancel={() => this.setState({isInfoModalVisible: false})}
          handleSave={() => this.setState({isInfoModalVisible: false})}
        />
      </View>        

      )
    // }
  }
}

// TodoItem.propTypes = {
//   onUpdate: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// }

// function mapStateToProps(state) {
//   return {
//     changeAvatarReducer: state.changeAvatarReducer,
//   }
// }

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: sizes.BUTTON_RADIUS,
    overflow: 'hidden',
    // borderWidth: 1,
},
  actionsBtnContainer: {

  },
  actionBtn: {

  },
  itemContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  itemText: {
    marginLeft: 15,
  },
  textBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10,
    width: '60%',
  },
  // editModalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   opacity: 0.9,
  //   backgroundColor: Colors.greyColor,
  // },
  // editModal: {
  //   backgroundColor: Colors.whiteColor,
  //   width: 300,
  //   height: 300,
  //   borderRadius: 5,
  // },
  // editModalHeader: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginHorizontal: 20,
  //   height: 50,
  //   borderBottomWidth: 0.3,
  //   borderBottomColor: Colors.greyColor,
  // },
  // editModalBody: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // editModalFooter: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  //   marginRight: 30,
  //   marginBottom: 30,
  //   borderBottomColor: Colors.greyColor,
  // },
  OkAction: {
    marginLeft: 30,
  },
  textInfoContainer: {
    marginBottom: 30,
  },
  textInfo: {
    fontWeight: 'bold',
    color: Colors.lightGreenColor,
  },
  selected: {
    backgroundColor: Colors.lightGreenColor,
  },
  itemCompleted: {
    color: Colors.greyColor,
    textDecorationLine: 'line-through'
  }, 
  itemInCompleted: {
    color: Colors.blackColor,
    textDecorationLine: 'none'
  }
})