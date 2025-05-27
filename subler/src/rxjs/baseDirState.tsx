import { invoke } from "@tauri-apps/api/core";
import { state } from "@react-rxjs/core";
import { from } from "rxjs";

type BaseDirResponse = {
  files: AppFile[];
  root_dir: FilePath; // Ensure FilePath is properly defined
};

const initialBaseDir: BaseDirResponse = {
  files: [],
  root_dir: "", // Adjust if FilePath is a different type
};

export const loadBaseDir$ = state(
  () => from(invoke<BaseDirResponse>("get_base")),
  initialBaseDir,
);
