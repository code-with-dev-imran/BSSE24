import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "#18A999" }}>
            <Tabs.Screen name="index" options={{
                title: "Courses",
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="book" size={22} color={color} />
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
