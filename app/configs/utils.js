import {AsyncStorage, Platform, Alert} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import constants from "../constants/constants";

const randomColors = [
  '#F44336', '#e91e63', '#9c27b0', '#673ab7',
  '#ff9800', '#ff5722', '#795548', '#607d8b',
  '#3f51b5', '#2196F3', '#00bcd4', '#009688',
  '#2196F3', '#32c787', '#00BCD4', '#ff5652',
  '#ffc107', '#ff85af', '#FF9800', '#39bbb0',
  '#4CAF50', '#ffeb3b', '#ffc107', '#A71D31',
  '#D5BF86', '#A71D31', '#3F0D12', '#988F2A',
  '#599FDF', '#322F20', '#6A5837', '#FE5F00',
  '#0A2047', '#959252', '#77869E', '#923F35',
];

export const storeToken = async (token) => {
  try {
    console.log('Jwt is : ', token)
    await AsyncStorage.setItem('token', token)
  } catch(error) {
    //error
  }
}

export const deleteToken = async () => {
  console.log('enter deleteToken utils.js')
    await AsyncStorage.removeItem('token');
}

export const storeFavoriteShoppingList = async (id, name) => {
  await AsyncStorage.setItem(constants.SHOPPING_LIST_ID_STORAGE, id.toString())
  await AsyncStorage.setItem(constants.SHOPPING_LIST_NAME_STORAGE, name)
}

export const getFavoriteShoppingList = async () => {
  let shoppingListId = await AsyncStorage.getItem(constants.SHOPPING_LIST_ID_STORAGE);
  return shoppingListId;
}

export const getFavoriteShoppingListName = async () => {
  let shoppingListName = await AsyncStorage.getItem(constants.SHOPPING_LIST_NAME_STORAGE);
  return shoppingListName;
}

// export const storeUsername = async (username) => {
//   try {
//     await AsyncStorage.setItem('username', username)
//   } catch(error) {
//     console.log('error utils: ', error)
//   }
// }

// export const storeUserProfilePic = async (profilePic) => {
//   try {
//     await AsyncStorage.setItem('profile_pic', profilePic)
//   } catch(error) {
//     console.log('error utils: ', error)
//   }
// }

export const numberToBoolean = (number) => {
  switch(number) {
    case '1':
      return true
    case '0':
      return false
  }
  return false
}

export const booleanToNumber = (value) => {
  switch(value) {
    case true:
      return '1'
    case false:
      return '0'
  }
  return '0'
}

export const hasInternetConnectivity = () => {
  return NetInfo.fetch().then(state => {
    if (state.isConnected) {
      return true;    
    } else {
      return false;
    }
  });
}

export const sortByProperty = (property) => {
  return (a, b) => {
    if(a[property] > b[property])  
         return 1;  
      else if(a[property] < b[property])  
         return -1;  
  
      return 0; 
  }
}

export const undefinedToNA = (value, defaultValue='N/A') => {
  if (typeof value == 'undefined') {
    return 'N/A';
  } else {
    return value;
  }
}

export function getRandomColor(inputString) {
  inputString = inputString.substr(0, 10);

  var hash = 0;
  for (var i = 0; i < inputString.length; i++) {
      hash = 31 * hash + inputString.charCodeAt(i);
  }
  var index = Math.abs(hash % randomColors.length);
  return randomColors[index];
}