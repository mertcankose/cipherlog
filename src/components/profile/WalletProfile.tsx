import {FC, useContext} from 'react';
import {ConnectWalletButton, DisconnectWalletButton} from '@components';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {useNetworkMismatch} from '@thirdweb-dev/react-native';
import {WalletContext} from '@contexts/Wallet';
import {useTheme} from '@react-navigation/native';

interface IWalletProfile {
  style?: any;
  style2?: any;
}

const WalletProfile: FC<IWalletProfile> = ({style, style2}) => {
  const {userAddress} = useContext(WalletContext);
  const isMismatched = useNetworkMismatch();

  const {colors} = useTheme();

  return (
    <View style={[styles.fallback, style]}>
      <ConnectWalletButton style={[styles.connectWalletContainer, style2, {marginRight: userAddress ? 10 : 0}]} />

      {/* if !isMistached connect wallet button do this job. */}
      {userAddress && isMismatched && <DisconnectWalletButton />}
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  connectWalletContainer: {},
});

export default WalletProfile;
