import {FC, Fragment} from 'react';
import {TouchableOpacity, View, StyleSheet, ScrollView, Linking} from 'react-native';
import {Header, NoteButton, NoteStatusBar, NoteText} from '@components';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

interface IAccount {
  navigation: any;
}

const Account: FC<IAccount> = ({navigation}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const openSidebar = () => {
    navigation.openDrawer();
  };

  const handleContact = async () => {
    let url = 'https://www.linkedin.com/in/mertcankose-/';
    await Linking.openURL(url);
  };

  return (
    <Fragment>
      <NoteStatusBar />

      <View style={[styles.aboutContainer, {backgroundColor: colors.background}]}>
        <Header
          navigation={navigation}
          text={t('about')}
          isBack={false}
          leftSection={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                openSidebar();
              }}>
              <Feather name="menu" size={24} color="#279EFF" />
            </TouchableOpacity>
          }
        />

        <ScrollView
          style={styles.innerContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 4,
            paddingBottom: 36,
            paddingHorizontal: 20,
          }}>
          <NoteText style={{marginBottom: 12}}>{t('appDescription')}</NoteText>
          <NoteText style={{marginBottom: 16}}>{t('securityFeature')}</NoteText>
          <NoteText style={{fontSize: 18, marginBottom: 8}} weight="700">
            {t('highlightedFeatures')}
          </NoteText>
          <NoteText style={styles.highlightedItem}>{t('minimalistDesign')}</NoteText>
          <NoteText style={styles.highlightedItem}>{t('quickNoteTaking')}</NoteText>
          <NoteText style={styles.highlightedItem}>{t('enhancedSecurity')}</NoteText>
          <NoteText style={styles.highlightedItem}>{t('keepTrackOfNotes')}</NoteText>
          <NoteText style={styles.highlightedItem}>{t('downloadCipherlog')}</NoteText>

          <NoteButton style={styles.contactButton} onPress={handleContact}>
            <NoteText style={[styles.contactText, {color: colors.contactText}]} weight="600">
              {t('contact')}
            </NoteText>
          </NoteButton>
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default Account;

const styles = StyleSheet.create({
  aboutContainer: {
    flex: 1,
  },
  innerContainer: {
    marginTop: 12,
  },
  highlightedItem: {
    marginBottom: 6,
  },
  contactButton: {
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 20,
  },
  contactText: {},
});
