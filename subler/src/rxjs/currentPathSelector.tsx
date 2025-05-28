// store.ts
import { BehaviorSubject, of, switchMap } from "rxjs";
import { bind } from "@react-rxjs/core";
import { invoke } from "@tauri-apps/api/core";

// 1. Active ID state
const activeIdSubject = new BehaviorSubject<string | null>(null);
export const setActivePath = (path: string | null) =>
  activeIdSubject.next(path);
export const activeId$ = activeIdSubject.asObservable();

// 2. API call stream
const apiResponse$ = activeId$.pipe(
  switchMap((path) => {
    if (!path) return of(null);
    return invoke<AppFile[]>("get_folder_files", { path });
  }),
);

// 3. Binding for React
export const [useActivePathContent] = bind(apiResponse$, null);
export const [useActivePath] = bind(activeId$, null);
