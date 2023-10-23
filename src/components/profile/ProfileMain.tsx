import {FC, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {ConnectWalletButton} from '@components';
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';
import {ConnectWallet} from '@thirdweb-dev/react-native';
import {ThemeContext} from '@contexts/Theme';

interface IProfileInterface {
  style?: any;
  navigation: any;
}

const ProfileMain: FC<IProfileInterface> = ({style, navigation}) => {
  const {themeValue} = useContext(ThemeContext);

  const navigateToProfile = () => {
    navigation.navigate('AccountStack');
  };

  return (
    <View style={[styles.container, style]}>
      <ConnectWallet theme={themeValue === 'light' ? 'light' : 'dark'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: 80, // Equivalent to 20 in your previous style
    height: 80, // Equivalent to 20 in your previous style
    marginBottom: 3, // Equivalent to 3 in your previous style
  },
  info: {
    marginTop: 3, // Equivalent to 3 in your previous style
  },
  infoText: {
    textAlign: 'center',
  },
});

export default ProfileMain;

/*

    // <TouchableOpacity
    //   activeOpacity={0.8}
    //   style={[styles.container, style]}
    //   onPress={navigateToProfile}>
    //   <ProfileAvatar style={styles.avatar} avatarSize={32} />
    //   <ProfileInfo style={styles.info} textStyle={styles.infoText} />
    // </TouchableOpacity>

*/
