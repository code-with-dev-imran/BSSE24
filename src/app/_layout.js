import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerStyle: {backgroundColor: "#000"},
    headerTintColor: "#fff",
    headerShown: false
    }} >
      <Stack.Screen name="(tabs)"  />
      {/* <Stack.Screen name="about" options={{title: "About"}} /> */}
      {/* <Stack.Screen name="course/[id]" options={{title: "Course Details"}} /> */}

    </Stack>

    



  );
}
