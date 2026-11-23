import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { SavedContext } from "../../context/SavedContext";

const ITEMS = [
  { title: "Profile", icon: "user", path: "/profile" },
  { title: "Notifications", icon: "bell" },
  { title: "Language", icon: "globe" },
  { title: "Help", icon: "question-circle" },
];

export default function Settings() {
  const router = useRouter();
  const { user, signOut } = useContext(AuthContext);
  const { clear } = useContext(SavedContext);

  async function onSignOut() {
    clear();
    await signOut();
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Signed in as</Text>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.body}>{user?.email}</Text>
      </View>

      {ITEMS.map((item) => (
        <Pressable
          key={item.title}
          style={styles.row}
          onPress={() => item.path && router.push(item.path)}
        >
          <FontAwesome name={item.icon} size={20} color="#7C3AED" style={styles.icon} />
          <Text style={styles.rowText}>{item.title}</Text>
          <FontAwesome name="angle-right" size={22} color="#9AA3AE" />
        </Pressable>
      ))}

      <Pressable style={styles.button} onPress={onSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#EEF1F4", padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  body: { fontSize: 15, color: "#6B7684" },
  card: { backgroundColor: "#FFFFFF", borderRadius: 10, padding: 16, marginBottom: 16 },
  label: { fontSize: 12, color: "#6B7684" },
  name: { fontSize: 18, fontWeight: "700", color: "#1B2027" },
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
  button: {
    backgroundColor: "#D93025",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
