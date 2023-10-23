import {
  BscMainRpcUrl,
  BscTestRpcUrl,
  EthereumRpcUrl,
  SepoliaRpcUrl,
} from './rpc';

export const allApplicableNetworks: IApplicableNetwork[] = [
  // testnet networks
  {
    networkName: 'Sepolia Test Network',
    rpcUrl: SepoliaRpcUrl,
    chainId: 11155111,
    chainIdHex: '0xaa36a7',
    currencyName: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    blockExplorer: 'https://sepolia.etherscan.io',
  },
  {
    networkName: 'Binance Smart Chain Testnet',
    rpcUrl: BscTestRpcUrl,
    chainId: 97,
    chainIdHex: '0x61',
    currencyName: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
    blockExplorer: 'https://testnet.bscscan.com',
  },
  // mainnet networks
  {
    networkName: 'Ethereum Main Network',
    rpcUrl: EthereumRpcUrl,
    chainId: 0o1,
    chainIdHex: '0x01',
    currencyName: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    blockExplorer: 'https://etherscan.io',
  },
  {
    networkName: 'Binance Smart Chain',
    rpcUrl: BscMainRpcUrl,
    chainId: 56,
    chainIdHex: '0x38',
    currencyName: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
    blockExplorer: 'https://bscscan.com',
  },
];

export const testApplicableNetworks: IApplicableNetwork[] = [
  {
    networkName: 'Sepolia Test Network',
    rpcUrl: SepoliaRpcUrl,
    chainId: 11155111,
    chainIdHex: '0xaa36a7',
    currencyName: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    blockExplorer: 'https://sepolia.etherscan.io',
  },
  {
    networkName: 'Binance Smart Chain Testnet',
    rpcUrl: BscTestRpcUrl,
    chainId: 97,
    chainIdHex: '0x61',
    currencyName: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
    blockExplorer: 'https://testnet.bscscan.com',
  },
];

export const mainApplicableNetworks: IApplicableNetwork[] = [
  {
    networkName: 'Ethereum Main Network',
    rpcUrl: EthereumRpcUrl,
    chainId: 0o1,
    chainIdHex: '0x01',
    currencyName: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    blockExplorer: 'https://etherscan.io',
  },
  {
    networkName: 'Binance Smart Chain',
    rpcUrl: BscMainRpcUrl,
    chainId: 56,
    chainIdHex: '0x38',
    currencyName: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
    blockExplorer: 'https://bscscan.com',
  },
];
