export const providerMetaData = {
  name: 'Secret Notes',
  description: 'Keep Notes Safe!',
  url: 'https://mertcankose.com',
  icons: ['https://walletconnect.org/walletconnect-logo.png'],
  redirect: {
    native: 'walletconnect://',
  },
};

export const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'personal_sign',
        'wallet_addEthereumChain',
        'wallet_switchEthereumChain',
        'eth_chainId',
      ],
      chains: [
        'eip155:11155111', //sepolia
        'eip155:97', //bsc testnet,
        'eip155:1', //eth mainnet,
        'eip155:56', //bsc mainnet,
      ],
      events: ['chainChanged', 'accountsChanged', 'connect', 'disconnect'],
      rpcMap: {},
    },
  },
  optionalNamespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'personal_sign',
        'wallet_addEthereumChain',
        'wallet_switchEthereumChain',
        'eth_chainId',
      ],
      chains: [
        'eip155:97', //bsc testnet,
        'eip155:1', //eth mainnet,
        'eip155:56', //bsc mainnet,
        'eip155:11155111', //sepolia,
      ],
      events: ['chainChanged', 'accountsChanged', 'connect', 'disconnect'],
      rpcMap: {},
    },
  },
};
