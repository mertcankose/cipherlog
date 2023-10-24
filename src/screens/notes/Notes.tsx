import { Header, NetworkModal, SecretItem, NoteButton, NoteText } from "@components";
import { useContext, FC, useRef, useMemo, useCallback, useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Platform, TouchableOpacity, RefreshControl, TextInput, Keyboard } from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import BottomSheet, { BottomSheetTextInput, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import Feather from "react-native-vector-icons/Feather";
import { ThemeContext } from "@contexts/Theme";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import useKeyboardVisibility from "@hooks/useKeyboardVisibility";
import { useAddress } from "@thirdweb-dev/react-core";
import { NativeViewGestureHandler } from "react-native-gesture-handler";

interface INotes {
  navigation: any;
}

const Notes: FC<INotes> = ({ navigation }) => {
  /* NOTES STATES*/
  const [notes, setNotes] = useState<INote[]>([
    {
      noteId: "0",
      noteTitle: "First Item",
      noteContent:
        "Yeah that is crazy, but people can change their own picture and build their own Twitter conversation with this generator, so it does not matter that you are an egg",
      notePriority: 0,
      noteDate: "17 Sep",
    },
    {
      noteId: "1",
      noteTitle: "Second Item",
      noteContent: "Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)",
      notePriority: 0,
      noteDate: "18 Sep",
    },
    {
      noteId: "2",
      noteTitle: "Third Item",
      noteContent: "Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!",
      notePriority: 0,
      noteDate: "19 Sep",
    },
    {
      noteId: "3",
      noteTitle: "Forth Item",
      noteContent: "Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!",
      notePriority: 2,
      noteDate: "20 Sep",
    },
    {
      noteId: "4",
      noteTitle: "Fifth Item",
      noteContent: "Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!",
      notePriority: 1,
      noteDate: "10 Sep",
    },
  ]);

  const [note, setNote] = useState<INote>({
    noteId: "0",
    noteTitle: "",
    noteContent: "",
    notePriority: 0, // 0, 1 ,2, 3
    noteDate: "",
  });
  const [selectedNoteId, setSelectedNoteId] = useState<string>();
  const [refreshingNotes, setRefreshingNotes] = useState<boolean>(false);

  const flashlistRef = useRef<any>(null);
  const panRef = useRef<any>(null);

  /* WEB3 */
  const address = useAddress();
  const [networkModalVisible, setNetworkModalVisible] = useState<boolean>(false);

  /* THEME AND LANG */
  const { activeTheme, themeValue, changeTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { colors } = useTheme();

  /* BOTTOM SHEET START*/
  const isKeyboardVisible = useKeyboardVisibility();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%"], []);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!isBottomSheetVisible) {
      Keyboard.dismiss();
    } else {
      textInputRef.current?.focus();
    }
  }, [isBottomSheetVisible]);

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

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index); // 0, -1
    if (index == -1) {
      setIsBottomSheetVisible(false);
    } else {
      setIsBottomSheetVisible(true);
    }
  }, []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} opacity={0.1} {...props} />,
    []
  );

  {
    /* APP SPESIFIC METHODS */
  }
  const openSidebar = () => {
    navigation.openDrawer();
  };

  const dynamicPaddingBottom = () => {
    // if (isKeyboardVisible) {
    //   return Platform.OS === 'ios' ? 12 : 10;
    // } else {
    //   return 30;
    // }
    return 10;
  };

  {
    /* NOTES METHODS */
  }
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

  const getNotePriorityName = () => {
    return note.notePriority === 0
      ? t("priority")
      : note.notePriority === 1
      ? t("normal")
      : note.notePriority === 2
      ? t("medium")
      : t("urgent");
  };

  const getNotePriorityIconColor = () => {
    return note.notePriority === 0
      ? themeValue === "light"
        ? colors.none
        : "#fff"
      : note.notePriority === 1
      ? colors.normal
      : note.notePriority === 2
      ? colors.medium
      : colors.urgent;
  };

  const getNotePriorityTextColor = () => {
    return note.notePriority === 0
      ? themeValue === "light"
        ? colors.none
        : "#fff"
      : note.notePriority === 1
      ? colors.normal
      : note.notePriority === 2
      ? colors.medium
      : colors.urgent;
  };

  const addNoteToChain = () => {
    console.log("addNoteToChain", note);

    // when loading done
    setNote({
      noteId: "0",
      noteTitle: "",
      noteContent: "",
      notePriority: 0, // 0, 1 ,2, 3
      noteDate: "",
    });
    bottomSheetRef.current?.close();
  };

  const deleteNote = (id: string) => {
    console.log("deleteNote", id);
    setNotes(notes.filter((note) => note.noteId !== id));
  };

  // useEffect(() => {
  //   console.log("notes: ", notes);
  // }, [notes]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Header
        navigation={navigation}
        text={t("notes")}
        isBack={false}
        isThree={true}
        leftSection={
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            activeOpacity={0.8}
            onPress={() => {
              openSidebar();
            }}
          >
            <Feather name="menu" size={24} color="#279EFF" />
          </TouchableOpacity>
        }
        rightSection={
          <TouchableOpacity onPress={openSidebar} activeOpacity={0.7}>
            {address ? (
              <NoteText
                style={[
                  styles.connectedText,
                  {
                    color: colors.primary,
                  },
                ]}
                weight="600"
              >
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
      <NetworkModal
        visibility={networkModalVisible}
        closeModal={() => {
          setNetworkModalVisible(false);
        }}
        selectNetwork={(network: IApplicableNetwork) => {
          setNetworkModalVisible(false);
        }}
      />

      <View style={{ flex: 1 }}>
        <NativeViewGestureHandler ref={flashlistRef} simultaneousHandlers={panRef}>
          <FlatList
            data={notes}
            scrollEnabled={true}
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingTop: 12,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <SecretItem
                // onPress={() => setSelectedNoteId(item.id)}
                id={item.noteId}
                title={item.noteTitle}
                content={item.noteContent}
                date={item.noteDate}
                priority={item.notePriority}
                onDelete={deleteNote}
                key={item.noteId}
                simultaneousHandler={flashlistRef}
                panRef={panRef}
              />
            )}
            keyExtractor={(item) => item.noteId}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 0,
                  backgroundColor: "#ddd",
                  marginVertical: 0,
                }}
              />
            )}
            extraData={selectedNoteId}
            refreshControl={<RefreshControl refreshing={refreshingNotes} onRefresh={onRefreshNotes} />}
            refreshing={refreshingNotes}
            // estimatedItemSize={4}
          />
        </NativeViewGestureHandler>
      </View>

      <NoteButton
        onPress={handleSheetPress}
        style={{
          position: "absolute",
          bottom: 48,
          right: 32,
          borderWidth: 0,
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Octicons name="plus" size={26} color="#fff" />
      </NoteButton>

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
          backgroundColor: themeValue === "light" ? "#000" : "#fff",
        }}
        handleStyle={{
          backgroundColor: themeValue === "light" ? "#fff" : "#61677A",
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        }}
      >
        <View
          style={[
            styles.bottomsheetInnerContainer,
            {
              backgroundColor: colors.sheetBg,
              paddingBottom: dynamicPaddingBottom(),
            },
          ]}
        >
          <View
            style={{
              flexDirection: "column",
              marginBottom: 2,
            }}
          >
            <BottomSheetTextInput
              // @ts-ignore
              ref={textInputRef as RefObject<TextInput>}
              value={note.noteTitle}
              onChangeText={(text) => setNote({ ...note, noteTitle: text })}
              placeholder="Title"
              maxLength={36}
              selectionColor={colors.inputSelection}
              placeholderTextColor={colors.inputPlaceholder}
              style={styles.bottomSheetTitleInput}
            />
            <BottomSheetTextInput
              defaultValue={note.noteContent}
              onChangeText={(text) => setNote({ ...note, noteContent: text })}
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
                <SimpleLineIcons name="graph" size={22} color={getNotePriorityIconColor()} />
                <NoteText style={[{ color: getNotePriorityTextColor() }]} weight="800">
                  {getNotePriorityName()}
                </NoteText>
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: styles.menuOptionsContainer,
                }}
              >
                <MenuOption
                  onSelect={() =>
                    setNote({
                      ...note,
                      notePriority: 0,
                    })
                  }
                  customStyles={{
                    optionWrapper: styles.menuOptionWrapper,
                  }}
                >
                  <NoteText
                    style={{
                      color: colors.none,
                    }}
                  >
                    {t("none")}
                  </NoteText>
                  <SimpleLineIcons name="graph" size={22} color={colors.none} />
                </MenuOption>
                <MenuOption
                  onSelect={() =>
                    setNote({
                      ...note,
                      notePriority: 1,
                    })
                  }
                  customStyles={{
                    optionWrapper: styles.menuOptionWrapper,
                  }}
                >
                  <NoteText
                    style={{
                      color: colors.normal,
                    }}
                  >
                    {t("normal")}
                  </NoteText>
                  <SimpleLineIcons name="graph" size={22} color={colors.normal} />
                </MenuOption>
                <MenuOption
                  onSelect={() =>
                    setNote({
                      ...note,
                      notePriority: 2,
                    })
                  }
                  customStyles={{
                    optionWrapper: styles.menuOptionWrapper,
                  }}
                >
                  <NoteText
                    style={{
                      color: colors.medium,
                    }}
                  >
                    {t("medium")}
                  </NoteText>
                  <SimpleLineIcons name="graph" size={22} color={colors.medium} />
                </MenuOption>
                <MenuOption
                  onSelect={() =>
                    setNote({
                      ...note,
                      notePriority: 3,
                    })
                  }
                  customStyles={{
                    optionWrapper: styles.menuOptionWrapper,
                  }}
                >
                  <NoteText style={{ color: colors.urgent }}>{t("urgent")}</NoteText>
                  <SimpleLineIcons name="graph" size={22} color={colors.urgent} />
                </MenuOption>
              </MenuOptions>
            </Menu>

            <NoteButton
              style={styles.sendButton}
              onPress={() => {
                addNoteToChain();
              }}
            >
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
    borderColor: "#ddd",
    flexDirection: "row",
    gap: 6,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
  },
  menuOptionsContainer: {
    marginTop: Platform.OS === "ios" ? -180 : -130,
    borderRadius: 6,
    shadowColor: "#000",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bottomsheetInnerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  sheetModalBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontFamily: "SourceCodePro-Regular",
  },
  bottomSheetDescriptionInput: {
    paddingHorizontal: 4,
    paddingVertical: 16,
    fontSize: 18,
    height: Platform.OS === "ios" ? 90 : "auto",
    textAlignVertical: "top",
    fontFamily: "SourceCodePro-Regular",
  },
  profileMain: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  connectedText: {
    fontSize: 15,
  },
  notConnectedText: {
    fontSize: 15,
  },
});
