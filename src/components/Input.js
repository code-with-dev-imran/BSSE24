import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({ label, required, error, ...props }) {
  return (
    <View>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.star}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, error && styles.inputBad]}
        placeholderTextColor="#9AA3AE"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: "600", color: "#4A535F", marginTop: 14, marginBottom: 6 },
  star: { color: "#D93025" },
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
  inputBad: { borderColor: "#D93025" },
  error: { fontSize: 13, color: "#D93025", marginTop: 4 },
});
