import { useStateObservable } from "@react-rxjs/core";
import { loadBaseDir$ } from "../../rxjs/baseDirState";
import {
  NavLink,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconFile, IconFolder } from "@tabler/icons-react";
import clsx from "clsx";

import styles from "./side-drawer.module.scss";
import { usePathShowSignal } from "../../rxjs/pathShowSignal";
import { getFolderIcon } from "./iconMap";

export function SideDrawer() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const baseDir = useStateObservable(loadBaseDir$());
  const showPath = usePathShowSignal();

  return baseDir.files.map((item) => (
    <NavLink
      key={item.path}
      href="#"
      classNames={{
        root: clsx(styles.root, { [styles.withoutPath]: !showPath }),
        description: styles.description,
        label: styles.label,
      }}
      variant="light"
      color="gray"
      leftSection={getFolderIcon(item.name, item.is_dir)}
      style={{
        fontSize: rem(12),
        color:
          colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[7],
      }}
      label={item.name}
      description={showPath ? item.path : undefined}
    />
  ));
}
