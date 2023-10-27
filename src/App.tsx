import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'react-native-gesture-handler';
import '@utils/i18n'; // multi-language
import '@walletconnect/react-native-compat'; // for wallet errors
import {useCallback, useContext, useEffect} from 'react';
import {metamaskWallet, ThirdwebProvider, walletConnect} from '@thirdweb-dev/react-native';
import {Ethereum, Goerli} from '@thirdweb-dev/chains';
import {WalletProvider, GeneralProvider, ThemeProvider, LangProvider} from '@contexts';
import {MenuProvider} from 'react-native-popup-menu';
import {THIRD_WEB_PROJECT_ID, WALLET_CONNECT_PROJECT_ID} from '@env';
import AppInside from '@navigation/AppInside';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';

/*
rainbow -> only ethereum network
coinbase -> error
trust wallet -> waiting not error
*/
const App = () => {
  const activeChain = Goerli;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={THIRD_WEB_PROJECT_ID}
      supportedChains={[Goerli]}
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
