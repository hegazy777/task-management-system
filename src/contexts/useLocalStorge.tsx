import React, { useMemo } from "react";

type ValueType = string;

export function useLocalStorage() {
  const setValue = (newValue: ValueType) => {
    window.localStorage.setItem("token", newValue);
    window.dispatchEvent(
      new StorageEvent("storage", { key: "token", newValue })
    );
  };

  const getSnapshot = () => localStorage.getItem("token") as ValueType;

  const subscribe = (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  };

  const store = React.useSyncExternalStore(subscribe, getSnapshot);

  const value = useMemo(() => store, [store]);
  const removeValue = () => {
    window.localStorage.removeItem("token");
  };
  return [value, setValue, removeValue] as const;
}
