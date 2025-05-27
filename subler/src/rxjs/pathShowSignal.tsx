import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";

// Create the signal
const [pathShowSignal$, setPathShow] = createSignal<boolean>();

// Bind the signal with a default value of `false`
const [usePathShowSignal, pathShow$] = bind(pathShowSignal$, false);

// Export the hook and setter
export { usePathShowSignal, setPathShow };
