// Sign In screen — react-hook-form + Input component for validation.
// Error says "Email or password is wrong" — never say which one.

import { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import Input from "../../components/Input";
import { AuthContext } from "../../context/AuthContext";

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);
    try {
      await signIn(data.email, data.password);
    } catch (e) {
      setServerError("Email or password is wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#EEF1F4" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.screen}
      >
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.subtitle}>Welcome back</Text>

        {serverError && <Text style={styles.serverError}>{serverError}</Text>}

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Email"
              required
              value={value}
              onChangeText={onChange}
              error={error?.message}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Password"
              required
              value={value}
              onChangeText={onChange}
              error={error?.message}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
            />
          )}
        />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Signing in..." : "Sign In"}</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/(auth)/sign-up")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 16, paddingTop: 80 },
  heading: { fontSize: 28, fontWeight: "700", color: "#1B2027" },
  subtitle: { fontSize: 16, color: "#6B7684", marginBottom: 24 },
  serverError: {
    backgroundColor: "#FDECEA",
    color: "#E53935",
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#7C3AED",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  link: { color: "#7C3AED", fontSize: 14, textAlign: "center", marginTop: 16 },
});
