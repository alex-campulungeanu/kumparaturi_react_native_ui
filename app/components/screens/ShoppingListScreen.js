import React, { Component } from 'react';
import { View, Text, ScrollView, Modal, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, TextInput, AsyncStorage, Alert } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Fab, Button, Icon, Form, Item, Label, Input, Textarea } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DrawerIcon from './../common/DrawerIcon';
import AppHeader from './../AppHeader';
import ImageUpload from './../ImageUpload';
import { getAllShoppingListsAction, addShoppingListAction, deleteShoppingListAction } from './../../actions/shoppingListActions';
import { getAllTodos } from './../../actions/todoActions';
import ShoppingListCmp from '../features/ShoppingListCmp';
import Colors from '../../resources/Colors';
import { sizes, appStyles } from './../../resources/appStyles';
import TodoModal from './../misc/TodoModal';
import DefaultButton from './../common/DefaultButton';
import StringList from '../../constants/StringList';
import constants from '../../constants/constants';
import LoadingIndicator from './../Loading/LoadingIndicator';
import * as Utils from '../../configs/utils';

class ShoppingListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fabActive : false, 
      modalVisible: false,
      shoppingName: '',
      shoppingDescription: '',
      shoppingImage: '',
      favoriteId: ''
    };
  }

  async componentDidMount() {
    //TODO: strange what i did here, maybe is another solution
    const favListId= await AsyncStorage.getItem(constants.SHOPPING_LIST_ID_STORAGE);
    this.setState({ favoriteId: favListId});
    this.props.dispatch(getAllShoppingListsAction())
  }

  renderModalBody() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>Kumparatura: </Text>
        <TextInput
          // style={styles.textInput}
          onFocus = {() => this.setState({ isFocused: true, focusColor: Colors.lightGreenColor })}
          onEndEditing = {() => this.setState({ isFocused: false, focusColor: Colors.greyColorBackground })}
          autoCapitalize="none"
          />
      </View>
    )
  }

  handleModalSave() {
    this.setState({modalVisible: false, fabActive : false,})
    this.props.dispatch(addShoppingListAction(this.state.shoppingName, this.state.shoppingDescription, this.state.shoppingImage))
  }

  handleModalCancel() {
    this.setState({modalVisible: false, fabActive : false,})
  }

  setShoppingImage = (image) => {
    console.log('image is : ', image)
    this.setState({shoppingImage: image})
  }

  setFavoriteId = (id, name) => {
    //TODO: this set AsyncStorage should be made with a persistent state manangement like redux_persist
    Utils.storeFavoriteShoppingList(id, name)
    this.props.dispatch(getAllTodos())
    this.setState({favoriteId: id})
    this.props.navigation.navigate('TodosTabScreen')
  }
  handleDeleteList = (id) => {
    console.log('entere handle delete')
    Alert.alert(
      'Sigur stergi lista ?',
      '',
      [
        {
          text: StringList.UNDECIDED, 
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: StringList.YES, onPress: () => this.props.dispatch(deleteShoppingListAction(id))},
      ],
      {cancelable: false},
    );

    // this.props.dispatch(deleteShoppingListAction(id))
  }

  handleRefreshList = () => {
    
  }

  render() {
    // if (this.props.shoppingReducer.isLoading) {
    //   return (
    //     <LoadingIndicator />
    //   )
      
    // }
    return (
      <View style={{flex : 1}}>
        <AppHeader title='Listele' leftIcon={<DrawerIcon />} leftAction={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}/>
        {this.props.shoppingReducer.isLoading ? 
          <LoadingIndicator />
          :
          <ScrollView>
          {this.props.shoppingReducer.data.map((item, index) => (
            <View key={item.id} style={styles.item}>
              <ShoppingListCmp 
                list={item} 
                favoriteId = {this.state.favoriteId} 
                setShoppingFavoriteId = {this.setFavoriteId}
                onDeleteList={this.handleDeleteList}/>
            </View>
            ))
          }
          </ScrollView>
        }
        <Fab
            active={this.state.fabActive}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: Colors.primaryColor }}
            position="bottomRight"
            onPress={() => this.setState({ fabActive: !this.state.fabActive })}>
            <Icon type="Entypo" name="add-to-list" />
            <Button style={{ backgroundColor: Colors.lightGreenColor }} onPress={() => this.setState({modalVisible: true})}>
              <Icon type="AntDesign" name="pluscircle" />
            </Button>
            <Button style={{ backgroundColor: Colors.lightGreenColor }} onPress={() => this.props.dispatch(getAllShoppingListsAction())}>
              <Icon type="FontAwesome" name="refresh" />
            </Button>
        </Fab>

        <Modal
          animationType="slide" 
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose = {() => console.log('close modal')}
        >
          <View style={{flex: 1}}>
            <AppHeader title='Adauga lista' rightIcon={<IconFontAwesome name='close' style = {appStyles.rightIcon} size ={sizes.ICON_SIZE_HEADER}/>} rightAction={() => this.handleModalCancel()}/>
            <View style={styles.modalContainer}>
              <View style={styles.addPhotoContainer}>
                <ImageUpload 
                  onUpload={this.setShoppingImage} 
                  compText='Alege o poza'
                  icon = {<IconMaterialIcons name='add-a-photo' size={70} color={Colors.primaryColor}/>}
                />
              </View>
              <Form>
                <Item floatingLabel style={styles.formItem}>
                  <Label>Nume</Label>
                  <Input value={this.state.shoppingName} onChangeText={(text) => this.setState({shoppingName: text})}/>
                </Item>
                <Item floatingLabel style={styles.formItem}>
                  <Label>Descriere</Label>
                  <Input value={this.state.shoppingDescription} onChangeText={(text) => this.setState({shoppingDescription: text})}/>
                </Item>
              </Form>
              <View style={styles.mdlSaveBtn}>
                <DefaultButton 
                  onButtonPress={() => this.handleModalSave()}
                  isLoading={false}
                  buttonText={StringList.SAVE}
                />
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

// const ShoppingListScreen = createStackNavigator({
//   ShoppingListScreen: {
//     screen: ShoppingListScreenStack,
//     navigationOptions: ({ navigation }) => ({
//       header: <AppHeader title='Listele' leftIcon={<DrawerIcon />} leftAction={() => navigation.dispatch(DrawerActions.openDrawer())}/>
//     })
//   },
// });

function mapStateToProps(state) {
  return {
    shoppingReducer: state.shoppingListReducer
  }
}

export default connect(mapStateToProps)(ShoppingListScreen)


const styles=StyleSheet.create({
  modalContainer: {
    flex: 1
  },
  item: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  addPhotoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  formItem: {
    marginHorizontal : 40,
    borderBottomWidth: 1,
  },
  mdlSaveBtn: {
    position: 'absolute',
    bottom: 50,
    right: 3
  }
})