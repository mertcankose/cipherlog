import {FC, useRef, useMemo, useCallback} from 'react';
import {TouchableOpacity, View, Platform, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '@contexts/Theme';
import {AccountItem, Header, NoteText, WalletProfile} from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {LangContext} from '@contexts/Lang';
import {getLanguage} from '@helpers/language-prettier';
import {themePrettier} from '@helpers/theme-prettier';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CountryFlag from 'react-native-country-flag';
import {langs} from '@constants/langs';
import {Linking} from 'react-native';
import {toastMessage} from '@utils/toast';
import {WalletContext} from '@contexts/Wallet';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {ConnectWallet} from '@thirdweb-dev/react-native';

interface IAccount {
  navigation: any;
}

const Account: FC<IAccount> = ({navigation}) => {
  const {currentLanguage, changeLanguage} = useContext(LangContext);
  const {activeTheme, themeValue, changeTheme} = useContext(ThemeContext);

  const {t} = useTranslation();
  const {colors} = useTheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['20%', '25%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index); // 1, -1
  }, []);

  const openLanguageSheet = () => {
    handlePresentModalPress();
  };

  const renderBackdrop = useCallback(props => <BottomSheetBackdrop opacity={0.1} {...props} />, []);

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (err) {
      toastMessage('error', 'Error', 'Something went wrong');
    }
  };

  const openSidebar = () => {
    navigation.openDrawer();
  };

  return (
    <View style={[styles.accountContainer, {backgroundColor: colors.background}]}>
      <Header
        navigation={navigation}
        text={t('account')}
        isBack={false}
        leftSection={
          <TouchableOpacity
            style={styles.hamburgerMenuButton}
            activeOpacity={0.8}
            onPress={() => {
              openSidebar();
            }}>
            <Feather name="menu" size={24} color="#279EFF" />
          </TouchableOpacity>
        }
      />
      <View style={styles.accountInnerContainer}>
        <WalletProfile style={styles.profileMain} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 4,
            paddingBottom: 24,
            paddingHorizontal: 24,
          }}
          style={{marginTop: 16}}>
          <View style={{flexDirection: 'column', marginTop: 12, gap: 8}}>
            <AccountItem
              itemIcon={<Fontisto name="language" size={23} color={colors.primary} />}
              itemName={t('language')}
              rightText={getLanguage(currentLanguage)}
              rightIcon={<AntDesign name="right" size={22} color="#d1d5db" />}
              onPress={() => {
                openLanguageSheet();
              }}
            />

            {/* theme */}
            <Menu>
              <MenuTrigger>
                <AccountItem
                  disabled
                  itemIcon={<Ionicons name="color-palette-outline" size={24} color="#279EFF" />}
                  itemName={t('theme')}
                  rightText={t(themePrettier(activeTheme))}
                  rightIcon={<Octicons name="multi-select" size={22} color="#d1d5db" />}
                />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: [
                    styles.menuOptionsContainer,
                    {
                      backgroundColor: colors.background,
                    },
                  ],
                }}>
                <MenuOption
                  onSelect={() => {
                    changeTheme('system');
                  }}
                  customStyles={{
                    optionWrapper: [
                      styles.menuOptionWrapper,
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: '#f3f4f6',
                      },
                    ],
                  }}>
                  <NoteText
                    weight="600"
                    style={{
                      color: colors.pale,
                    }}>
                    {t('system')}
                  </NoteText>
                  {/* <SimpleLineIcons name="graph" size={22} color="#6b7280" /> */}
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    changeTheme('light');
                  }}
                  customStyles={{
                    optionWrapper: [
                      styles.menuOptionWrapper,
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: '#f3f4f6',
                      },
                    ],
                  }}>
                  <NoteText weight="600" style={{color: colors.pale}}>
                    {t('light')}
                  </NoteText>
                  {/* <SimpleLineIcons name="graph" size={22} color="#6b7280" /> */}
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    changeTheme('dark');
                  }}
                  customStyles={{
                    optionWrapper: styles.menuOptionWrapper,
                  }}>
                  <NoteText weight="600" style={{color: colors.pale}}>
                    {t('dark')}
                  </NoteText>
                  {/* <SimpleLineIcons name="graph" size={22} color="#6b7280" /> */}
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <View style={{marginTop: 12}}>
            <NoteText
              style={[
                styles.secretText,
                {
                  color: colors.text,
                },
              ]}
              weight="600">
              Cipherlog
            </NoteText>

            <View style={{gap: 10, flexDirection: 'column', marginTop: 8}}>
              <AccountItem
                itemIcon={<SimpleLineIcons name="support" size={23} color="#279EFF" />}
                itemName={t('support')}
                rightIcon={<Feather name="arrow-up-right" size={22} color="#279EFF" />}
                onPress={() => {
                  openLink('https://mertcankose.com');
                }}
              />
              <AccountItem
                itemIcon={<MaterialIcons name="web-asset" size={24} color="#279EFF" />}
                itemName={t('homepage')}
                rightIcon={<Feather name="arrow-up-right" size={22} color="#279EFF" />}
                onPress={() => {
                  openLink('https://mertcankose.com');
                }}
              />
              {/* <AccountItem
                itemIcon={<MaterialIcons name="star-rate" size={23} color="#279EFF" />}
                itemName={t('ratesecret')}
                rightIcon={<Feather name="arrow-up-right" size={22} color="#279EFF" />}
                onPress={() => {
                  openLink('https://mertcankose.com');
                }}
              /> */}
            </View>
          </View>

          <View style={{marginTop: 12}}>
            <NoteText
              style={[
                styles.socialText,
                {
                  color: colors.text,
                },
              ]}
              weight="600">
              {t('social')}
            </NoteText>

            <View style={{gap: 10, flexDirection: 'column', marginTop: 6}}>
              <AccountItem
                itemIcon={<SimpleLineIcons name="social-twitter" size={23} color="#279EFF" />}
                itemName="Twitter"
                rightIcon={<Feather name="arrow-up-right" size={22} color="#279EFF" />}
                onPress={() => {
                  openLink('https://twitter.com/mertcankose_');
                }}
              />
              <AccountItem
                itemIcon={<SimpleLineIcons name="social-instagram" size={23} color="#279EFF" />}
                itemName="Instagram"
                rightIcon={<Feather name="arrow-up-right" size={22} color="#279EFF" />}
                onPress={() => {
                  openLink('https://www.instagram.com/mertcankse_/');
                }}
              />
              {/* <AccountItem
                itemIcon={<SimpleLineIcons name="social-reddit" size={23} color="#279EFF" />}
                itemName="Reddit"
                rightIcon={<Feather name="arrow-up-right" size={22} color="#279EFF" />}
                onPress={() => {
                  openLink('https://reddit.com');
                }}
              /> */}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* language */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          name="AddNoteSheet"
          backdropComponent={renderBackdrop}
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
              styles.languageSheetContainer,
              {
                backgroundColor: colors.sheetBg,
              },
            ]}>
            {langs.map(lang => (
              <TouchableOpacity
                key={lang.i18nCode}
                style={[
                  styles.languageButton,
                  {
                    borderColor: colors.pale,
                  },
                ]}
                onPress={() => {
                  changeLanguage(lang.i18nCode);
                  bottomSheetModalRef.current?.close();
                }}
                activeOpacity={0.8}>
                <NoteText
                  weight="500"
                  style={[
                    styles.languageText,
                    {
                      color: colors.text,
                    },
                  ]}>
                  {lang.text}
                </NoteText>
                <CountryFlag isoCode={lang.isoCode} size={22} style={{borderRadius: 3}} />
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
  },
  accountInnerContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 24,
  },
  hamburgerMenuButton: {},
  secretText: {
    fontSize: 16,
    marginLeft: 2,
  },
  socialText: {
    fontSize: 16,
    marginLeft: 2,
  },
  languageSheetContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 4,
    paddingBottom: Platform.OS === 'ios' ? 4 : 4,
  },
  languageButton: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  languageText: {
    flex: 1,
  },
  profileMain: {
    // flexDirection: 'column',
    justifyContent: 'center',
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
    marginTop: Platform.OS === 'ios' ? 30 : 30,
    marginLeft: Dimensions.get('window').width / 3,
    marginRight: 0,
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
