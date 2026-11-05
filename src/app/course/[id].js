import { StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

const courses = {
  c1: { code: "CS-201", title: "Data Structures", credits: 3, semester: 3, instructor: "Dr. Ahmed", description: "Arrays, linked lists, stacks, queues, trees, graphs and sorting algorithms." },
  c2: { code: "CS-210", title: "Databases", credits: 3, semester: 4, instructor: "Dr. Fatima", description: "ER models, relational algebra, SQL, normalization and transaction management." },
  c3: { code: "SE-301", title: "Software Design", credits: 3, semester: 5, instructor: "Dr. Hassan", description: "Design patterns, SOLID principles, UML diagrams and architecture styles." },
};

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const course = courses[id];

  if (!course) {
    return (
      <View style={styles.screen}>
        <Text style={styles.body}>No course with the id {id}.</Text>
      </View>
    );
  }

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
  title: { fontSize: 24, fontWeight: "700", color: "#1B2027", marginBottom: 4 },
  code: { fontSize: 14, color: "#6B7684", marginBottom: 16 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 10, padding: 16, marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#E0E0E0" },
  label: { fontSize: 15, color: "#6B7684" },
  value: { fontSize: 15, fontWeight: "600", color: "#1B2027" },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1B2027", marginBottom: 8 },
  body: { fontSize: 15, color: "#4A535F", lineHeight: 22 },
});
