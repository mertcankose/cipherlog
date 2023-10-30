import React, {FC, ReactNode} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import NoteText from '@components/text/NoteText';
import Octicons from 'react-native-vector-icons/Octicons';
import {useTheme} from '@react-navigation/native';

interface IHeader {
  text: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  navigation: any;
  style?: any;
  isBack: boolean;
  isThree?: boolean;
}

const Header: FC<IHeader> = ({navigation, text, leftSection = <View></View>, rightSection, style, isBack, isThree, ...props}) => {
  const {colors} = useTheme();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: colors.pale,
        },
        style,
      ]}
      {...props}>
      <View style={styles.headerLeft}>
        {isBack ? (
          <TouchableOpacity
            onPress={goBack}
            hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}
            activeOpacity={0.8}
            style={styles.backButton}>
            <Octicons
              name="chevron-left"
              size={20}
              color="#000" // Change to your desired color
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.leftSection}>{leftSection}</View>
        )}

        <NoteText
          style={[
            styles.headerText,
            {
              color: colors.primary,
            },
          ]}
          weight="700">
          {text}
        </NoteText>
      </View>
      {isThree && <View style={styles.rightSection}>{rightSection}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 0.4,

    paddingTop: 12,
    paddingBottom: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  leftSection: {},
  headerText: {
    fontSize: 22,
    lineHeight: 35,
    marginLeft: 8,
    color: '#000', // Change to your desired color
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default Header;
