// Sign Up screen — react-hook-form + Input component.

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

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useContext(AuthContext);
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { email: "", password: "", confirm: "" },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setBusy(true);
    setServerError(null);
    try {
      await signUp(data.email, data.password);
      setSuccess(true);
    } catch (e) {
      setServerError(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (success) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={styles.heading}>Check your email</Text>
        <Text style={styles.subtitle}>We sent a confirmation link</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back to Sign In</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#EEF1F4" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.screen}
      >
        <Text style={styles.heading}>Sign Up</Text>
        <Text style={styles.subtitle}>Create a new account</Text>

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
              placeholder="you@example.com"
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
              placeholder="At least 6 characters"
              secureTextEntry
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="confirm"
          rules={{
            required: "Confirm your password",
            validate: (val) => val === password || "Passwords do not match",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Confirm Password"
              required
              value={value}
              onChangeText={onChange}
              error={error?.message}
              placeholder="Type password again"
              secureTextEntry
              autoCapitalize="none"
            />
          )}
        />

        <Pressable
          style={[styles.button, busy && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={busy}
        >
          <Text style={styles.buttonText}>{busy ? "Creating account..." : "Sign Up"}</Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Already have an account? Sign In</Text>
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
