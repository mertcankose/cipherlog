import { FC, useContext } from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import NoteText from "@components/text/NoteText";

import { useTranslation } from "react-i18next";
import { networkNamePrettier } from "@helpers/network-name-prettier";

interface INetworkSwticherButton extends TouchableOpacityProps {
  style?: any;
  openModal: () => void;
}

const NetworkSwitcherButton: FC<INetworkSwticherButton> = ({ style, openModal = () => {}, ...props }) => {
  const { t } = useTranslation();

  const getActiveNetworkName = () => {
    // if (isConnected) {
    //   if (activeNetwork.networkName !== undefined) {
    //     return networkNamePrettier(activeNetwork.networkName, 11);
    //   }
    //   return t('invalidNetwork');
    // } else {
    //   return t('notConnected');
    // }
  };

  const handlePress = () => {
    // if (isConnected) {
    //   openModal();
    // } else {
    //   connectWallet();
    // }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.button,
        // isConnected ? styles.connectedButton : styles.disconnectedButton,
        style,
      ]}
      {...props}
    >
      <NoteText style={styles.text} weight="600">
        {getActiveNetworkName()}
      </NoteText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  connectedButton: {
    backgroundColor: "primary", // Replace 'primary' with your actual primary color
  },
  disconnectedButton: {
    backgroundColor: "red",
  },
  text: {
    color: "white",
    fontSize: 12,
  },
});

export default NetworkSwitcherButton;
