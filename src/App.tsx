import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'react-native-gesture-handler';
import '@utils/i18n'; // multi-language
import '@walletconnect/react-native-compat'; // for wallet errors
import {useContext, useEffect} from 'react';
import {metamaskWallet, ThirdwebProvider, walletConnect} from '@thirdweb-dev/react-native';
import {Ethereum, Goerli} from '@thirdweb-dev/chains';
import {WalletProvider, GeneralProvider, ThemeProvider, LangProvider} from '@contexts';
import {MenuProvider} from 'react-native-popup-menu';
import {THIRD_WEB_PROJECT_ID, WALLET_CONNECT_PROJECT_ID} from '@env';
import SplashScreen from 'react-native-splash-screen';
import {ThemeContext} from '@contexts/Theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from '@navigation';

/*
rainbow -> only ethereum network
coinbase -> error
trust wallet -> waiting not error
*/
const App = () => {
  const activeChain = Goerli;

  const {themeValue} = useContext(ThemeContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThirdwebProvider
        activeChain={activeChain}
        clientId={THIRD_WEB_PROJECT_ID}
        dAppMeta={{
          name: 'Cipherlog',
          description: 'Cipherlog is a decentralized application that allows you to store your secrets in a decentralized way.',
          logoUrl: 'https://mertcankose.com/cipherlog/cipherlog-icon.png',
          url: 'https://mertcankose.com/',
          isDarkMode: themeValue === 'light' ? false : true,
        }}
        authConfig={{
          domain: 'https://mertcankose.com',
        }}
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
                  <Navigation />
                </MenuProvider>
              </LangProvider>
            </ThemeProvider>
          </WalletProvider>
        </GeneralProvider>
      </ThirdwebProvider>
    </GestureHandlerRootView>
  );
};

export default App;
