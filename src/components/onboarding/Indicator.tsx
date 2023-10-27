import NoteText from '@components/text/NoteText';
import {GeneralContext} from '@contexts/General';
import {useContext} from 'react';
import {StyleSheet, View, Animated, Dimensions, TouchableOpacity} from 'react-native';

const {width} = Dimensions.get('screen');

const Indicator = ({data, scrollx}) => {
  const {skipOnboarding} = useContext(GeneralContext);

  return (
    <View style={styles.indicatorContainer}>
      <View style={styles.dotContainer}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width]; // previous, current, next
          const scale = scrollx.interpolate({
            inputRange: inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });
          const dotWidth = scrollx.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          const opacity = scrollx.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return <Animated.View key={`indicator-${i}`} style={[styles.dot, {width: dotWidth, opacity, transform: [{scale}]}]} />;
        })}
      </View>
      <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
        <NoteText style={styles.skipButtonText}>SKIP</NoteText>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={[styles.button, styles.nextButton]}
        onPress={() => {
          console.log('next button pressed');
        }}>
        <NoteText style={[styles.buttonText, styles.nextButtonText]}>İleri</NoteText>
      </TouchableOpacity> */}
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 8,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  skipButton: {
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
  nextButton: {},
  nextButtonText: {
    color: '#000',
  },
});
