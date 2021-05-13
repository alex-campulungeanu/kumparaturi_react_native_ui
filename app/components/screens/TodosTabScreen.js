import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Modal, ScrollView, Alert} from 'react-native'
import {DrawerActions} from 'react-navigation-drawer'
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import Colors from '../../resources/Colors';
import BottomTabs from '../../constants/BottomTabs';
import TodosContainer from '../TodosContainer';
import AppHeader from '../AppHeader';
import DrawerIcon from './../common/DrawerIcon';
import { appStyles, sizes, misc } from './../../resources/appStyles';
import { deleteAllTodo, deleteTodo } from '../../actions/todoActions';
import Strings from '../../constants/StringList';
import * as Utils from '../../configs/utils';

const commonNavigationOptions = ({ navigation }) => ({
  header: null,
  title: navigation.state.routeName,
});

const routeOptions = {
  screen: TodosContainer,
  navigationOptions: commonNavigationOptions,
};

const TabNav = createMaterialTopTabNavigator(
  {
    [BottomTabs.ALL]: routeOptions,
    [BottomTabs.ACTIVE]: routeOptions,
    [BottomTabs.COMPLETED]: routeOptions,
  },
  {
    // navigationOptions: ({ navigation }) => ({
    //   tabBarIcon: ({ focused }) => {
    //     const { routeName } = navigation.state;
    //     let iconName;
    //     switch (routeName) {
    //       case BottomTabs.ALL:
    //         iconName = 'list-ul';
    //         break;
    //       case BottomTabs.ACTIVE:
    //         iconName = 'filter';
    //         break;
    //       case BottomTabs.COMPLETED:
    //         iconName = 'check-circle';
    //         break;
    //     }
    //     return (
    //       <Icon name={iconName} size={20} color={focused ? Colors.tabIconSelected : Colors.tabIconDefault} style={{ marginBottom: -3 }}/>
    //     );
    //   },
    // }),
    // tabBarComponent: TabBarBottom,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      labelStyle: {
        fontSize: 10,
        height: 20,
        color: Colors.blackColor,
        // margin: 0,
        marginTop: 5, //space between icon and label sub icon
        padding: 0,
      },
      tabStyle: {
        
      },
      style: {
        backgroundColor: Colors.whiteColor,
        // zIndex: '-1',
      },
      indicatorStyle: {
        backgroundColor: Colors.primaryColor,
      },
      showIcon: true,
    }
  },
);

class TabsNavig extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settingsModalVisible: false,
      favoriteListName: '',
      shoppingListId: '',
    }
  }
  static router = TabNav.router;

  componentDidMount() {
    //this is for updating AppHeader title when changing favorite shpping list
    //another approach is with redux-persist, maybe i will try on day https://codeburst.io/redux-persist-https-github-com-rt2zz-redux-persist-the-f098b773cdcd
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
      let shoppingListId = await Utils.getFavoriteShoppingList();
      let shoppingListName = await Utils.getFavoriteShoppingListName();
      this.setState({favoriteListName: shoppingListName, shoppingListId: shoppingListId})
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  ////Moved below on handleClearSelected
  // componentDidUpdate = (prevProps, prevState) => {
  //   const {todoListReducer} = this.props;
  //   if (todoListReducer.deleteItemError != '') {
  //     Toast.show({ text: Strings.NOT_ITEM_SELECTED, style: appStyles.toastStyle, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton, duration: 5000});
  //   }
  // };
  

  handleClearItems = (status_id, shopping_list_id) => {
    this.props.dispatch(deleteAllTodo(status_id, shopping_list_id));
  }

  handleClearSelected = () => {
    this.setState({settingsModalVisible: false})
    let data = this.props.todoListReducer.data;
    let filteredTodo = [];
    data.map(item => {
      if (item.isSelected) {
        filteredTodo.push(item.id)
      }
    })
    if (filteredTodo.length == 0) {
      Toast.show({ text: Strings.NOT_ITEM_SELECTED, style: appStyles.toastStyleError, textStyle:appStyles.toastTextStyle, buttonText: misc.taostButton, duration: misc.toastDurationShort});
    } else {
      Alert.alert(
        'Sigur stergi kumparaturile selectate ?',
        '',
        [
          {
            text: 'Sunt nehotarat', 
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'DA', onPress: () => this.props.dispatch(deleteTodo(filteredTodo))},
        ],
        {cancelable: false},
      );
    }
  }

  showConfirmationDeleteDlg = (status_id) => {
    this.setState({settingsModalVisible: false})
    let alertTitle = ((key) => {
      switch (key) {
        case '-1':
          return 'Esti SIGUR ca vrei sa stergi toata lista?'
          break;
        case '1': 
          return 'Esti SIGUR ca stergi doar cumparatele?'
        default:
          return 'Default alert title'
          break;
      }
    })(status_id)
    Alert.alert(
      alertTitle,
      '',
      [
        {
          text: 'Sunt nehotarat', 
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'DA', onPress: () => this.handleClearItems(status_id, this.state.shoppingListId)},
      ],
      {cancelable: false},
    );
  }
  
  render() {
    return(
      <View style={{flex: 1}}>
        <AppHeader
        title={this.state.favoriteListName}
        leftIcon={<DrawerIcon/>} 
        leftAction={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
        rightIcon = {<IconEntypo name='dots-three-vertical' style = {appStyles.rightIcon} size ={sizes.ICON_SIZE_HEADER}/>}
        rightAction = {() => this.setState({settingsModalVisible: !this.state.settingsModalVisible})}
        />
        <Modal 
          visible={this.state.settingsModalVisible}
          animationType='fade'
          transparent={true}
          onRequestClose={() => this.setState({settingsModalVisible: false})}
        >
          <TouchableWithoutFeedback onPress={() => { this.setState({settingsModalVisible: !this.state.settingsModalVisible}) }}>
            <View style={styles.settingsModalContainer}>
              <View style={styles.settingsModal}>
                <TouchableOpacity style={styles.settingsItem} onPress={() => this.showConfirmationDeleteDlg('-1')}>
                  <IconFontAwesome name='list-ul' size={15} color={Colors.primaryColor}/>
                  <Text style={styles.optionText}>Sterge toate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem} onPress={() => this.showConfirmationDeleteDlg('1')}>
                  <IconFontAwesome name='check-square-o' size={15} color={Colors.primaryColor}/>
                  <Text style={styles.optionText}>Sterge cumparate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem} onPress={this.handleClearSelected}>
                  <IconFontAwesome name='square-o' size={15} color={Colors.lightGreenColor}/>
                  <Text style={[styles.optionText, {color: Colors.lightGreenColor}]}>Sterge selectate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <TabNav navigation={this.props.navigation} 
                screenProps={{
                  // settings: this.props.settings,
                  itemsList: this.props.todoListReducer.data
                }}
        />
      </View>
    )
  }
}

// export default TabsNavig;
function mapStateToProps(state) {
  return {
    todoListReducer: state.todosReducer
  }
}
  
export default connect(mapStateToProps)(TabsNavig);

const styles = StyleSheet.create({
  settingsModalContainer: {
    flex:1,
  },
  settingsModal: {
    flex: 1,
    borderRadius: 5,
    borderColor: Colors.greyColor,
    shadowColor: Colors.whiteColor,
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 1.5,
    shadowRadius: 30,
    backgroundColor: Colors.whiteColor,
    // opacity: 0.9,
    position: 'absolute',
    elevation: 10,
    right: 10,
    // width: 180,
    // zIndex: 2,
    marginTop: sizes.HEADER_HEIGHT,
    alignItems: 'flex-start'
  },
  settingsItem: {
    padding: 10,
    flexDirection: 'row',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  optionText: {
    // marginLeft: 20,
    // marginRight: 20
    marginHorizontal: 20,
  }
  })
