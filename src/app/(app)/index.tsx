import { Header } from "@/components/header/header";
import { Menu } from "@/components/header/menu/modal/menu";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import { View, StyleSheet, useWindowDimensions, Text } from "react-native";
import { MenuModalProvider } from "@/components/header/menu/hook/use-menu-modal";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.calendar}>
      <MenuModalProvider>
        <Header
          isMenuHidden={false}
          menuStyles={[{ width: width * 0.7 }, styles.menuContainer]}
        >
          <Text style={styles.title}>Calendar</Text>
        </Header>
        <Menu />
        <Calendar
          style={{ width: width * 0.96 }}
          theme={{
            calendarBackground: Colors.dark.background,
            textSectionTitleColor: Colors.dark.text,
            monthTextColor: Colors.dark.text,
            todayTextColor: "#fff",
            arrowColor: Colors.dark.dodgerBlue,
            todayBackgroundColor: Colors.dark.dodgerBlue,
            dayTextColor: Colors.dark.secondaryText,
            textDisabledColor: Colors.dark.darkShadow,
          }}
          onDayPress={(date) => {
            router.push({
              pathname: `../[date]/list`,
              params: { date: date.dateString },
            });
          }}
        />
      </MenuModalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  title: {
    color: "white",
    fontSize: 25,
  },
  menuContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
