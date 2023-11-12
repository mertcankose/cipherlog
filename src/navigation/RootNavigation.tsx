import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigatePush(screenName: any, params: any) {
  if (navigationRef.isReady()) {
    console.log('ready');
    // @ts-ignore
    navigationRef.navigate(screenName, params);
  } else {
    console.log('not ready');
  }
}
