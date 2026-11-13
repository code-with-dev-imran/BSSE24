import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {useFetch} from "../../hooks/useFetch";

const API_URL = "https://raw.githubusercontent.com/code-with-dev-imran/BSSE24/main/api/courses.json";

export default function Courses() {
  const router = useRouter();
  const {loading, error, data} = useFetch(API_URL);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error) return <Text style={styles.msg}>{error}</Text>;
  if (data.length === 0) return <Text style={styles.msg}>Nothing here yet.</Text>;

  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
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
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#EEF1F4", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  msg: { flex: 1, textAlign: "center", marginTop: 40, fontSize: 15, color: "#6B7684" },
  row: { backgroundColor: "#FFFFFF", padding: 16, borderRadius: 10 },
  code: { fontSize: 12, color: "#6B7684" },
  title: { fontSize: 17, fontWeight: "700", color: "#1B2027" },
  gap: { height: 10 },
});
