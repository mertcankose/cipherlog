import React, {useContext} from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {ThemeContext} from '@contexts/Theme';

const Settings = () => {
  const {activeTheme, changeTheme} = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text>Active Theme: {activeTheme}</Text>
      <Text>Mertcan</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          // change theme
          changeTheme('system');
        }}>
        <Text>System</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          // change theme
          changeTheme('light');
        }}>
        <Text>Light</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          // change theme
          changeTheme('dark');
        }}>
        <Text>Dark</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 8, // for the gap-8 equivalent
    // dark mode background color
    // backgroundColor: 'gray',
  },
  button: {
    borderWidth: 1,
    paddingVertical: 3,
  },
});

export default Settings;
