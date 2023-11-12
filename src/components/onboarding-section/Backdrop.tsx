import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import {bgs} from '@helpers/onboarding-helper';

const {width, height} = Dimensions.get('screen');

const Backdrop = ({scrollx}) => {
  const bg = scrollx.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(bg => bg),
  });

  return <Animated.View style={[styles.backdropContainer, {backgroundColor: bg}]} />;
};

export default Backdrop;

const styles = StyleSheet.create({
  backdropContainer: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    width: width,
    height: height,
  },
});
