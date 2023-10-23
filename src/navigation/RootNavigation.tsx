import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigationPush(screenName: never) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screenName as never);
  }
}
