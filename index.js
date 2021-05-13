import 'react-native-gesture-handler'
// if(__DEV__) {
//   import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
// }
/** @format */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
