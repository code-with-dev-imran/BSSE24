import { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext(null);

const KEY = "session";
const isWeb = Platform.OS === "web";

// SecureStore does not work on web, so web uses localStorage
async function readUser() {
  const raw = isWeb ? localStorage.getItem(KEY) : await SecureStore.getItemAsync(KEY);
  return raw ? JSON.parse(raw) : null;
}

async function writeUser(user) {
  const raw = JSON.stringify(user);
  if (isWeb) localStorage.setItem(KEY, raw);
  else await SecureStore.setItemAsync(KEY, raw);
}

async function removeUser() {
  if (isWeb) localStorage.removeItem(KEY);
  else await SecureStore.deleteItemAsync(KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    readUser()
      .then(setUser)
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  // Dummy sign in: any email and password gives a user
  async function signIn(email) {
    const newUser = { name: email.split("@")[0], email };
    await writeUser(newUser);
    setUser(newUser);
  }

  async function signOut() {
    await removeUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, checking, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
