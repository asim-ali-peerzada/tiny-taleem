import { useState } from "react";

const STORAGE_KEY = "tinytaleem_user_name";

export function useUser() {
  const [userName, setUserName] = useState<string | null>(() => {
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      return globalThis.localStorage.getItem(STORAGE_KEY);
    }
    return null;
  });

  const saveName = (name: string) => {
    const trimmedName = name.trim().slice(0, 30);
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.setItem(STORAGE_KEY, trimmedName);
    }
    setUserName(trimmedName);
  };

  const clearName = () => {
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.removeItem(STORAGE_KEY);
    }
    setUserName(null);
  };

  return {
    userName,
    saveName,
    clearName,
    hasName: !!userName,
  };
}
