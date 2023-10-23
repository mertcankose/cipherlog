import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {providers, utils} from 'ethers';
import {allApplicableNetworks} from '@constants/networks';
import {toastMessage} from '@utils/toast';
import {useTranslation} from 'react-i18next';

interface IWalletContext {
  address: string | undefined;
  isConnected: boolean;
  connectWallet: () => void;
  closeModal: () => void;
  disconnectWallet: () => void;
  switchChain: (network: IApplicableNetwork) => void;
  initAccount: () => void;
  provider: any;
  activeNetwork: IApplicableNetwork;
  isOpen: boolean;
  balance: number;
}

interface IContextProvider {
  children: ReactNode;
}

export const WalletContext = createContext({} as IWalletContext);

const WalletProvider: FC<IContextProvider> = ({children}) => {
  const {t} = useTranslation();

  const {open, close, isOpen, isConnected, address, provider} =
    useWalletConnectModal();

  const [activeNetwork, setActiveNetwork] = useState<IApplicableNetwork>({
    networkName: undefined,
    rpcUrl: undefined,
    chainId: undefined,
    chainIdHex: undefined,
    currencyName: undefined,
    symbol: undefined,
    decimals: undefined,
    blockExplorer: undefined,
  });

  const [networkProvider, setNetworkProvider] = useState<any>(undefined);

  const [activeChainId, setActiveChainId] = useState<IChainId>({
    chainId: undefined,
    chainIdHex: undefined,
  });

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (isConnected && address !== undefined && provider !== undefined) {
      initAccount();
    }
  }, [isConnected, address, provider]);

  useEffect(() => {
    console.log('active chain id: ', activeChainId);
    console.log('active network: ', activeNetwork);
    console.log('active network provider: ', networkProvider);
  }, [activeChainId]);

  const initAccount = async () => {
    let {chainId, chainIdHex} = await findChainId();
    let formattedBalance = await findUserBalance();

    initializeNetwork(chainIdHex);

    // setting state
    setActiveChainId({
      chainId: chainId,
      chainIdHex: chainIdHex,
    });
    setBalance(parseFloat(formattedBalance));
  };

  const connectWallet = useCallback(() => {
    open();
  }, []);

  // const connectWallet = () => {
  //   open(); // open modal
  // };

  const disconnectWallet = () => {
    provider?.disconnect();
  };

  const closeModal = () => {
    close();
  };

  const findChainId = async () => {
    let chainIdDecimal: number | undefined = undefined;
    let chainIdHex: string | undefined = undefined;

    chainIdDecimal = await provider?.request({
      method: 'eth_chainId',
    });

    if (chainIdDecimal !== undefined) {
      chainIdHex = utils.hexlify(chainIdDecimal);
    } else {
      console.log('chain id is undefined');
    }

    return {chainId: chainIdDecimal?.toString(), chainIdHex: chainIdHex};
  };

  const findUserBalance = async () => {
    if (networkProvider !== undefined) {
      let userBalance = await networkProvider.getBalance(address);
      let formattedBalance = utils.formatEther(userBalance);

      console.log('formattedBalance: ', formattedBalance);

      return formattedBalance;
    } else {
      console.log('network provider is undefined');
      return '0';
    }
  };

  const initializeNetwork = async (chainIdHex: string | undefined) => {
    allApplicableNetworks.map(network => {
      if (network.chainIdHex === chainIdHex) {
        setActiveNetwork(network);
        setNetworkProvider(new providers.JsonRpcProvider(network.rpcUrl));
      } else {
        //toastMessage('error', 'Error', t('notSupportNetwork'));
      }
    });
  };

  const switchChain = async (network: IApplicableNetwork) => {
    try {
      console.log('switch network: ', network);
      console.log('asdasdasd network: ', `0x${network.chainId.toString(16)}`);

      provider?.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: network.chainIdHex,
          },
        ],
      });
    } catch (error) {
      console.log('switch error: ', error);
      console.log('add network: ', network);
      await provider?.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: network.chainId,
            chainName: network.networkName,
            nativeCurrency: {
              name: network.currencyName,
              symbol: network.symbol,
              decimals: network.decimals,
            },
            rpcUrls: [network.rpcUrl],
            blockExplorerUrls: [network.blockExplorer],
          },
        ],
      });
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        balance,
        connectWallet,
        closeModal,
        disconnectWallet,
        switchChain,
        provider,
        isOpen,
        activeNetwork,
        initAccount,
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
