import {FC, useContext} from 'react';
import {StatusBar, View, StatusBarProps} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getExactStatusBarHeight} from '@helpers/status-bar-height';
import {ThemeContext} from '@contexts/Theme';
interface IStatusBar extends StatusBarProps {
  // backgroundColor: string;
  // barStyle: any;
}

const NoteStatusBar: FC<IStatusBar> = ({...props}) => {
  const {themeValue} = useContext(ThemeContext);

  // colors are wroted manually because of the provider cascade
  return (
    <View style={[{backgroundColor: themeValue === 'dark' ? '#272829' : '#F5F7F8'}, {height: getExactStatusBarHeight()}]}>
      <StatusBar
        translucent
        backgroundColor={themeValue === 'dark' ? '#272829' : '#F5F7F8'}
        barStyle={themeValue === 'dark' ? 'light-content' : 'dark-content'}
        {...props}
      />
    </View>
  );
};

export default NoteStatusBar;

{
  /* <View style={[{backgroundColor: colors.background}]}> */
}
