import {FC, ReactNode, useState, createContext, useEffect} from 'react';
import {useContract, useContractRead, useContractWrite, useAddress} from '@thirdweb-dev/react-native';
import {CONTRACT_ADDRESS} from '@env';
import CONTRACT_ABI from '@assets/sources/secretsAbi.json';

interface IWalletContext {
  // addresses
  userAddress: string | undefined;
  contractAddress: string;
  // pagination
  page: number;
  setPage: (page: number) => void;
  resultsPerPage: number;
  setResultsPerPage: (resultsPerPage: number) => void;
  // contract
  isLoadingContract: boolean;
  errorContract: any;
  // user notes
  userNotes: any;
  isLoadingUserNotes: boolean;
  errorUserNotes: any;
  // mutate note
  mutateNote: any;
  isLoadingMutateNote: boolean;
  errorMutateNote: any;
  isSuccessMutateNote: any;
  // update note
  updateNote: any;
  isLoadingUpdateNote: boolean;
  errorUpdateNote: any;
  // delete note
  deleteNote: any;
  isLoadingDeleteNote: boolean;
  errorDeleteNote: any;
}

interface IContextProvider {
  children: ReactNode;
}

export const WalletContext = createContext({} as IWalletContext);

const WalletProvider: FC<IContextProvider> = ({children}) => {
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const address = useAddress();

  // definition of the contract
  const {contract, isLoading: isLoadingContract, error: errorContract} = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);

  // getNotesByAddressWithPagination
  const {
    data: userNotes,
    isLoading: isLoadingUserNotes,
    error: errorUserNotes,
  } = useContractRead(contract, 'getNotesByAddressWithPagination', [address, 1, 10]);

  // setNote | args: (_note, noteContent, _priority)
  const {mutate: mutateNote, isLoading: isLoadingMutateNote, error: errorMutateNote, isSuccess: isSuccessMutateNote} = useContractWrite(contract, 'setNote');

  // updateNoteBySender | args: (_noteId, _note, _noteContent, _priority)
  const {mutate: updateNote, isLoading: isLoadingUpdateNote, error: errorUpdateNote} = useContractWrite(contract, 'updateNoteBySender');

  // deleteNoteBySender | args: (_noteId)
  const {mutate: deleteNote, isLoading: isLoadingDeleteNote, error: errorDeleteNote} = useContractWrite(contract, 'updateNoteBySender');

  return (
    <WalletContext.Provider
      value={{
        // addresses
        userAddress: address,
        contractAddress: CONTRACT_ADDRESS,
        // pagination
        page,
        setPage,
        resultsPerPage,
        setResultsPerPage,
        // contract
        isLoadingContract,
        errorContract,
        // user notes
        userNotes,
        isLoadingUserNotes,
        errorUserNotes,
        // mutate note
        mutateNote,
        isLoadingMutateNote,
        errorMutateNote,
        isSuccessMutateNote,
        // update note
        updateNote,
        isLoadingUpdateNote,
        errorUpdateNote,
        // delete note
        deleteNote,
        isLoadingDeleteNote,
        errorDeleteNote,
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
