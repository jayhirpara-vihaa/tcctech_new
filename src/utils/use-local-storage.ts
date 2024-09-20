export { default as useLocalStorage } from "react-use/lib/useLocalStorage";

import { useState, useEffect } from "react";

const useSessionStorage = (name: string) => {
  const [value, setValue] = useState<any>([]);

  useEffect(() => {
    setValue(JSON.parse(sessionStorage.getItem(name)!));
  }, []);

  return value;
};

export default useSessionStorage;
