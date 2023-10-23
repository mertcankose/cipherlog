import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

interface IProfileAvatar {
  style?: any;
  avatarSize?: number;
}

const ProfileAvatar: FC<IProfileAvatar> = ({
  style,
  avatarSize = 20,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <SimpleLineIcons name="ghost" size={avatarSize} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56, // Equivalent to 14 in your previous style
    height: 56, // Equivalent to 14 in your previous style
    borderRadius: 28, // Equivalent to half of 56
    backgroundColor: '#primary', // Replace 'primary' with your actual primary color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4, // Equivalent to 14 in your previous style
  },
});

export default ProfileAvatar;
