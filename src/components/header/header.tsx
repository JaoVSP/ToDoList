import { Colors } from "@/constants/theme";

import {
  View,
  StyleSheet,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import { MenuButton } from "./menu/menu-button";

interface IHeaderProps {
  children: React.ReactNode;
  isMenuHidden: boolean;
  menuStyles?: StyleProp<ViewStyle>;
}

export function Header({ children, isMenuHidden, menuStyles }: IHeaderProps) {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[{ width: width, height: height * 0.1 }, styles.container]}>
      <View style={menuStyles}>
        {children}
        <MenuButton isMenuHidden={isMenuHidden} />
      </View>
      <View style={[{ width: width }, styles.stripe]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: Colors.dark.secondaryBackground,
    zIndex: 2,
  },
  text: {
    color: "#fff",
    fontSize: 23,
  },
  stripe: {
    height: 1,
    marginTop: 10,
    backgroundColor: Colors.dark.dodgerBlue,
  },
});
