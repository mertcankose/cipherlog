import Config from 'react-native-config';

type RpcUrlType = string;

export const GoerliRpcUrl: RpcUrlType = Config.GOERLI_RPC_URL || '';
export const SepoliaRpcUrl: RpcUrlType = Config.SEPOLIA_RPC_URL || '';
export const EthereumRpcUrl: RpcUrlType = Config.ETHEREUM_RPC_URL || '';
export const BscTestRpcUrl: RpcUrlType = Config.BSCTEST_RPC_URL || '';
export const BscMainRpcUrl: RpcUrlType = Config.BSCMAIN_RPC_URL || '';
