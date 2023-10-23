import {
  FC,
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import {ethers, Contract, providers, utils} from 'ethers';
import {GoerliRpcUrl} from '@constants/rpc';
import SecretsAbi from '@assets/sources/secretsAbi.json';
import {contractAddress, contractAddress2} from '@constants/addresses';
import {WalletContext} from './Wallet';
import {toastMessage} from '@utils/toast';
import {SepoliaRpcUrl} from '@constants/rpc';

interface ITodoContext {
  getNoteSizes: (userAddress: string) => void;
  setNoteToChain: (note: INote) => void;
  updateNoteBySender: (note: INote) => void;
  getNotesBySender: () => void;
  getNotesBySenderWithPagination: (pagination: IPagination) => void;
  getSpesificNote: (userAddress: string, index: number) => void;
  getNotesByAddress: (userAddress: string) => void;
  provider: any;
  loading: boolean;
  connectedNoteContract: boolean;
  noteContract: any;
  networkProvider: any;
}

interface IContextProvider {
  children: ReactNode;
}

export const TodoContext = createContext({} as ITodoContext);

const TodoProvider: FC<IContextProvider> = ({children}) => {
  const {isConnected, address, provider} = useContext(WalletContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [connectedNoteContract, setConnectedNoteContract] =
    useState<boolean>(false);
  const [networkProvider] = useState<any>(
    new providers.JsonRpcProvider(SepoliaRpcUrl),
  );

  const [noteContract, setNoteContract] = useState<any>(
    new Contract(contractAddress2, SecretsAbi),
  );

  useEffect(() => {
    if (isConnected && provider) {
      const newProvider = new providers.Web3Provider(
        provider as providers.ExternalProvider,
      );

      const signer = newProvider.getSigner(address);
      setNoteContract(noteContract.connect(signer));
      setConnectedNoteContract(true);
    } else {
      setNoteContract(noteContract.connect(networkProvider));
      setConnectedNoteContract(false);
    }
  }, [isConnected, provider]);

  useEffect(() => {
    if (!isConnected) {
      setLoading(false);
      setConnectedNoteContract(false);
    }
  }, [isConnected]);

  const getNoteSizes = async (userAddress: string | undefined) => {
    setLoading(true);
    try {
      let notesSize = await noteContract.getUserNotesSize(userAddress);
    } catch (err: any) {
      console.log('err: ', err);
      toastMessage('error', 'Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const setNoteToChain = async (note: INote) => {
    setLoading(true);
    try {
      const tx = await noteContract.setNote(note.noteTitle, note.priority, {
        from: address,
      });

      await tx.wait();
      toastMessage('success', 'Success', 'Note set successfully');
    } catch (err: any) {
      console.log(err);
      toastMessage('error', 'Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateNoteBySender = async (note: INote) => {
    setLoading(true);
    try {
      const tx = await noteContract.updateNoteBySender(
        note.noteId,
        note.noteTitle,
        note.priority,
        {
          from: address,
        },
      );

      await tx.wait();
    } catch (err: any) {
      toastMessage('error', 'Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const getNotesBySender = async () => {
    setLoading(true);
    try {
      const notes = await noteContract.getNotesBySender({
        from: address,
      });

      const notesArray = notes.map(([id, text, priority]) => ({
        id: id.toString(),
        text,
        priority,
      }));
      console.log('notesArray: ', notesArray);
    } catch (err: any) {
      console.log('err: ', err);
      toastMessage('error', 'Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const getNotesBySenderWithPagination = async (pagination: IPagination) => {
    setLoading(true);
    try {
      const notes = await noteContract.getNotesBySenderWithPagination(
        pagination.page,
        pagination.resultsPerPage,
        {
          from: address,
        },
      );

      const notesArray = notes.map(([id, text, priority]) => ({
        id: id.toString(),
        text,
        priority,
      }));
      console.log('notesArray: ', notesArray);
      return notesArray;
    } catch (err: any) {
      console.log(err.message);
      toastMessage('error', 'Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  // mapping
  const getSpesificNote = async (userAddress: string, index: number) => {
    setLoading(true);
    try {
      const [id, text, priority] = await noteContract.notes(userAddress, index);

      const noteObject = {
        id: id.toString(),
        text,
        priority: parseInt(priority),
      };

      console.log('note: ', noteObject);
    } catch (err: any) {
      console.log('err: ', err);
      toastMessage('error', 'Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const getNotesByAddress = async (userAddress: string) => {
    setLoading(true);
    try {
      const notesArray = await noteContract.getNotesByAddressTest(userAddress);
      console.log('notesArray: ', notesArray);

      return notesArray;
    } catch (err: any) {
      console.log(err.message);
      toastMessage('error', 'Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        getNoteSizes,
        provider,
        setNoteToChain,
        updateNoteBySender,
        getNotesByAddress,
        getNotesBySender,
        getNotesBySenderWithPagination,
        getSpesificNote,
        loading,
        connectedNoteContract,
        noteContract,
        networkProvider,
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
