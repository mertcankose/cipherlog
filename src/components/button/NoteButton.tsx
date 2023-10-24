import { FC, useContext } from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import NoteText from "@components/text/NoteText";
import { ThemeContext } from "@contexts/Theme";
import { useTheme } from "@react-navigation/native";

interface INoteButtonProps extends TouchableOpacityProps {
  style?: any;
  children: any;
}

const NoteButton: FC<INoteButtonProps> = ({ style, children, ...props }) => {
  const { colors } = useTheme();

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
      {...props}
    >
      <NoteText>{children}</NoteText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoteButton;
