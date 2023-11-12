import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';

const {width, height} = Dimensions.get('screen');

const Square = ({scrollx}) => {
  const YOLO = Animated.modulo(Animated.divide(Animated.modulo(scrollx, width), new Animated.Value(width)), 1);

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={[
        styles.squareContainer,
        {
          transform: [
            {
              rotate,
            },
            {
              translateX,
            },
          ],
        },
      ]}
    />
  );
};

export default Square;

const styles = StyleSheet.create({
  squareContainer: {
    width: height,
    height: height,
    backgroundColor: '#fff',
    borderRadius: 86,
    position: 'absolute',
    top: -height * 0.65,
    left: -height * 0.3,
  },
});
