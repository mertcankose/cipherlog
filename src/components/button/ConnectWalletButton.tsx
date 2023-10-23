import React, {FC, useContext} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import TodoText from '@components/text/TodoText';
import {WalletContext} from '@contexts/Wallet';
import {useTranslation} from 'react-i18next';

interface IConnectWalletButtonProps extends TouchableOpacityProps {
  style?: any;
}

const ConnectWalletButton: FC<IConnectWalletButtonProps> = ({
  style,
  ...props
}) => {
  const {t} = useTranslation();

  const handlePress = () => {
    // if (isConnected) {
    //   disconnectWallet();
    //   return;
    // }
    // connectWallet();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.button,
        // isConnected ? styles.disconnectedButton : styles.connectedButton,
        style,
      ]}
      {...props}>
      <TodoText style={styles.text} weight="600">
        {/* {isConnected ? t('disconnectwallet') : t('connectwallet')} */}
      </TodoText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectedButton: {
    backgroundColor: 'primary', // Replace 'primary' with your actual primary color
  },
  disconnectedButton: {
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default ConnectWalletButton;
