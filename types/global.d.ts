/// <reference types="nativewind/types" />

type languageType = 'en' | 'tr';

interface INote {
  noteId?: number;
  noteTitle: string;
  noteContent?: string;
  priority: number;
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
