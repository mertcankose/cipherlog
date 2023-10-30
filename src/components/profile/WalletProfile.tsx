import {FC, useContext} from 'react';
import {ConnectWalletButton, DisconnectWalletButton, NoteText} from '@components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {useNetworkMismatch, useSwitchChain} from '@thirdweb-dev/react-native';
import {WalletContext} from '@contexts/Wallet';
import {useTheme} from '@react-navigation/native';
import {Goerli} from '@thirdweb-dev/chains';

interface IWalletProfile {
  style?: any;
  style2?: any;
}

const WalletProfile: FC<IWalletProfile> = ({style, style2}) => {
  const {userAddress} = useContext(WalletContext);
  const isMismatched = useNetworkMismatch();
  const switchChain = useSwitchChain();

  const {colors} = useTheme();

  return (
    <View style={[styles.fallback, style]}>
      <ConnectWalletButton style={[styles.connectWalletContainer, style2, {marginRight: userAddress ? 10 : 0}]} />

      {/* if !isMistached connect wallet button do this job. */}
      {userAddress && isMismatched && <DisconnectWalletButton />}
      {/* <TouchableOpacity
        onPress={() => {
          console.log('cid: ', Goerli.chainId);
          switchChain(Goerli.chainId);
        }}>
        <NoteText>s</NoteText>
      </TouchableOpacity> */}
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
