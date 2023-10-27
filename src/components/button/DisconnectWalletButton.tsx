import {FC, useContext} from 'react';
import {TouchableOpacity, TouchableOpacityProps, StyleSheet, View} from 'react-native';
import NoteText from '@components/text/NoteText';
import {WalletContext} from '@contexts/Wallet';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDisconnect} from '@thirdweb-dev/react-native';
import {useTheme} from '@react-navigation/native';

interface IDisconnectWalletButtonProps extends TouchableOpacityProps {
  style?: any;
}

const DisconnectWalletButton: FC<IDisconnectWalletButtonProps> = ({style, ...props}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const disconnect = useDisconnect();

  return (
    <TouchableOpacity style={[styles.disconnectWalletContainer, style]} onPress={disconnect} {...props}>
      <Ionicons name="exit-outline" size={30} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disconnectWalletContainer: {},
});

export default DisconnectWalletButton;
