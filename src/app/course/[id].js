import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

const API_URL = "https://raw.githubusercontent.com/code-with-dev-imran/BSSE24/main/api/courses.json";

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Request failed: " + res.status);
        const courses = await res.json();
        const found = courses.find((c) => c.id === id);
        setCourse(found || null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error)
    return (
      <View style={styles.screen}>
        <Text style={styles.body}>{error}</Text>
      </View>
    );
  if (!course)
    return (
      <View style={styles.screen}>
        <Text style={styles.body}>No course found with id {id}.</Text>
      </View>
    );

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: course.code }} />

      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.code}>{course.code}</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Instructor</Text>
          <Text style={styles.value}>{course.instructor}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Semester</Text>
          <Text style={styles.value}>{course.semester}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Credits</Text>
          <Text style={styles.value}>{course.credits}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.body}>{course.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#EEF1F4", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#1B2027", marginBottom: 4 },
  code: { fontSize: 14, color: "#6B7684", marginBottom: 16 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 10, padding: 16, marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#E0E0E0" },
  label: { fontSize: 15, color: "#6B7684" },
  value: { fontSize: 15, fontWeight: "600", color: "#1B2027" },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1B2027", marginBottom: 8 },
  body: { fontSize: 15, color: "#4A535F", lineHeight: 22 },
});
