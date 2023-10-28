import {FC, useContext, useEffect} from 'react';
import {TouchableOpacity, TouchableOpacityProps, StyleSheet, Dimensions, View} from 'react-native';
import NoteText from '@components/text/NoteText';
import {useTheme} from '@react-navigation/native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  runOnJS,
  useDerivedValue,
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {getNotePriorityColor, priorityPrettier} from '@helpers/priority-control';
import {ThemeContext} from '@contexts/Theme';

interface ISecretItem extends TouchableOpacityProps {
  id: string;
  title: string;
  content: string;
  priority: number;
  createdAt: number;
  updatedAt: number;
  style?: any;
  onDelete?: (id: string) => void;
  simultaneousHandler?: any;
  panRef?: any;
  triggeredSecretItem: boolean;
}

const ScreenWidth = Dimensions.get('window').width;
const TranslateXThreshold = -ScreenWidth * 0.4; // 40% of the screen width

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const SecretItem: FC<ISecretItem> = ({
  id,
  title,
  content,
  createdAt,
  updatedAt,
  priority,
  style,
  panRef,
  simultaneousHandler,
  triggeredSecretItem,
  onDelete = () => {},
  ...props
}) => {
  useEffect(() => {
    console.log('triggered');
  }, []);

  console.log('triggered2: ', triggeredSecretItem);

  const {colors} = useTheme();
  const {themeValue} = useContext(ThemeContext);

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(undefined);
  const marginVertical = useSharedValue(8);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    if (triggeredSecretItem) {
      // triggered true ise animasyonun başlangıç değerlerine dön
      translateX.value = withTiming(0);
      itemHeight.value = withTiming(undefined);
      marginVertical.value = withTiming(8);
      containerOpacity.value = withTiming(1);
    }
  }, [triggeredSecretItem]);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TranslateXThreshold; // ekranın %40 undan fazla bir kaydırma varsa öğeyi sil
      if (shouldBeDismissed) {
        translateX.value = withTiming(-ScreenWidth);
        // @ts-ignore
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        containerOpacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished && onDelete) runOnJS(onDelete)(id);
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const animatedContainerStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    height: itemHeight.value,
    marginVertical: marginVertical.value,
    opacity: containerOpacity.value,
  }));

  const animatedItemStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const animatedIconContainerStyles = useAnimatedStyle(() => ({
    opacity: withTiming(translateX.value < TranslateXThreshold + 80 ? 1 : 0),
    width: withTiming(translateX.value < TranslateXThreshold + 80 ? 60 : 0),
  }));

  return (
    <AnimatedButton
      style={[styles.container, style, animatedContainerStyle]}
      entering={ZoomIn}
      exiting={ZoomOut}
      {...props}
      activeOpacity={0.7}>
      <PanGestureHandler onGestureEvent={panGesture} ref={panRef} simultaneousHandlers={simultaneousHandler}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              backgroundColor: colors.noteItem,
            },
            animatedItemStyles,
          ]}>
          <NoteText style={styles.titleText} weight="700">
            {title}
          </NoteText>
          <NoteText style={styles.contentText}>{content}</NoteText>
          <View style={styles.itemBottom}>
            <View style={styles.itemTimeContainer}>
              <NoteText style={styles.dateText}>{moment.unix(createdAt).format('HH:mm')}</NoteText>
              <NoteText style={styles.dateText}>{moment.unix(createdAt).format('DD MMMM YYYY')}</NoteText>
            </View>

            <NoteText style={[styles.priorityText, {color: getNotePriorityColor(themeValue, colors, priority)}]} weight="700">
              {priorityPrettier(priority)}
            </NoteText>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            backgroundColor: colors.trashBg,
          },
          animatedIconContainerStyles,
        ]}>
        <Feather name="trash" size={24} color="#fff" />
      </Animated.View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {},
  animatedContainer: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 5,
  },
  titleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
  contentText: {
    marginTop: 2,
    marginBottom: 8,
    fontSize: 14,
    color: 'gray',
  },
  dateText: {
    fontSize: 11,
  },
  iconContainer: {
    height: '100%',
    width: 60,
    position: 'absolute',
    right: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: -10,
    elevation: -10,
  },
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTimeContainer: {
    flexDirection: 'column',
  },
  priorityText: {
    fontSize: 13,
  },
});

export default SecretItem;
