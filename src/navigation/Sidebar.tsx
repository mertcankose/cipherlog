import {FC, useContext} from 'react';
import {NoteButton, NoteText, WalletProfile} from '@components';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {NotesStack, AccountStack, AboutStack} from '@stacks';
import {View, StyleSheet} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import IntroStack from '@stacks/IntroStack';
import {GeneralContext} from '@contexts/General';
import {getExactStatusBarHeight} from '@helpers/status-bar-height';

const Drawer = createDrawerNavigator();

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  props?: any;
}

const CustomDrawer: FC<CustomDrawerContentProps> = props => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.drawerContainer,
        {
          backgroundColor: colors.background,
          paddingTop: getExactStatusBarHeight(),
        },
      ]}>
      <WalletProfile
        style={{
          paddingVertical: 20,
          paddingHorizontal: 16,
        }}
        style2={{
          flex: 1,
        }}
      />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 8,
          flexDirection: 'column',
          gap: 6,
          flex: 1,
        }}>
        <DrawerItemList {...props} />

        {/* <NoteButton>
          <NoteText>İ</NoteText>
        </NoteButton> */}
      </DrawerContentScrollView>
    </View>
  );
};

const Sidebar: FC = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {isOnboarding} = useContext(GeneralContext);

  return (
    <Drawer.Navigator
      initialRouteName={isOnboarding ? 'IntroStack' : 'NotesStack'}
      screenOptions={{
        drawerStyle: {
          width: 270,
        },
        headerShown: false,
        drawerActiveBackgroundColor: '#F1EFEF',
        drawerActiveTintColor: '#279EFF',
        drawerInactiveTintColor: colors.pale,
        drawerLabelStyle: {
          fontFamily: 'Source Code Pro',
          fontSize: 18,
          marginLeft: -20,
        },
        drawerItemStyle: {
          paddingLeft: 6,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="IntroStack"
        component={IntroStack}
        options={{
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="NotesStack"
        component={NotesStack}
        options={{
          title: 'Notes',
          drawerLabel: ({color}) => (
            <NoteText
              style={{
                fontSize: 20,
                marginLeft: -20,
                color: color,
              }}>
              {t('notes')}
            </NoteText>
          ),
          drawerIcon: ({color}) => <SimpleLineIcons name="note" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          title: 'Account',
          drawerLabel: ({color}) => (
            <NoteText
              style={{
                fontSize: 20,
                marginLeft: -20,
                color: color,
              }}>
              {t('account')}
            </NoteText>
          ),
          drawerIcon: ({color}) => <SimpleLineIcons name="ghost" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="AboutStack"
        component={AboutStack}
        options={{
          title: 'About',
          drawerItemStyle: {
            // display: 'none',
            marginTop: 'auto',
            marginBottom: 20,
          },
          drawerLabel: ({color}) => (
            <NoteText
              style={{
                fontSize: 20,
                marginLeft: -20,
                color: color,
              }}>
              {t('about')}
            </NoteText>
          ),
          drawerIcon: ({color}) => <Feather name="info" size={20} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
});

export default Sidebar;
