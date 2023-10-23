import React, {FC} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {ConnectWalletButton} from '@components';
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';

interface IProfileInterface {
  style?: any;
  navigation: any;
}

const ProfileSidebar: FC<IProfileInterface> = ({style, navigation}) => {
  const navigateToProfile = () => {
    navigation.navigate('AccountStack');
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.row}
        onPress={navigateToProfile}>
        <ProfileAvatar />
        <ProfileInfo style={styles.info} textStyle={styles.infoText} />
      </TouchableOpacity>
      <ConnectWalletButton style={styles.walletButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: 3,
  },
  infoText: {
    textAlign: 'left',
  },
  walletButton: {
    paddingVertical: 2,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
});

export default ProfileSidebar;
