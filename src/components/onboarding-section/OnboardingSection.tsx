import {useContext, useRef} from 'react';
import {StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, Linking} from 'react-native';
import Backdrop from './Backdrop';
import Indicator from './Indicator';
import Square from './Square';
import {data} from '@helpers/onboarding-helper';
import {ThemeContext} from '@contexts/Theme';
import {useTheme} from '@react-navigation/native';
import NoteText from '@components/text/NoteText';
import {useTranslation} from 'react-i18next';
import NoteButton from '@components/button/NoteButton';

const {width, height} = Dimensions.get('screen');

const OnboardingSection = ({navigation}) => {
  const {themeValue} = useContext(ThemeContext);
  const {colors} = useTheme();
  const {t} = useTranslation();

  const scrollx = useRef(new Animated.Value(0)).current;

  const handlePrivacyButton = async () => {
    let url = 'https://mertcankose.com/chainlog-privacy-policy.html';
    await Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={themeValue === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      <Backdrop scrollx={scrollx} />
      <Square scrollx={scrollx} />

      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollx}}}], {useNativeDriver: false})}
        contentContainerStyle={styles.animatedFlatListContainer}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item}) => {
          return (
            <View style={styles.flatListItem}>
              <View style={styles.flatListItemInside}>
                <Image
                  source={{uri: Image.resolveAssetSource(item.image).uri}}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={styles.flatListItemTextContainer}>
                <NoteText style={styles.itemTitle} weight="700">
                  {t(item.title)}
                </NoteText>
                <NoteText style={styles.itemDescription}>{t(item.description)}</NoteText>
                {item.key == '3571603' && (
                  <NoteButton onPress={handlePrivacyButton} style={styles.privacyButton}>
                    <NoteText style={styles.privacyPolicyText} weight="700">
                      {t('privacyPolicy')}
                    </NoteText>
                  </NoteButton>
                )}
              </View>
            </View>
          );
        }}
      />
      <Indicator navigation={navigation} scrollx={scrollx} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 100,
    elevation: 100,
    paddingHorizontal: 22,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  skipButtonText: {
    fontWeight: '600',
    letterSpacing: 1,
  },
  animatedFlatListContainer: {
    paddingBottom: 100,
  },
  flatListItem: {
    width: width,
    alignItems: 'center',
    padding: 20,
  },
  flatListItemInside: {
    flex: 0.7,
    justifyContent: 'center',
  },
  flatListItemTextContainer: {
    flex: 0.35,
  },
  itemTitle: {
    fontSize: 26,
    paddingTop: 18,
    color: '#fff',
    elevation: 100,
    zIndex: 100,
    marginBottom: 8,
    lineHeight: 34,
  },
  itemDescription: {
    color: '#fff',
    fontSize: 15,
  },
  privacyPolicyText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  privacyButton: {
    backgroundColor: 'transparent',
    marginRight: 'auto',
    marginTop: 10,
  },
});

export default OnboardingSection;

/*
// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

*/
