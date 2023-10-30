import {FC} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface ILoading {
  style?: any;
}

const Loading: FC<ILoading> = ({style, ...props}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.loading]} {...props}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    bottom: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
    opacity: 0.8,
    elevation: 9999999,
    zIndex: 999999999,
  },
});

export default Loading;
