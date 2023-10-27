import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'react-native-gesture-handler';
import '@utils/i18n'; // multi-language
import '@walletconnect/react-native-compat'; // for wallet errors
import {useCallback, useContext} from 'react';
import {metamaskWallet, ThirdwebProvider, walletConnect} from '@thirdweb-dev/react-native';
import {Ethereum} from '@thirdweb-dev/chains';
import {WalletProvider, GeneralProvider, ThemeProvider, LangProvider} from '@contexts';
import {MenuProvider} from 'react-native-popup-menu';
import {THIRD_WEB_PROJECT_ID, WALLET_CONNECT_PROJECT_ID} from '@env';
import AppInside from '@navigation/AppInside';

/*
rainbow -> only ethereum network
coinbase -> error
trust wallet -> waiting not error
*/
const App = () => {
  const activeChain = Ethereum;

  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={THIRD_WEB_PROJECT_ID}
      supportedChains={[Ethereum]}
      supportedWallets={[
        metamaskWallet({
          projectId: WALLET_CONNECT_PROJECT_ID,
          recommended: true,
        }),
        walletConnect(),
      ]}>
      <GeneralProvider>
        <WalletProvider>
          <ThemeProvider>
            <LangProvider>
              <MenuProvider>
                <AppInside />
              </MenuProvider>
            </LangProvider>
          </ThemeProvider>
        </WalletProvider>
      </GeneralProvider>
    </ThirdwebProvider>
  );
};

export default App;
