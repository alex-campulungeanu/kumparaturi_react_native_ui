import { StyleSheet } from 'react-native'
import Colors from './Colors';

export const sizes = {
  ICON_SIZE_HEADER: 30,
  HEADER_HEIGHT: 50,
  BUTTON_RADIUS: 5,
  BUTTON_WIDTH: '70%',
  INPUT_ICON_SIZE: 20
}

export const misc = {
  taostButton: 'X',
  toastDurationLong: 5000,
  toastDurationShort: 2000,
}

export const appStyles = StyleSheet.create({
  toastStyle: {
    borderRadius: 5,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    opacity: 1,
    backgroundColor: Colors.primaryColor,
  },
  toastStyleError: {
    borderRadius: 5,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    opacity: 1,
    backgroundColor: Colors.redColor,
  },
  buttonStyle: {
    borderRadius: sizes.BUTTON_RADIUS,
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes.BUTTON_WIDTH,
    height: 40,
    shadowOffset: {width: 0, height: 1,},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  toastTextStyle: {
    color: Colors.whiteColor,
  },
  toastButtonStyle: {
    alignSelf:'center',
  },
  leftIcon: {
    color: Colors.lightGreenColor,
  },
  rightIcon: {
    color: Colors.lightGreenColor,
  }
})
