import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

const courses = [
  { id: "c1", code: "CS-201", title: "Data Structures" },
  { id: "c2", code: "CS-210", title: "Databases" },
  { id: "c3", code: "SE-301", title: "Software Design" },
];

export default function Home() {
  const router = useRouter();

  const onPress =(id)=>{
    router.push({
      pathname: '/course/[id]',
      params : {
        id: id,
        text: "hello",
        num: 1,
        arr: [1,2,3,4],
        obj: {name : "Imran"}
      }
    })
  }

   
  return (
    <View style={styles.screen}>
      <FlatList
        data={courses}
        keyExtractor={(course) => course.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => onPress(item.id)}
          >
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </Pressable>
        )}
      />

      <Link href="/about" style={styles.link}>
        About this app
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  row: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#FFFFFF"
  },
  code: { fontSize: 12, color: "#6B7684" },
  title: { fontSize: 17, fontWeight: "700" },
  link: { color: "#1B6AC6", fontSize: 15 },
});
