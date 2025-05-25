import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from "react";
import {invoke} from "@tauri-apps/api/core";

const defaultValue = {
  baseDirs: undefined,
};

const FsContext = createContext(defaultValue);

export const FsContextProvider = ({children}: PropsWithChildren) => {
  const getBaseDirs = useCallback(async () => {
    const res: FileSystemDirectoryEntry = await invoke("get_base");
    console.log(JSON.stringify(res, null, 2));
  }, []);

  useEffect(() => {
    getBaseDirs();
  }, []);

  return (
    <FsContext.Provider value={defaultValue}>{children}</FsContext.Provider>
  );
};

export const useFsProvider = () => {
  const context = useContext(FsContext);
  if (!context) {
    throw new Error("useFsProvider must be used withing FsContextProvider");
  }
  return context;
};
