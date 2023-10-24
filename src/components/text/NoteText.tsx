import { FC } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface INoteTextProps extends TextProps {
  children: any;
  weight?: "200" | "300" | "400" | "500" | "600" | "700" | "800";
  style?: any;
}

const NoteText: FC<INoteTextProps> = ({ children, style, weight = "400", ...props }) => {
  const getFontWeight = () => {
    switch (weight) {
      case "200":
        return { fontFamily: "SourceCodePro-ExtraLight" };
      case "300":
        return { fontFamily: "SourceCodePro-Light" };
      case "400":
        return { fontFamily: "SourceCodePro-Regular" };
      case "500":
        return { fontFamily: "SourceCodePro-Medium" };
      case "600":
        return { fontFamily: "SourceCodePro-SemiBold" };
      case "700":
        return { fontFamily: "SourceCodePro-Bold" };
      case "800":
        return { fontFamily: "SourceCodePro-ExtraBold" };
      default:
        return { fontFamily: "SourceCodePro-Regular" };
    }
  };

  return (
    <Text style={[styles.text, getFontWeight(), style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "SourceCodePro-Regular",
    color: "black",
    fontSize: 16,
    lineHeight: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoteText;
