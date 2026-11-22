import { Stack } from "expo-router";
import { SavedProvider } from "../context/SavedContext";

export default function RootLayout() {
  return (
    <SavedProvider>
      <Stack screenOptions={{headerStyle: {backgroundColor: "#000"},
      headerTintColor: "#fff",
      headerShown: false
      }} >
        <Stack.Screen name="(tabs)"  />
        <Stack.Screen name="profile" options={{ headerShown: true, title: "Profile" }} />
        {/* <Stack.Screen name="about" options={{title: "About"}} /> */}
        {/* <Stack.Screen name="course/[id]" options={{title: "Course Details"}} /> */}

      </Stack>
    </SavedProvider>
  );
}
