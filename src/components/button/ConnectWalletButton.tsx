import {FC, useContext} from 'react';
import {TouchableOpacity, TouchableOpacityProps, StyleSheet, View} from 'react-native';
import NoteText from '@components/text/NoteText';
import {WalletContext} from '@contexts/Wallet';
import {useTranslation} from 'react-i18next';
import {ConnectWallet} from '@thirdweb-dev/react-native';

interface IConnectWalletButtonProps {
  style?: any;
}

const ConnectWalletButton: FC<IConnectWalletButtonProps> = ({style, ...props}) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.connectWalletContainer, style]} {...props}>
      <ConnectWallet switchToActiveChain={false} buttonTitle="Connect Wallet" />
    </View>
  );
};

const styles = StyleSheet.create({
  connectWalletContainer: {},
});

export default ConnectWalletButton;
