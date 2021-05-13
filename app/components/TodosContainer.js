import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Alert, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';

import Colors from '../resources/Colors';
import TodoItem from './TodoItem';
import LoadingIndicator from './Loading/LoadingIndicator';
import BottomTabs from '../constants/BottomTabs';
import { getAllTodos, deleteTodo, addTodo, updateTodoStatus, editTodoName, selectTodo } from '../actions/todoActions';
import AddTodoInput from './AddTodoInput';
import ItemErrorPage from './misc/ItemErrorPage';
import * as Utils from '../configs/utils';

const DEFAULT_ITEM_ID = -1

class TodosContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addingTodo: false,
      isFetching: false,
      addTodoVisible: true,
      itemPressed: DEFAULT_ITEM_ID,
    }
  }

  static navigationOptions = ({ screenProps, navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        let filteredData = screenProps.itemsList;
        switch (routeName) {
          case BottomTabs.ALL:
            iconName = 'list-ul';
            filteredData = screenProps.itemsList;
            break;
          case BottomTabs.ACTIVE:
            iconName = 'filter';
            filteredData = screenProps.itemsList.filter(todo => todo.status_id == 0);
            break;
          case BottomTabs.COMPLETED:
            iconName = 'check-circle';
            filteredData = screenProps.itemsList.filter(todo => todo.status_id == 1);
            break;
        }
        return (
          <View style={{flex: 1}}>
             <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{filteredData.length}</Text>
            </View>
            <View style={{zIndex: 0}}>
              <IconFontAwesome5 name={iconName} size={20} color={focused ? Colors.tabIconSelected : Colors.tabIconDefault} style={{ marginBottom: -3}}/>
            </View>
          </View>
        );
      },
    })

  componentDidMount() {
    if(this.props.navigation.state.key == BottomTabs.ALL) { //TODO: O MARE PROSTIE, AR TREBUI SA GASESC INDEXUL PRIMULUI TAB, DEOCAMDATA MERGE ASA !!!
      this.props.dispatch(getAllTodos())
    }
  }

  componentDidUpdate() {
    if (this.props.todoListReducer.tokenError && this.props.navigation.isFocused()) {
      Alert.alert(
        'Token Error',
        'Eroare Autenfiticare',
        [
          {text: 'OK',},
        ],
        { cancelable: false }
        )
      // this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'SignIn'}));
      this.props.navigation.navigate('SignIn');
    }
  }

  deleteItem = (id) => {
    this.props.dispatch(deleteTodo(id))
  }

  addItem = (text) => {
    this.props.dispatch(addTodo(text))
    // if (this.props.todoListReducer.error !== '') {
    //   Alert.alert(
    //     'Adauga',
    //     this.props.todoListReducer.error,
    //     [
    //       {text: 'OK', onPress: () => console.log('OK Pressed')},
    //     ],
    //     { cancelable: false }
    //     )
    // }
  }

  updateItemStatus = (id, status_id) => {
    this.props.dispatch(updateTodoStatus(id, status_id))
  }

  editItemName = (id, item) => {
    this.props.dispatch(editTodoName(id, item))
  }

  onRefresh() {
    this.setState({ isFetching: true }, () => this.props.dispatch(getAllTodos()));
  }

  filterTodosData = (todosData) => {
    let screen = this.props.navigation.state.key
    switch (screen) {
      case BottomTabs.ALL:
        return todosData;
      case BottomTabs.ACTIVE:
        return todosData.filter(todo => todo.status_id == 0);
      case BottomTabs.COMPLETED:
        return todosData.filter(todo => todo.status_id == 1);
    }
    return todosData;
  };

  setModalVisiblty = (visible) => {
    this.setState({
      visibilityModal: visible
    })
  }

  onPressAddTodo = () => {
    this.setState({visibilityModal: true})
  }
  
  toogleAddTodoVisibility = () => {
    this.setState({
      addTodoVisible : !this.state.addTodoVisible
    })
  }

  itemSelected = (value) => {
    if (this.state.itemPressed == value) {
      this.setState({itemPressed: DEFAULT_ITEM_ID})
    } else {
      this.setState({itemPressed: value})
    }
  }

  selectItem = (id) => {
    this.props.dispatch(selectTodo(id))
  }

  renderEmptyList = () => {
    return (
      <View style={styles.emptyCartContainer}>
        <Image
          style={styles.cartImage}
          source={require('../../assets/empty_cart.png')}
        />
      </View>
    )
  }

  render() {
    let filteredData = this.filterTodosData(this.props.todoListReducer.data);
    // let dimScreen = Dimensions.get('window').width
    //start Animated row deleting
    this.rowSwipeAnimatedValues = {};
    filteredData
        .forEach((value, i) => {
            this.rowSwipeAnimatedValues[value.id] = new Animated.Value(0);
        });
    // this.rowTranslateAnimatedValues = {};
    // filteredData
    //     .forEach((value, i) => {
    //         this.rowTranslateAnimatedValues[value.id] = new Animated.Value(1);
    //     });

    onSwipeValueChange = (swipeData) => {
      console.log('ENTER swipeData')
      const { key, value } = swipeData;
      // 375 or however large your screen is (i.e. Dimensions.get('window').width)
      if (value < -375 && !this.animationIsRunning) {
          this.animationIsRunning = true;
          Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
            console.log('enter snimation onswipeChangevalue')
              // const newData = [...this.state.listViewData];
              // const prevIndex = this.state.listViewData.findIndex(item => item.key === key);
              // newData.splice(prevIndex, 1);
              // this.setState({listViewData: newData});
              this.animationIsRunning = false;
          });
      }
    }    
    
    //end Animated
    if (this.props.todoListReducer.error != '') {
      return(
        <View style = {styles.container}>
          <ItemErrorPage handleButton={() => this.onRefresh()}/>
        </View>
      )
    }

    return (
      <View style = {styles.container}>
        <View style = {styles.todoList}>
        {/* Maybe it's a more elegant solution for this ternary mumble ! */}
        {!this.props.todoListReducer.isLoading 
        ?
          <SwipeListView
            leftOpenValue={75}
            rightOpenValue={-75}
            // onSwipeValueChange={this.onSwipeValueChange}
            disableLeftSwipe={true}
            keyboardShouldPersistTaps='always'
            showsVerticalScrollIndicator={false}
            data={filteredData}
            onRefresh={() => this.onRefresh()}
            refreshing={this.props.todoListReducer.isFetching}
            keyExtractor={item => item.id.toString()}
            isLoadingStatus='handled'
            ListEmptyComponent = {this.renderEmptyList}
            renderItem={({ item }) => {
                        return (
                  //         <Animated.View style={[styles.rowFront, 
                  //           {
                  //               height: this.rowTranslateAnimatedValues[item.id].interpolate({
                  //                   inputRange: [0, 1],
                  //                   outputRange: [0, 50],
                  //               })
                  //           }
                  //       ]}>
                  //           <TouchableOpacity
                  //               onPress={ () => console.log('You touched me') }
                  //               style={styles.rowFront}
                  //               underlayColor={'#AAA'}
                  //           >
                  //               <View>
                  //                   <Text>I am  in a SwipeListView2</Text>
                  //               </View>
                  //           </TouchableOpacity>
                  //       </Animated.View>

                          <View style={styles.rowFront}>
                            <TodoItem 
                              todo = {item} 
                              todoName = {item.name} // nu merge cu props todo !!! nu vede diferente intre this.props si prevProps pentru todo
                              completed = {item.status_id == 0 ? false : true} 
                              onDelete={this.deleteItem}
                              onSelectItem = {this.selectItem}
                              isSelected = {item.isSelected}
                              onUpdateStatus = {this.updateItemStatus}
                              onEditItemName = {this.editItemName}
                              changeVisibility = {this.toogleAddTodoVisibility}
                              showOptions = {this.state.itemPressed == item.id ? true : false}
                              onShowOptions = {this.itemSelected}
                              />
                          </View>
                        )
                      }
                    }
            renderHiddenItem={ (data, rowMap) => {
                return (
                  <View style={styles.rowBack}>
                      <TouchableOpacity 
                        style={[styles.backLeftBtn, /*styles.backLeftBtnRight, */]}
                        onPress={() => {this.deleteItem([data.item.id])} }
                      >
                        <MaterialIcons name='delete-sweep' size={30} color={Utils.getRandomColor(data.item.name)}/>
                      </TouchableOpacity>
                  </View>
                )
            }
            }
          />
        :
          <LoadingIndicator />
        }
        </View>
        {this.state.addTodoVisible ? (
          <AddTodoInput 
            onAdd={(todo) => { this.addItem(todo) }}
            isLoading = {this.props.todoListReducer.isLoadingAddTodo}
          />
        ) : null }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    todoListReducer: state.todosReducer
  }
}
  
export default connect(mapStateToProps)(TodosContainer);

const styles = StyleSheet.create({
  container: {
    flex : 1, 
    // backgroundColor: Colors.whiteColor, 
  },
  todoList: {
    flex: 2,
    marginHorizontal: 30,
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -6,
    height: 16,
    width: 16,  
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.redColor,
    zIndex: 1
  },
  badgeText: {
    fontSize: 15, 
    color: Colors.whiteColor
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red'
  },
  emptyCartContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100%',
    // width: '100%',
  },
  cartImage: {
    width: 200, 
    height: 200,
    resizeMode: 'contain',
  },

  rowFront: {
    // alignItems: 'center',
    backgroundColor: 'white',
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    justifyContent: 'center',
    // height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  // backLeftBtnLeft: {
  //     backgroundColor: 'blue',
  //     left: 75,
  // },
  // backLeftBtnRight: {
  //     backgroundColor: 'red',
  //     left: 0,
  // },
  trash: {
    height: 25,
    width: 25,
  },
});
