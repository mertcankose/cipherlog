import React, {FC} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import TodoText from '@components/text/TodoText';
import {networkNamePrettier} from '@helpers/network-name-prettier';

interface INetworkItemProps extends TouchableOpacityProps {
  style?: any;
  network: IApplicableNetwork;
  pressNetwork?: (network: IApplicableNetwork) => void;
  textStyle?: any;
}

const NetworkItem: FC<INetworkItemProps> = ({
  network,
  pressNetwork = () => {},
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        pressNetwork(network);
      }}
      style={[styles.container, style]}
      {...props}>
      <TodoText style={[styles.text, textStyle]}>
        {/* {networkNamePrettier(network.networkName, 20)} */}
        {network.networkName}
      </TodoText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add your TouchableOpacity styles here
  },
  text: {
    color: 'black',
    // Add your TodoText styles here
  },
});

export default NetworkItem;
