import constants from './../constants/constants';
import axios from 'axios';
import { AsyncStorage, BackAndroid, Alert } from 'react-native';

import * as Utils from '../configs/utils'

//// axios.defaults.baseURL = constants.BASE_URL;

const request = async (options) => {
  // try {
    const defaults = {baseURL: 'http://192.168.0.104:8083',
                      showError: false,
                      timeout: 60000, //timeout 60 seconds
                      }
    let headers = {}
    let detailedError = ''

    //add token if exists 
    let token = await AsyncStorage.getItem('token');
    if(token) {
        const headerToken = {'TokenAuth': token}
        Object.assign(headers, headerToken);
    }

    //add headers if exists in request
    if(typeof options.headers != 'undefined') {
      Object.assign(headers, options.headers)
    }
    //add new headers to options
    Object.assign(options, {headers: headers})
    
    //override defaults object
    options = Object.assign({}, defaults, options);
    console.log('Options for axios request: ', options)
    if (Utils.hasInternetConnectivity()) {
      return axios(options)
      .then(response => {
        // console.log('Axios response request: ', response.request)
        return response.data 
          } )
          .catch( error => {
            console.log('Axios error: ', error)
            if(error.response) {
              if (error.response.status == 401) {
                console.log('Enter error response 401: ', error)
                detailedError = 'Please LOGOUT'
                Utils.deleteToken();
              }
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            if (options.showError) {
              Alert.alert(
                'UUUPS !',
                'Eroare aplicatie !\n ' + detailedError,
                [
                  {text: 'Ok', onPress: () => console.log('Eroare aplicatie la: ', options.baseURL + options.url)},
                ],
                {cancelable: false},
              );
            }
            let errResponse =  'Ceva nu a mers bine cand am luat datele din BD, stai chill'
            throw errResponse;
          });
    }
  // } catch (error) {
  //   console.log('Runtime Error Request method: ', error)
  // } 
};
      
//auth
export function login(username, password) {
  return request({method: 'post', 
                  url: '/api/auth/signin',
                  data: {
                    usernameOrEmail: username,
                    password: password
                  },
                  showError: true,
                  })
}

export function logout() {
  return request({method: 'post', 
                  url: '/logout',
                  })
}

export function register(name, username, email, password, imageProperties, secretWord, sendActivationEmail) {
  let formDataPayload = new FormData();
  //elementul cu poza din obiect are nevoie de 3 (TREI) parametri: uri, numele si TYPE !!!!!!
  formDataPayload.append('photo', {
    uri: imageProperties.uri,
    name: imageProperties.name,
    type: 'image/png',
  });
  formDataPayload.append('name', name);
  formDataPayload.append('username', username);
  formDataPayload.append('email', email);
  formDataPayload.append('password', password);
  formDataPayload.append('secretWord', secretWord);
  formDataPayload.append('sendActivationEmail', sendActivationEmail);
  return request({method: 'post', 
                  url: '/api/auth/signup/',
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  },
                  data: formDataPayload
                  })
}

export function getUserDetails() {
  return request({method: 'get', 
                  url: '/api/user/get_user_details',
                  showError: true
                  })
}

export function getUsersListForShare(shoppingListId) {
  return request({method: 'get', 
                  url: `/api/user/get_users_for_list/${shoppingListId}`,
                  showError: false
                  })
}

export function changePassword(payload) {
  return request({method: 'post', 
                  url: '/api/user/change_password',
                  data: payload,
                  })
}

export function resetPassword(email) {
  return request({method: 'post', 
                url: '/api/rp/forgot_password',
                data: {
                  email: email
                }
                })
}

export async function changeSettingNotification(payload) {
  return request({method: 'post', 
                  url: '/api/user/change_notification_settings',
                  data: payload
                })
}

export function changeAvatar(imageProperties) {
  let formDataPayload = new FormData();
  //elementul cu poza din obiect are nevoie de 3 (TREI) parametri: uri, numele si TYPE !!!!!!
  formDataPayload.append('photo', {
    uri: imageProperties.uri,
    name: imageProperties.name,
    type: 'image/png',
  });
  return request({method: 'post', 
                  url: '/api/user/change_user_avatar',
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                  data: formDataPayload,
                })
}

export async function getAllTodos() {
  let shoppingListId = await Utils.getFavoriteShoppingList();
  if(shoppingListId == '') {
    Alert.alert(
      'UUUPS !',
      'Nu ai selectat o list',
      [
        {text: 'Ok', onPress: () => console.log('Eroare aplicatie la')},
      ],
      {cancelable: false},
    );
  }
  return request({method: 'get', 
                url: `/api/items/${shoppingListId}`,
                showError: true,
                })
}

export function deleteItem (ids) {
  //TODO: remove this variable assign, is not useful
  let items = ids
  return request({method: 'post', 
                  url: '/api/delete_item',
                  data: {
                    ids: items
                  }
                })
}

export function deleteAllItem (payload) {
  return request({method: 'post', 
                  url: '/api/delete_all_items',
                  data: {
                        statusId: payload.status_id,
                        shoppingListId: payload.shopping_list_id
                  }
                })
}

export async function addItem (item) {
  let shoppingListId = await Utils.getFavoriteShoppingList();
  return request({method: 'post', 
                  url: `/api/add_item`,
                  data: {
                    itemName: item,
                    shoppingListId: shoppingListId,
                  },
                  showError: true,
                })
}

export function updateItemStatus (item_id, status_id) {
  return request({method: 'post', 
                  url: `/api/update_item_status`,
                  data: {
                    itemId: item_id,
                    statusId: status_id
                  }
                })
}

export function editItemName (itemId, itemName) {
    return request({method: 'post', 
                  url: `api/edit_item_name/`,
                  data: {
                    itemId: itemId,
                    itemName: itemName,
                  }
                })
}

export function getAllShoppingLists () {
  return request({method: 'get', 
                url: `api/shopping_lists/`,
                showError: true,
              })
}

export function addShoppingList (name, description, imageProperties) {
  console.log('enter api addShoppingList')
  console.log(imageProperties)
  //elementul cu poza din obiect are nevoie de 3 (TREI) parametri: uri, numele si TYPE !!!!!!
  let formDataPayload = new FormData();
  formDataPayload.append('photo', {
    uri: imageProperties.uri,
    name: imageProperties.name,
    type: 'image/png',
  });
  console.log('formDataPayload: ', formDataPayload)
  formDataPayload.append('name', name);
  formDataPayload.append('description', description);
  return request({method: 'post', 
                url: `api/add_shopping_list/`,
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                data: formDataPayload,
                showError: true,
              })
}

export function deleteShoppingList(id) {
  console.log('api enter delete shoppingList')
  return request({method: 'post', 
                  url: `/api/delete_shopping_list/${id}`,
                })
}

export function addUserToShareList(shoppingListId, userId) {
  return request({method: 'post', 
                  url: `api/add_share_shopping_list/`,
                  data: {
                    shoppingListId: shoppingListId,
                    userId: userId,
                  },
                  showError: false,
                })
}

export function deleteUserFromShareList(shoppingListId, userId) {
  return request({method: 'post', 
                  url: `api/remove_share_shopping_list/`,
                  data: {
                    shoppingListId: shoppingListId,
                    userId: userId,
                  },
                  showError: false,
                })
}