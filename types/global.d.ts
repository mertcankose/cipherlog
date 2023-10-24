/// <reference types="nativewind/types" />

type languageType = "en" | "tr";

interface INote {
  noteId: string;
  noteTitle: string;
  noteContent: string;
  notePriority: number;
  noteDate: string;
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
