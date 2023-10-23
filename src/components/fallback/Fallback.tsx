import {ConnectWalletButton} from '@components';
import {FC, ReactNode, useContext} from 'react';
import {View} from 'react-native';
import {ConnectWallet} from '@thirdweb-dev/react-native';

interface IFallback {
  style?: any;
  children?: ReactNode;
}

const Fallback: FC<IFallback> = ({style, children}) => {
  const isConnected = true;

  return (
    <View style={[style]}>
      {/* {isConnected ? children : <ConnectWalletButton />} */}
      <ConnectWallet />
    </View>
  );
};

export default Fallback;
