import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { SavedContext } from "../../context/SavedContext";

export default function Saved() {
  const router = useRouter();
  const { saved, toggle } = useContext(SavedContext);

  if (saved.length === 0) return <Text style={styles.msg}>No saved courses yet. Tap a star on the Courses tab.</Text>;

  return (
    <View style={styles.screen}>
      <FlatList
        data={saved}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() =>
              router.push({
                pathname: "/course/[id]",
                params: { id: item.id },
              })
            }
          >
            <View style={styles.info}>
              <Text style={styles.code}>{item.code}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Pressable onPress={() => toggle(item)} hitSlop={10}>
              <FontAwesome name="star" size={22} color="#F5B301" />
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#EEF1F4", padding: 16 },
  msg: { flex: 1, textAlign: "center", marginTop: 40, fontSize: 15, color: "#6B7684" },
  row: { backgroundColor: "#FFFFFF", padding: 16, borderRadius: 10, flexDirection: "row", alignItems: "center" },
  info: { flex: 1 },
  code: { fontSize: 12, color: "#6B7684" },
  title: { fontSize: 17, fontWeight: "700", color: "#1B2027" },
  gap: { height: 10 },
});
