import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import Sidebar from './Sidebar';
import {NoteDefaultTheme, NoteDarkTheme} from '@constants/theme';
import {ThemeContext} from '@contexts/Theme';
import {useContext} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const Navigation = () => {
  const {themeValue} = useContext(ThemeContext);

  return (
    <NavigationContainer ref={navigationRef} theme={themeValue === 'light' ? NoteDefaultTheme : NoteDarkTheme}>
      <SafeAreaProvider>
        <Sidebar />
        <Toast />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Navigation;
