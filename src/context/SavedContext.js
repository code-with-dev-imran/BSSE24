import { createContext, useState } from "react";

export const SavedContext = createContext(null);

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState([]);

  function toggle(course) {
    setSaved((prev) =>
      prev.find((c) => c.id === course.id)
        ? prev.filter((c) => c.id !== course.id)
        : [...prev, course]
    );
  }

  function clear() {
    setSaved([]);
  }

  return (
    <SavedContext.Provider value={{ saved, toggle, clear }}>
      {children}
    </SavedContext.Provider>
  );
}
