import {createTheme, MantineProvider} from "@mantine/core";
import {PropsWithChildren} from "react";

import "@mantine/core/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export function ThemeProvider({children}: PropsWithChildren) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
