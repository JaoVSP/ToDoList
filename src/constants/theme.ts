import { Platform } from "react-native";

export const Colors = {
  dark: {
    text: "#F7F7F7",
    secondaryText: "#D0D0D0",
    background: "#101010",
    secondaryBackground: "#1d1d1d",
    tomatoRed: "#FF6347",
    brightMintGreen: "#00FF7F",
    orangeRed: "#FF4500",
    deepOrange: "#FF8C00",
    dodgerBlue: "#1E90FF",
    darkShadow: "#2C2C2C",
    lightCharcoal: "#343434",
    softShadow: "rgba(0, 0, 0, 0.5)",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
