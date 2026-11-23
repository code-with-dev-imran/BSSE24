import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { AuthContext } from "../../context/AuthContext";

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Sign in</Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: { value: /^\S+@\S+\.\S+$/, message: "That does not look like an email" },
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
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: { value: 8, message: "At least 8 characters" },
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

      <Pressable style={styles.button} onPress={handleSubmit((data) => signIn(data.email))}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#EEF1F4", padding: 16, paddingTop: 80 },
  heading: { fontSize: 28, fontWeight: "700", color: "#1B2027", marginBottom: 8 },
  button: {
    backgroundColor: "#7C3AED",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
