import {FC, ReactNode, useState, createContext, useEffect} from 'react';
import {useContract, useContractRead, useContractWrite, useAddress} from '@thirdweb-dev/react-native';
import {CONTRACT_ADDRESS} from '@env';
import CONTRACT_ABI from '@assets/sources/secretsAbi.json';

interface IWalletContext {
  // addresses
  userAddress: string | undefined;
  contractAddress: string;
  // pagination
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  resultsPerPage: number;
  // contract
  isLoadingContract: boolean;
  errorContract: any;
  // user notes size
  userNotesSize: any;
  isLoadingUserNotesSize: boolean;
  errorUserNotesSize: any;
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
  isSuccessDeleteNote: boolean;
}

interface IContextProvider {
  children: ReactNode;
}

const FAKE_ADDRESS = '0xa4A0Bacdfacbd22cdCeF8c6fDF703CA533D4E48B';

export const WalletContext = createContext({} as IWalletContext);

const WalletProvider: FC<IContextProvider> = ({children}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage] = useState<number>(2);

  const address = useAddress();

  // definition of the contract
  const {contract, isLoading: isLoadingContract, error: errorContract} = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);

  // getNotesByAddressWithPagination
  const {
    data: userNotes,
    isLoading: isLoadingUserNotes,
    error: errorUserNotes,
  } = useContractRead(
    contract,
    'getNotesByAddressWithPagination',
    address ? [address, currentPage, resultsPerPage] : [FAKE_ADDRESS, currentPage, resultsPerPage],
  );

  // getUserNotesSize
  const {
    data: userNotesSize,
    isLoading: isLoadingUserNotesSize,
    error: errorUserNotesSize,
  } = useContractRead(contract, 'getUserNotesSize', address ? [address] : [FAKE_ADDRESS]);

  // setNote | args: (_note, noteContent, _priority)
  const {
    mutate: mutateNote,
    isLoading: isLoadingMutateNote,
    error: errorMutateNote,
    isSuccess: isSuccessMutateNote,
  } = useContractWrite(contract, 'setNote');

  // updateNoteBySender | args: (_noteId, _note, _noteContent, _priority)
  const {
    mutate: updateNote,
    isLoading: isLoadingUpdateNote,
    error: errorUpdateNote,
  } = useContractWrite(contract, 'updateNoteBySender');

  // deleteNoteBySender | args: (_noteId)
  const {
    mutate: deleteNote,
    isLoading: isLoadingDeleteNote,
    error: errorDeleteNote,
    isSuccess: isSuccessDeleteNote,
  } = useContractWrite(contract, 'deleteNoteBySender');

  return (
    <WalletContext.Provider
      value={{
        // addresses
        userAddress: address,
        contractAddress: CONTRACT_ADDRESS,
        // pagination
        currentPage,
        setCurrentPage,
        resultsPerPage,
        // contract
        isLoadingContract,
        errorContract,
        // user notes size
        userNotesSize,
        isLoadingUserNotesSize,
        errorUserNotesSize,
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
        isSuccessDeleteNote,
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
