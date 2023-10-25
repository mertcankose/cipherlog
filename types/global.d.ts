/// <reference types="nativewind/types" />

type languageType = 'en' | 'tr';

interface INote {
  id: string;
  title: string;
  content: string;
  priority: number;
  createdAt: number;
  updatedAt: number;
}

interface IPagination {
  page: number;
  resultsPerPage: number;
}

interface IApplicableNetwork {
  networkName: string | undefined;
  rpcUrl: string | undefined;
  chainId: number | undefined;
  chainIdHex: string | undefined;
  currencyName: string | undefined;
  symbol: string | undefined;
  decimals: number | undefined;
  blockExplorer: string | undefined;
}

interface IChainId {
  chainId: string | undefined;
  chainIdHex: string | undefined;
}

declare module '@env' {
  export const THIRD_WEB_PROJECT_ID: string;
  export const CONTRACT_ADDRESS: string;
}
