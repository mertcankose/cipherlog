import {FC, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ConnectWallet} from '@thirdweb-dev/react-native';
import {ThemeContext} from '@contexts/Theme';

interface IConnectWalletButtonProps {
  style?: any;
}

const ConnectWalletButton: FC<IConnectWalletButtonProps> = ({style, ...props}) => {
  const {t} = useTranslation();

  const {themeValue} = useContext(ThemeContext);

  return (
    <View style={[styles.connectWalletContainer, style]} {...props}>
      <ConnectWallet
        switchToActiveChain={true}
        buttonTitle={t('connectwallet')}
        theme={themeValue === 'light' ? 'light' : 'dark'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  connectWalletContainer: {},
});

export default ConnectWalletButton;
