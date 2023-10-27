import {useCallback, useContext} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {NoteStatusBar, Onboarding} from '@components';
import Navigation from '@navigation';
import {GeneralContext} from '@contexts/General';

const AppInside = () => {
  const {isOnboarding} = useContext(GeneralContext);
  console.log('app is: ', isOnboarding);

  return (
    <>
      {isOnboarding ? (
        <Onboarding />
      ) : (
        <SafeAreaProvider>
          <NoteStatusBar />
          <Navigation />
          <Toast />
        </SafeAreaProvider>
      )}
    </>
  );
};

export default AppInside;
