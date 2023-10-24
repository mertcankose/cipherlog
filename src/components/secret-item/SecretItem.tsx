import { FC, PureComponent, useEffect } from "react";
import { TouchableOpacity, TouchableOpacityProps, View, StyleSheet, Dimensions } from "react-native";
import NoteText from "@components/text/NoteText";
import { useTheme } from "@react-navigation/native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  ReduceMotion,
  useAnimatedRef,
  measure,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";

interface ISecretItem {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: number;
  style?: any;
  onDelete?: (id: string) => void;
  simultaneousHandler?: any;
  panRef?: any;
}

const ScreenWidth = Dimensions.get("window").width;
const TranslateXThreshold = -ScreenWidth * 0.4; // 40% of the screen width

const SecretItem: FC<ISecretItem> = ({ id, title, content, date, style, panRef, simultaneousHandler, onDelete = () => {}, ...props }) => {
  const { colors } = useTheme();

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(undefined);
  const marginVertical = useSharedValue(8);
  const containerOpacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TranslateXThreshold; // ekranın %40 undan fazla bir kaydırma varsa öğeyi sil
      if (shouldBeDismissed) {
        (translateX.value = -ScreenWidth),
          {
            duration: 200,
            easing: Easing.linear,
          };

        // @ts-ignore
        itemHeight.value = 0;
        marginVertical.value = 0;
        containerOpacity.value = withTiming(
          0,
          {
            duration: 200,
            easing: Easing.linear,
          },
          (isFinished) => {
            if (isFinished && onDelete) runOnJS(onDelete)(id);
          }
        );
      } else {
        translateX.value = 0;
      }
    },
  });

  const animatedContainerStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    height: withTiming(itemHeight.value, {
      duration: 200,
      easing: Easing.out(Easing.exp),
    }),
    marginVertical: withTiming(marginVertical.value, {
      duration: 200,
      easing: Easing.out(Easing.exp),
    }),
    opacity: withTiming(containerOpacity.value, {
      duration: 200,
      easing: Easing.out(Easing.exp),
    }),
  }));

  const animatedItemStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translateX.value, {
          mass: 1,
          stiffness: 120,
          damping: 10,
        }),
      },
    ],
  }));

  const animatedIconContainerStyles = useAnimatedStyle(() => ({
    opacity: withTiming(translateX.value < TranslateXThreshold + 80 ? 1 : 0, {
      duration: 140,
      easing: Easing.linear,
    }),
    width: withTiming(translateX.value < TranslateXThreshold + 80 ? 60 : 0, {
      duration: 240,
      easing: Easing.linear,
    }),
  }));

  return (
    <Animated.View style={[styles.container, style, animatedContainerStyle]} {...props}>
      <PanGestureHandler onGestureEvent={panGesture} ref={panRef} simultaneousHandlers={simultaneousHandler}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              backgroundColor: colors.noteItem,
            },
            animatedItemStyles,
          ]}
        >
          <NoteText style={styles.titleText} weight="700">
            {title}
          </NoteText>
          <NoteText style={styles.contentText}>{content}</NoteText>
          <NoteText style={styles.dateText}>{date}</NoteText>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            backgroundColor: colors.trashBg,
          },
          animatedIconContainerStyles,
        ]}
      >
        <Feather name="trash" size={24} color="#fff" />
      </Animated.View>
    </Animated.View>
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
    color: "black",
    fontSize: 18,
    fontWeight: "700",
  },
  contentText: {
    marginTop: 2,
    marginBottom: 8,
    fontSize: 14,
    color: "gray",
  },
  dateText: {
    fontSize: 12,
  },
  iconContainer: {
    height: "100%",
    width: 60,
    position: "absolute",
    right: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    zIndex: -10,
    elevation: -10,
  },
});

export default SecretItem;
