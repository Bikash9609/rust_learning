import * as logs from "@tauri-apps/plugin-log";

// Patch global console methods to use Tauri log
Object.assign(window.console, {
  log: (...args: any[]) => logs.info(args.map(formatArg).join(" ")),
  error: (...args: any[]) => logs.error(args.map(formatArg).join(" ")),
  warn: (...args: any[]) => logs.warn(args.map(formatArg).join(" ")),
  info: (...args: any[]) => logs.info(args.map(formatArg).join(" ")),
  debug: (...args: any[]) => logs.debug(args.map(formatArg).join(" ")),
  trace: (...args: any[]) => logs.trace(args.map(formatArg).join(" ")),
});

// Optional: handle non-string arguments better
function formatArg(arg: unknown): string {
  if (typeof arg === "object") {
    try {
      return JSON.stringify(arg, null, 2);
    } catch {
      return "[Unserializable Object]";
    }
  }
  return String(arg);
}
