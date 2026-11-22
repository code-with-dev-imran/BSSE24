import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function Profile() {
  const [form, setForm] = useState({ name: "", email: "", password: "", description: "" });

  const [errors, setErrors] = useState({});

  function update(key, text) {
    setForm((old) => ({ ...old, [key]: text }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!form.email.includes("@")) e.email = "That does not look like an email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  }

  function onSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    Alert.alert("Success", "Profile updated successfully");
    console.log("Profile data:", form);
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Profile</Text>

        <Text style={styles.label}>Name <Text style={styles.star}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(t) => update("name", t)}
          placeholder="Your name"
          autoCorrect={false}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <Text style={styles.label}>Email <Text style={styles.star}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(t) => update("email", t)}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Text style={styles.label}>Password <Text style={styles.star}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={form.password}
          onChangeText={(t) => update("password", t)}
          placeholder="At least 8 characters"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <Text style={styles.label}>Description <Text style={styles.star}>*</Text></Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={form.description}
          onChangeText={(t) => update("description", t)}
          placeholder="Tell us about yourself"
          multiline
          textAlignVertical="top"
        />
        {errors.description && <Text style={styles.error}>{errors.description}</Text>}

        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Save profile</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: "#EEF1F4" },
  content: { padding: 16, paddingBottom: 40 },
  heading: { fontSize: 24, fontWeight: "700", color: "#1B2027", marginBottom: 8 },
  label: { fontSize: 14, fontWeight: "600", color: "#4A535F", marginTop: 14, marginBottom: 6 },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D5DAE0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1B2027",
  },
  star: { color: "#D93025" },
  multiline: { minHeight: 100 },
  error: { fontSize: 13, color: "#D93025", marginTop: 4 },
  button: {
    backgroundColor: "#18A999",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
