import React, {FC} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleSheet,
} from 'react-native';
import TodoText from '@components/text/TodoText';

interface ISecretItem extends TouchableOpacityProps {
  id: string;
  title: string;
  content: string;
  date: string;
}

const SecretItem: FC<ISecretItem> = ({
  id,
  title,
  content,
  date,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      {...props}
      activeOpacity={0.8}>
      <TodoText style={styles.titleText} weight="700">
        {title}
      </TodoText>
      <TodoText style={styles.contentText}>{content}</TodoText>
      <TodoText style={styles.dateText}>{date}</TodoText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray', // for light mode
    // or dark mode border color
    // borderColor: 'gray',
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  titleText: {
    color: 'black', // for light mode
    // or dark mode text color
    // color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  contentText: {
    marginTop: 2,
    marginBottom: 8,
    fontSize: 14,
    color: 'gray', // for light mode
    // or dark mode text color
    // color: 'white',
  },
  dateText: {
    fontSize: 12,
  },
});

export default SecretItem;
