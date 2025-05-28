import { Box } from "@mantine/core";

import { AppCover } from "../../components/appshell/appshell";
import { Content } from "./content";

import styles from "./main.module.scss";

function Main() {
  return (
    <AppCover>
      <Box className={styles.main}>
        <Content />
      </Box>
    </AppCover>
  );
}

export default Main;
