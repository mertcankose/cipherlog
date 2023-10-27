import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import Sidebar from './Sidebar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NoteDefaultTheme, NoteDarkTheme} from '@constants/theme';
import {ThemeContext} from '@contexts/Theme';
import {useContext} from 'react';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {themeValue} = useContext(ThemeContext);

  return (
    <NavigationContainer ref={navigationRef} theme={themeValue === 'light' ? NoteDefaultTheme : NoteDarkTheme}>
      <Sidebar />
    </NavigationContainer>
  );
};

export default Navigation;

/*
      <Stack.Navigator initialRouteName="Sidebar">
        <Stack.Screen
          name="Sidebar"
          component={Sidebar}
          options={{headerShown: false}}
        />
       <Stack.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="AboutStack"
          component={AboutStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
*/
