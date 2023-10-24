import React, { FC, useContext } from "react";
import { View, StyleSheet } from "react-native";
import NoteText from "@components/text/NoteText";
import { addressPrettier } from "@helpers/address-prettier";
import { balancePrettier } from "@helpers/balance-prettier";
import { useTranslation } from "react-i18next";

interface IProfileInfo {
  style?: any;
  textStyle?: any;
}

const ProfileInfo: FC<IProfileInfo> = ({ style, textStyle, ...props }) => {
  const address = "adasd";
  const balance = 2;

  const { t } = useTranslation();

  return (
    <View style={[styles.container, style]} {...props}>
      <NoteText style={[styles.addressText, textStyle]}>{addressPrettier(address)}</NoteText>

      <View style={styles.balanceContainer}>
        <NoteText style={styles.labelText}>{t("balance")}: </NoteText>
        <NoteText style={[styles.balanceText, textStyle]} weight="700">
          {balancePrettier(balance)} ETH
        </NoteText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  addressText: {
    marginBottom: 1,
  },
  balanceContainer: {
    flexDirection: "row",
  },
  labelText: {
    fontSize: 12,
  },
  balanceText: {
    fontSize: 12,
  },
});

export default ProfileInfo;
