import TodoText from '@components/text/TodoText';
import {useTheme} from '@react-navigation/native';
import {FC, ReactNode} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleSheet,
} from 'react-native';

interface IAccount extends TouchableOpacityProps {
  itemIcon: ReactNode;
  itemName: string;
  rightText?: string;
  rightIcon: ReactNode;
  className?: string;
  className2?: string;
  style?: any;
  style2?: any;
}

const AccountItem: FC<IAccount> = ({
  itemIcon,
  itemName,
  rightText,
  rightIcon,
  className,
  className2,
  style,
  style2,
  ...props
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.accountItemButton,
        {
          backgroundColor: colors.accountItem,
        },
        style,
      ]}
      activeOpacity={0.7}
      {...props}>
      <View style={{width: 40}}>{itemIcon}</View>

      <View style={styles.accountItemInside}>
        <TodoText style={[styles.accountTitle, {color: colors.text}]}>
          {itemName}
        </TodoText>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TodoText style={[styles.rightText, {color: colors.pale}]}>
            {rightText}
          </TodoText>
          {rightIcon}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  accountItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
  },
  accountItemInside: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountTitle: {
    fontSize: 18,
    color: '#000',
  },
  rightText: {
    color: 'gray',
    marginRight: 10,
  },
});

export default AccountItem;
