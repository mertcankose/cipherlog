import {FC, useContext} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import TodoText from '@components/text/TodoText';
import {ThemeContext} from '@contexts/Theme';
import {useTheme} from '@react-navigation/native';

interface ITodoButtonProps extends TouchableOpacityProps {
  style?: any;
  children: any;
}

const TodoButton: FC<ITodoButtonProps> = ({style, children, ...props}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: colors.primary,
        },
        style,
      ]}
      {...props}>
      <TodoText>{children}</TodoText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TodoButton;
