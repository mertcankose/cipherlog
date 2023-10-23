import Toast from 'react-native-toast-message';
import {tabHeight} from '@constants/sizes';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getExactStatusBarHeight} from '@helpers/status-bar-height';

export const toastMessage = (
  type: 'success' | 'error' | 'info',
  text1: string,
  text2: string,
  visibilityTime: number = 1500,
) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    visibilityTime: visibilityTime,
    autoHide: true,
    position: 'top',
    topOffset: getExactStatusBarHeight() + 8,
    //bottomOffset: tabHeight + 8,
  });
};
