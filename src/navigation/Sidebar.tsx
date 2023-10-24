import { Fallback, ProfileSidebar, NoteText } from "@components";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import { DrawerActions, useNavigation } from "@react-navigation/native";
import { AboutStack, NotesStack, AccountStack, SettingsStack } from "@stacks";
import { FC, useContext, useEffect } from "react";
import { Platform, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { navigationPush } from "./RootNavigation";
import { WalletContext } from "@contexts/Wallet";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  props?: any;
}

const CustomDrawer: FC<CustomDrawerContentProps> = (props) => {
  //   const insets = useSafeAreaInsets();
  // const {colorScheme} = useColorScheme();

  const { colors } = useTheme();

  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.drawerContainer,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Fallback
        style={{
          paddingHorizontal: 20,
          paddingVertical: 30,
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
        }}
      >
        <ProfileSidebar navigation={props.navigation} />
      </Fallback>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 8,
          flexDirection: "column",
          gap: 6,
          flex: 1,
        }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const Sidebar: FC = () => {
  // const {colorScheme} = useColorScheme();
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="NotesStack"
      screenOptions={{
        drawerStyle: {
          width: 270,
        },
        headerShown: false,
        drawerActiveBackgroundColor: "#F1EFEF",
        drawerActiveTintColor: "#279EFF",
        drawerInactiveTintColor: colors.pale,
        drawerLabelStyle: {
          fontFamily: "Source Code Pro",
          fontSize: 18,
          marginLeft: -20,
        },
        drawerItemStyle: {
          paddingLeft: 6,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="NotesStack"
        component={NotesStack}
        options={{
          title: "Notes",
          drawerLabel: ({ color }) => (
            <NoteText
              style={{
                fontSize: 20,
                marginLeft: -20,
                color: color,
              }}
            >
              {t("notes")}
            </NoteText>
          ),
          drawerIcon: ({ color }) => <SimpleLineIcons name="note" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          title: "Account",
          drawerLabel: ({ color }) => (
            <NoteText
              style={{
                fontSize: 20,
                marginLeft: -20,
                color: color,
              }}
            >
              {t("account")}
            </NoteText>
          ),
          drawerIcon: ({ color }) => <SimpleLineIcons name="ghost" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: "Settings",
          drawerLabel: "Settings",
          drawerItemStyle: {
            display: "none",
          },
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

/*        
headerLeft: () => (
    <TouchableOpacity
        style={{}}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Text>m</Text>
            <Menu width={22} height={22} color="black" />
    </TouchableOpacity>
    ),
*/
