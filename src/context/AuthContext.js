import { createContext, useEffect, useState } from "react";
import {supabase} from '../lib/supabase'
export const AuthContext = createContext(null);



export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then((res)=>{
      console.log(res.data.session?.user);
      setUser(res.data.session?.user ?? null);
      setChecking(false)
    })
    //readUser()
      // .then(setUser)
      // .catch(() => { })
      // .finally(() => setChecking(false));
  }, []);

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if(error) throw error;
    setUser(data.user);
  }

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if(error) throw error;
    setUser(data.user);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut() ; 
    if(!error)
     setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, checking, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
