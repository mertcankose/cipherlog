import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'react-native-gesture-handler';
import '@utils/i18n'; // multi-language
import '@walletconnect/react-native-compat'; // for wallet errors
import {ConnectWallet, localWallet, metamaskWallet, rainbowWallet, ThirdwebProvider, coinbaseWallet, trustWallet} from '@thirdweb-dev/react-native';
import {Ethereum, Goerli, Sepolia, Binance, BinanceTestnet} from '@thirdweb-dev/chains';

import {WalletProvider, TodoProvider, ThemeProvider, LangProvider} from '@contexts';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {NoteStatusBar} from '@components';
import Navigation from '@navigation';
import {MenuProvider} from 'react-native-popup-menu';
import {THIRD_WEB_PROJECT_ID} from '@env';

const App = () => {
  console.log('env: ', THIRD_WEB_PROJECT_ID);
  return (
    <ThirdwebProvider
      activeChain="goerli"
      clientId={THIRD_WEB_PROJECT_ID}
      supportedChains={[Ethereum, Goerli, Sepolia, Binance, BinanceTestnet]}
      supportedWallets={[metamaskWallet(), rainbowWallet(), coinbaseWallet(), trustWallet(), localWallet()]}>
      <WalletProvider>
        <ThemeProvider>
          <LangProvider>
            <TodoProvider>
              <MenuProvider>
                <SafeAreaProvider>
                  <NoteStatusBar />
                  <Navigation />

                  <Toast />
                </SafeAreaProvider>
              </MenuProvider>
            </TodoProvider>
          </LangProvider>
        </ThemeProvider>
      </WalletProvider>
    </ThirdwebProvider>
  );
};

export default App;
