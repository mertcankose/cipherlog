import {
  ConnectWalletButton,
  Header,
  NetworkModal,
  NetworkSwitcherButton,
  SecretItem,
  TodoButton,
  TodoText,
} from '@components';
import {
  useContext,
  FC,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  RefreshControl,
  AppState,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {FlashList} from '@shopify/flash-list';
import Feather from 'react-native-vector-icons/Feather';
import {ThemeContext} from '@contexts/Theme';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

const NoteData = [
  {
    id: '0',
    title: 'First Item',
    content:
      'Yeah that is crazy, but people can change their own picture and build their own Twitter conversation with this generator, so it does not matter that you are an egg',
    date: '17 Sep',
  },
  {
    id: '1',
    title: 'Second Item',
    content:
      'Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)',
    date: '18 Sep',
  },
  {
    id: '2',
    title: 'Third Item',
    content:
      'Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!',
    date: '19 Sep',
  },
  {
    id: '3',
    title: 'Forth Item',
    content:
      'Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!',
    date: '20 Sep',
  },
];

interface INotes {
  navigation: any;
}

const Notes: FC<INotes> = ({navigation}) => {
  const [note, setNote] = useState<INote>({
    noteId: 0,
    noteTitle: '',
    noteContent: '',
    priority: 0, // 0, 1 ,2, 3
  });

  const {activeTheme, themeValue, changeTheme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const {colors} = useTheme();

  const [selectedNoteId, setSelectedNoteId] = useState<string>();
  const [networkModalVisible, setNetworkModalVisible] =
    useState<boolean>(false);
  const [refreshingNotes, setRefreshingNotes] = useState<boolean>(false);

  const getNotes = async () => {
    // console.log('provider: ', provider);
    /*
    let notes = await getNotesBySenderWithPagination({
      page: 1,
      resultsPerPage: 4,
    });
    //getNotesBySender();
    */
  };

  const onRefreshNotes = useCallback(() => {
    setRefreshingNotes(true);
    setTimeout(() => {
      setRefreshingNotes(false);
    }, 2000);
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['20%', '40%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index); // 1, -1
  }, []);

  const openNoteSheet = () => {
    handlePresentModalPress();
  };

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop opacity={0.1} {...props} />,
    [],
  );

  const getNotePriorityName = () => {
    return note.priority === 0
      ? t('priority')
      : note.priority === 1
      ? t('normal')
      : note.priority === 2
      ? t('medium')
      : t('urgent');
  };

  const getNotePriorityIconColor = () => {
    return note.priority === 0
      ? activeTheme === 'light'
        ? '#6b7280'
        : '#fff'
      : note.priority === 1
      ? '#1f2937'
      : note.priority === 2
      ? '#279EFF'
      : '#ef4444';
  };

  const getNotePriorityTextColor = () => {
    return note.priority === 0
      ? activeTheme === 'light'
        ? '#6b7280'
        : '#fff'
      : note.priority === 1
      ? 'text-gray-800'
      : note.priority === 2
      ? 'text-primary'
      : 'text-red-500';
  };

  const addNoteToChain = () => {
    console.log('addNoteToChain', note);

    // when loading done
    setNote({
      noteId: 0,
      noteTitle: '',
      noteContent: '',
      priority: 0, // 0, 1 ,2, 3
    });
    bottomSheetModalRef.current?.close();
  };

  const openSidebar = () => {
    navigation.openDrawer();
  };

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
          <NetworkSwitcherButton
            openModal={() => {
              setNetworkModalVisible(true);
            }}
          />
        }
      />
      <NetworkModal
        visibility={networkModalVisible}
        closeModal={() => {
          setNetworkModalVisible(false);
        }}
        selectNetwork={(network: IApplicableNetwork) => {
          // switchChain(network);
          setNetworkModalVisible(false);
        }}
      />

      <View style={{flex: 1}}>
        {true ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ConnectWalletButton />
          </View>
        ) : (
          <FlashList
            data={NoteData}
            scrollEnabled={true}
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingTop: 12,
              paddingBottom: 62,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <SecretItem
                onPress={() => setSelectedNoteId(item.id)}
                id={item.id}
                title={item.title}
                content={item.content}
                date={item.date}
              />
            )}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 4,
                  backgroundColor: 'gray',
                  marginVertical: 8,
                }}></View>
            )}
            extraData={selectedNoteId}
            refreshControl={
              <RefreshControl
                refreshing={refreshingNotes}
                onRefresh={onRefreshNotes}
              />
            }
            refreshing={refreshingNotes}
            estimatedItemSize={2}
          />
        )}
      </View>

      <TodoButton
        onPress={openNoteSheet}
        style={{
          position: 'absolute',
          bottom: 48,
          right: 32,
          borderWidth: 0, // border-none
          width: 56, // w-14
          height: 56, // h-14
          borderRadius: 28, // rounded-full equivalent
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Octicons name="plus" size={24} color="#fff" />
      </TodoButton>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          name="AddNoteSheet"
          // enableDynamicSizing={false}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{
            backgroundColor: activeTheme === 'light' ? '#000' : '#fff',
          }}
          handleStyle={{
            backgroundColor: activeTheme === 'light' ? '#fff' : '#61677A',
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingHorizontal: 2,
              backgroundColor: 'white', // for light mode
              // or dark mode background color
              // backgroundColor: '#61677A',
              paddingBottom: Platform.OS === 'ios' ? 4 : 4,
              marginBottom: 2, // for the gap-2 equivalent
            }}>
            <View
              style={{
                flexDirection: 'column',
                marginBottom: 2,
              }}>
              <BottomSheetTextInput
                id="noteTitle"
                value={note.noteTitle}
                onChangeText={text => setNote({...note, noteTitle: text})}
                placeholder="Title"
                autoFocus={true}
                selectionColor={activeTheme === 'light' ? '#279EFF' : '#D8D9DA'}
                maxLength={40}
                placeholderTextColor={
                  activeTheme === 'light' ? '#7D7C7C' : '#D8D9DA'
                }
                style={{
                  paddingHorizontal: 4,
                  paddingVertical: 16,
                  fontSize: 18,
                }}
              />
              <BottomSheetTextInput
                id="noteContent"
                defaultValue={note.noteContent}
                onChangeText={text => setNote({...note, noteContent: text})}
                placeholder="Description"
                blurOnSubmit={false}
                numberOfLines={4}
                multiline
                scrollEnabled={false}
                selectionColor={activeTheme === 'light' ? '#279EFF' : '#D8D9DA'}
                placeholderTextColor={
                  activeTheme === 'light' ? '#7D7C7C' : '#D8D9DA'
                }
                style={{
                  paddingHorizontal: 4,
                  paddingVertical: 16,
                  fontSize: 18,
                  height: Platform.OS === 'ios' ? 90 : 'auto',
                  textAlignVertical: 'top',
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 4,
              }}>
              <Menu>
                <MenuTrigger style={styles.priorityTriggerButton}>
                  <SimpleLineIcons
                    name="graph"
                    size={22}
                    color={getNotePriorityIconColor()}
                  />
                  <TodoText style={[getNotePriorityTextColor()]} weight="800">
                    {getNotePriorityName()}
                  </TodoText>
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
                    <TodoText
                      style={{
                        color: 'gray',
                      }}>
                      {t('none')}
                    </TodoText>
                    <SimpleLineIcons name="graph" size={22} color="#6b7280" />
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
                    <TodoText
                      style={{
                        color: 'gray',
                      }}>
                      {t('normal')}
                    </TodoText>
                    <SimpleLineIcons name="graph" size={22} color="#1f2937" />
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
                    <TodoText
                      style={{
                        color: 'blue',
                      }}>
                      {t('medium')}
                    </TodoText>
                    <SimpleLineIcons name="graph" size={22} color="#279EFF" />
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
                    <TodoText style={{color: 'red'}}>{t('urgent')}</TodoText>
                    <SimpleLineIcons name="graph" size={22} color="#ef4444" />
                  </MenuOption>
                </MenuOptions>
              </Menu>

              <TodoButton
                style={{
                  borderRadius: 999,
                  width: 40,
                  height: 40,
                }}
                onPress={() => {
                  addNoteToChain();
                }}>
                <MaterialIcons name="arrow-upward" size={24} color="#fff" />
              </TodoButton>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
});
