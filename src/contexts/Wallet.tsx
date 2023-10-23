import {FC, ReactNode, useState, createContext, useEffect} from 'react';

interface IWalletContext {}

interface IContextProvider {
  children: ReactNode;
}

export const WalletContext = createContext({} as IWalletContext);

const WalletProvider: FC<IContextProvider> = ({children}) => {
  return <WalletContext.Provider value={{}}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
