import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";

export default function TabLayout() {
    const router = useRouter();
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "#7C3AED" }}>
            <Tabs.Screen name="index" options={{
                title: "Courses",
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="book" size={22} color={color} />
                ),
                headerRight: () => (
                    <Pressable onPress={() => router.push("/add-course")} style={{ marginRight: 16 }}>
                        <FontAwesome name="plus" size={22} color="#7C3AED" />
                    </Pressable>
                ),
            }} />
            <Tabs.Screen name="saved" options={{
                title: "Saved",
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="star" size={22} color={color} />
                ),
            }} />
            <Tabs.Screen name="about" options={{
                title: "About",
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="info-circle" size={22} color={color} />
                ),
            }} />
            <Tabs.Screen name="settings" options={{
                title: "Settings",
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="cog" size={22} color={color} />
                ),
            }} />
        </Tabs>
    );
}
