import {Header, SecretItem, NoteButton, NoteText, Loading} from '@components';
import {useContext, FC, useRef, useMemo, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BottomSheet, {BottomSheetTextInput, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {FlashList, FlashListProps} from '@shopify/flash-list';
import Feather from 'react-native-vector-icons/Feather';
import {ThemeContext} from '@contexts/Theme';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import useKeyboardVisibility from '@hooks/useKeyboardVisibility';
import {ConnectWallet, Web3Button} from '@thirdweb-dev/react-native';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {WalletContext} from '@contexts/Wallet';
import {ethers} from 'ethers';
import {toastMessage} from '@utils/toast';
import {getNotePriorityColor} from '@helpers/priority-control';
import {parseAndFormat} from '@helpers/bignumber-prettier';

interface INotes {
  navigation: any;
}

const Notes: FC<INotes> = ({navigation}) => {
  /* NOTES STATES*/
  const [notes, setNotes] = useState<INote[]>([]);

  const [note, setNote] = useState<INote>({
    id: '0',
    title: '',
    content: '',
    priority: 0, // 0, 1 ,2, 3
    createdAt: 0,
    updatedAt: 0,
  });
  const [triggeredSecretItem, setTriggeredSecretItem] = useState<boolean>(false);
  const [refreshingNotes, setRefreshingNotes] = useState<boolean>(false);

  const flashlistRef = useRef<any>(null);
  const panRef = useRef<any>(null);

  /* WEB3 */
  const {
    // addresses
    userAddress,
    contractAddress,
    // pagination
    currentPage,
    setCurrentPage,
    resultsPerPage,
    // contract
    isLoadingContract,
    errorContract,
    // user notes
    userNotes,
    isLoadingUserNotes,
    errorUserNotes,
    refetchUserNotes,
    // user notes size
    userNotesSize,
    isLoadingUserNotesSize,
    errorUserNotesSize,
    refetchUserNotesSize,
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
  } = useContext(WalletContext);

  const totalResults = parseAndFormat(userNotesSize);
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  /* THEME AND LANG */
  const {activeTheme, themeValue, changeTheme} = useContext(ThemeContext);
  const {t} = useTranslation();
  const {colors} = useTheme();

  /* BOTTOM SHEET START*/
  const isKeyboardVisible = useKeyboardVisibility();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%'], []);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);
  const textInputRef = useRef<TextInput>(null);

  // initialize the user notes from contract
  useEffect(() => {
    getNotesFromBlockchain();
  }, [userNotes]);

  // if setting note is success, close the bottom sheet and reset the note
  useEffect(() => {
    if (isSuccessMutateNote) {
      bottomSheetRef.current?.close();
      setNote({
        id: '0',
        title: '',
        content: '',
        priority: 0, // 0, 1 ,2, 3
        createdAt: 0,
        updatedAt: 0,
      });
      refetchProcess();
    }
  }, [isSuccessMutateNote]);

  useEffect(() => {
    if (isSuccessDeleteNote) {
      setTriggeredSecretItem(true);
      refetchProcess();
    }
  }, [isSuccessDeleteNote]);

  // control the bottom sheet visibility, if it is visible, focus the text input and if it is not visible, dismiss the keyboard
  useEffect(() => {
    if (!isBottomSheetVisible) {
      Keyboard.dismiss();
    } else {
      textInputRef.current?.focus();
    }
  }, [isBottomSheetVisible]);

  useEffect(() => {
    if (errorMutateNote) {
      //toastMessage('error', 'Error', 'There is a problem to set note');
      bottomSheetRef.current?.close();

      refetchProcess();
    }
  }, [errorMutateNote]);

  // control keyboard visibility, if it is not visible, close the bottom sheet
  useEffect(() => {
    if (!isKeyboardVisible) {
      bottomSheetRef.current?.close();
    }
  }, [isKeyboardVisible]);

  const handleSheetPress = useCallback(() => {
    if (isBottomSheetVisible) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.collapse();
    }
    setIsBottomSheetVisible(!isBottomSheetVisible);
  }, [isBottomSheetVisible]);

  // control bottom sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      setIsBottomSheetVisible(false);
    } else {
      setIsBottomSheetVisible(true);
    }
  }, []);

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} opacity={0.1} {...props} />,
    [],
  );

  /* APP SPESIFIC METHODS */
  const openSidebar = () => {
    navigation.openDrawer();
  };

  const refetchProcess = () => {
    refetchUserNotesSize();
    refetchUserNotes();
  };

  const dynamicPaddingBottom = () => {
    // if (isKeyboardVisible) {
    //   return Platform.OS === 'ios' ? 12 : 10;
    // } else {
    //   return 30;
    // }
    return 10;
  };

  useEffect(() => {
    console.log('ttt: ', triggeredSecretItem);
  }, [triggeredSecretItem]);

  const getNotesFromBlockchain = () => {
    const transformedData = transformData(userNotes);
    console.log('usernotes: ', transformedData);
    setNotes(transformedData);
  };

  const onRefreshNotes = useCallback(() => {
    setRefreshingNotes(true);
    refetchProcess();
    setRefreshingNotes(false);

    // setTimeout(() => {
    //   setRefreshingNotes(false);
    // }, 1000);
  }, [userNotes]);

  const getNotePriorityName = () => {
    return note.priority === 0
      ? t('priority')
      : note.priority === 1
      ? t('normal')
      : note.priority === 2
      ? t('medium')
      : t('urgent');
  };

  const transformData = inputData => {
    return inputData
      ?.filter(([id, title, content, priority, createdAt, updatedAt]) => title.length > 0)
      ?.map(([id, title, content, priority, createdAt, updatedAt]) => {
        return {
          id: parseAndFormat(id),
          title,
          content,
          priority,
          createdAt: parseAndFormat(createdAt),
          updatedAt: parseAndFormat(updatedAt),
        };
      });
  };

  const addNoteToChain = async () => {
    let createdAt = Math.floor(Date.now() / 1000);

    try {
      let result = await mutateNote({args: [note.title, note.content, note.priority, createdAt, createdAt]});
    } catch (error) {
      // toastMessage('error', 'Error', 'There is a problem to set note');
    }
  };

  const removeNote = async (id: string) => {
    // setNotes(notes.filter(note => note.id !== id));
    try {
      await deleteNote({args: [parseInt(id)]});
    } catch (error) {
      toastMessage('error', 'Error', 'There is a problem to delete note');
    }
  };

  useEffect(() => {
    if (errorDeleteNote) {
      setTriggeredSecretItem(true);
      // toastMessage('error', 'Error', 'There is a problem to delete note');
      refetchProcess();
    }
  }, [errorDeleteNote]);

  useEffect(() => {
    if (isSuccessDeleteNote) {
      toastMessage('success', 'Success', 'Note is deleted successfully');
      getNotesFromBlockchain();
    }
  }, [isSuccessDeleteNote]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <Header
        navigation={navigation}
        text={t('notes')}
        isBack={false}
        isThree={true}
        leftSection={
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            activeOpacity={0.8}
            onPress={() => {
              openSidebar();
            }}>
            <Feather name="menu" size={24} color="#279EFF" />
          </TouchableOpacity>
        }
        rightSection={
          <TouchableOpacity onPress={openSidebar} activeOpacity={0.7}>
            {userAddress ? (
              <NoteText
                style={[
                  styles.connectedText,
                  {
                    color: colors.primary,
                  },
                ]}
                weight="600">
                Connected
              </NoteText>
            ) : (
              <NoteText style={[styles.notConnectedText, {}]} weight="600">
                Not Connected
              </NoteText>
            )}
          </TouchableOpacity>
        }
      />

      {isLoadingMutateNote && <Loading />}
      {isLoadingDeleteNote && <Loading />}

      {!userAddress && (
        <NoteButton
          style={{
            backgroundColor: 'transparent',
            paddingTop: 8,
          }}
          onPress={openSidebar}>
          <NoteText>Henüz bağlı değilsiniz!</NoteText>
        </NoteButton>
      )}

      {userAddress && notes?.length == 0 && (
        <NoteButton
          style={{
            backgroundColor: 'transparent',
            paddingTop: 12,
          }}
          onPress={handleSheetPress}>
          <NoteText>Bir şeyler yaz...</NoteText>
        </NoteButton>
      )}

      <View style={{flex: 1, paddingBottom: 24}}>
        <NativeViewGestureHandler ref={flashlistRef} simultaneousHandlers={panRef}>
          <FlatList
            data={notes}
            scrollEnabled={true}
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingTop: 12,
            }}
            showsVerticalScrollIndicator={false}
            //extraData={errorDeleteNote}
            extraData={notes}
            renderItem={({item}) => (
              <SecretItem
                // onPress={() => setSelectedNoteId(item.id)}
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                priority={item.priority}
                onDelete={removeNote}
                simultaneousHandler={flashlistRef}
                panRef={panRef}
                triggeredSecretItem={triggeredSecretItem}
              />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 0,
                  backgroundColor: '#ddd',
                  marginVertical: 0,
                }}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshingNotes}
                onRefresh={onRefreshNotes}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            }
            refreshing={refreshingNotes}
            // estimatedItemSize={4}
          />
        </NativeViewGestureHandler>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}}>
          {notes?.length > 0 && (
            <View style={styles.paginationContainer}>
              <NoteButton
                onPress={handlePrevPage}
                style={[
                  styles.paginationButton,
                  {
                    backgroundColor: isFirstPage ? colors.paginationDisabled : colors.primary,
                  },
                ]}
                disabled={isFirstPage}>
                <AntDesign name="left" size={18} color="#fff" />
              </NoteButton>

              <NoteText style={[styles.paginationText, {color: colors.text}]} weight="600">
                {`${currentPage}/${totalPages}`}
              </NoteText>

              <NoteButton
                onPress={handleNextPage}
                style={[
                  styles.paginationButton,
                  {
                    backgroundColor: isLastPage ? colors.paginationDisabled : colors.primary,
                  },
                ]}
                disabled={isLastPage}>
                <AntDesign name="right" size={18} color="#fff" />
              </NoteButton>
            </View>
          )}

          <NoteButton onPress={handleSheetPress} style={[styles.plusButton, {marginLeft: 'auto'}]}>
            <Octicons name="plus" size={24} color="#fff" />
          </NoteButton>
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        // name="AddNoteSheet"
        // keyboardBehavior="interactive"
        // keyboardBlurBehavior="restore"
        handleIndicatorStyle={{
          backgroundColor: themeValue === 'light' ? '#000' : '#fff',
        }}
        handleStyle={{
          backgroundColor: themeValue === 'light' ? '#fff' : '#61677A',
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        }}>
        <View
          style={[
            styles.bottomsheetInnerContainer,
            {
              backgroundColor: colors.sheetBg,
              paddingBottom: dynamicPaddingBottom(),
            },
          ]}>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 2,
            }}>
            <BottomSheetTextInput
              // @ts-ignore
              ref={textInputRef as RefObject<TextInput>}
              value={note.title}
              onChangeText={text => setNote({...note, title: text})}
              placeholder="Title"
              maxLength={36}
              selectionColor={colors.inputSelection}
              placeholderTextColor={colors.inputPlaceholder}
              style={styles.bottomSheetTitleInput}
            />
            <BottomSheetTextInput
              defaultValue={note.content}
              onChangeText={text => setNote({...note, content: text})}
              placeholder="Description"
              blurOnSubmit={false}
              numberOfLines={4}
              multiline
              scrollEnabled={false}
              selectionColor={colors.inputSelection}
              placeholderTextColor={colors.inputPlaceholder}
              style={styles.bottomSheetDescriptionInput}
            />
          </View>

          <View style={styles.sheetModalBottom}>
            <Menu>
              <MenuTrigger style={styles.priorityTriggerButton}>
                <SimpleLineIcons name="graph" size={22} color={getNotePriorityColor(themeValue, colors, note.priority)} />
                <NoteText style={[{color: getNotePriorityColor(themeValue, colors, note.priority)}]} weight="800">
                  {getNotePriorityName()}
                </NoteText>
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: styles.menuOptionsContainer,
                }}>
                <MenuOption
                  onSelect={() =>
                    setNote({
                      ...note,
                      priority: 0,
                    })
                  }
                  customStyles={{
                    optionWrapper: styles.menuOptionWrapper,
                  }}>
                  <NoteText
                    style={{
                      color: colors.none,
                    }}>
                    {t('none')}
                  </NoteText>
                  <SimpleLineIcons name="graph" size={22} color={colors.none} />
                </MenuOption>
                <MenuOption
                  onSelect={() =>
                    setNote({
                      ...note,
                      priority: 1,
                    })
                  }
                  customStyles={{
                    optionWrapper: styles.menuOptionWrapper,
                  }}>
                  <NoteText
                    style={{
                      color: colors.normal,
                    }}>
                    {t('normal')}
                  </NoteText>
                  <SimpleLineIcons name="graph" size={22} color={colors.normal} />
                </MenuOption>
                <MenuOption
                  onSelect={() =>
                    setNote({
                      ...note,
                      priority: 2,
                    })
                  }
                  customStyles={{
                    optionWrapper: styles.menuOptionWrapper,
                  }}>
                  <NoteText
                    style={{
                      color: colors.medium,
                    }}>
                    {t('medium')}
                  </NoteText>
                  <SimpleLineIcons name="graph" size={22} color={colors.medium} />
                </MenuOption>
                <MenuOption
                  onSelect={() =>
                    setNote({
                      ...note,
                      priority: 3,
                    })
                  }
                  customStyles={{
                    optionWrapper: styles.menuOptionWrapper,
                  }}>
                  <NoteText style={{color: colors.urgent}}>{t('urgent')}</NoteText>
                  <SimpleLineIcons name="graph" size={22} color={colors.urgent} />
                </MenuOption>
              </MenuOptions>
            </Menu>

            <NoteButton
              style={styles.sendButton}
              onPress={() => {
                addNoteToChain();
              }}>
              <MaterialIcons name="arrow-upward" size={26} color="#fff" />
            </NoteButton>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  priorityTriggerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    gap: 6,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  menuOptionsContainer: {
    marginTop: Platform.OS === 'ios' ? -180 : -130,
    borderRadius: 6,
    /*
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    */
    elevation: 2,
    zIndex: 2,
  },
  menuOptionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bottomsheetInnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  sheetModalBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  sendButton: {
    borderRadius: 999,
    width: 42,
    height: 42,
  },
  bottomSheetTitleInput: {
    paddingHorizontal: 4,
    paddingVertical: 16,
    fontSize: 18,
    fontFamily: 'SourceCodePro-Regular',
  },
  bottomSheetDescriptionInput: {
    paddingHorizontal: 4,
    paddingVertical: 16,
    fontSize: 18,
    height: Platform.OS === 'ios' ? 90 : 'auto',
    textAlignVertical: 'top',
    fontFamily: 'SourceCodePro-Regular',
  },
  profileMain: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  connectedText: {
    fontSize: 15,
  },
  notConnectedText: {
    fontSize: 15,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // paddingLeft: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  paginationText: {
    marginHorizontal: 16,
    fontSize: 18,
  },
  paginationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
    borderRadius: 999,
  },
  plusButton: {
    // position: 'absolute',
    // bottom: 48,
    // right: 32,
    width: 52,
    height: 52,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
