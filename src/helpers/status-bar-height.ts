import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasDynamicIsland} from 'react-native-device-info';

const STATUSBAR_HEIGHT = getStatusBarHeight();

export const getExactStatusBarHeight = () => {
  if (hasDynamicIsland()) {
    return STATUSBAR_HEIGHT + 36;
  } else {
    return STATUSBAR_HEIGHT;
  }
};
