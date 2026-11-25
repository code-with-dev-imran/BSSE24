import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack } from "expo-router";
import { SavedProvider } from "../context/SavedContext";
import { AuthContext, AuthProvider } from "../context/AuthContext";

function RootStack() {
  const { user, checking } = useContext(AuthContext);

  // Reading the stored session takes a moment. Without this the
  // sign in screen flashes for someone who is already signed in.
  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{headerStyle: {backgroundColor: "#000"},
        headerTintColor: "#fff",
    headerShown: false
    }} >
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" options={{ headerShown: true, title: "Profile" }} />
        <Stack.Screen name="course/[id]" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/sign-up" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SavedProvider>
        <RootStack />
      </SavedProvider>
    </AuthProvider>
  );
}
