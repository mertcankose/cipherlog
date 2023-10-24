import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import NoteText from "@components/text/NoteText";
import { networkNamePrettier } from "@helpers/network-name-prettier";

interface INetworkItemProps extends TouchableOpacityProps {
  style?: any;
  network: IApplicableNetwork;
  pressNetwork?: (network: IApplicableNetwork) => void;
  textStyle?: any;
}

const NetworkItem: FC<INetworkItemProps> = ({ network, pressNetwork = () => {}, style, textStyle, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        pressNetwork(network);
      }}
      style={[styles.container, style]}
      {...props}
    >
      <NoteText style={[styles.text, textStyle]}>
        {/* {networkNamePrettier(network.networkName, 20)} */}
        {network.networkName}
      </NoteText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add your TouchableOpacity styles here
  },
  text: {
    color: "black",
    // Add your NoteText styles here
  },
});

export default NetworkItem;
