import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ITEMS = [
  { title: "Profile", icon: "user", path: "/profile" },
  { title: "Notifications", icon: "bell" },
  { title: "Language", icon: "globe" },
  { title: "Help", icon: "question-circle" },
];

export default function Settings() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings</Text>

      {ITEMS.map((item) => (
        <Pressable
          key={item.title}
          style={styles.row}
          onPress={() => item.path && router.push(item.path)}
        >
          <FontAwesome name={item.icon} size={20} color="#18A999" style={styles.icon} />
          <Text style={styles.rowText}>{item.title}</Text>
          <FontAwesome name="angle-right" size={22} color="#9AA3AE" />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#EEF1F4", padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  row: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: { width: 30 },
  rowText: { flex: 1, fontSize: 16, color: "#1B2027" },
});
