import Config from 'react-native-config';

type WalletConnectProjectIdType = string;

export const WalletConnectProjectId: WalletConnectProjectIdType =
  Config.WALLET_CONNECT_PROJECT_ID || '';
