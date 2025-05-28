import { useStateObservable } from "@react-rxjs/core";
import { loadBaseDir$ } from "../../rxjs/baseDirState";
import {
  NavLink,
  rem,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import clsx from "clsx";

import styles from "./side-drawer.module.scss";
import { usePathShowSignal } from "../../rxjs/pathShowSignal";
import { getFolderIcon } from "./iconMap";
import { setActivePath, useActivePath } from "../../rxjs/currentPathSelector";
import { useMemo } from "react";

type SideDrawerProps = {
  showLabel?: boolean;
};

export function SideDrawer({ showLabel = true }: SideDrawerProps) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const baseDir = useStateObservable(loadBaseDir$());
  const showPath = usePathShowSignal();
  const activePath = useActivePath();

  const active = useMemo(() => activePath, [activePath]);

  return baseDir.files.map((item) => (
    <Tooltip
      disabled={showLabel}
      label={item.name}
      position="right"
      key={item.path}
    >
      <NavLink
        onClick={() => setActivePath(item.path)}
        key={item.path}
        href="#"
        classNames={{
          root: clsx(styles.root, {
            [styles.withoutPath]: !showPath,
            [styles.active]: active === item.path,
          }),
          description: styles.description,
          label: styles.label,
        }}
        variant="light"
        color="gray"
        leftSection={getFolderIcon(item.name, item.is_dir)}
        style={{
          fontSize: rem(12),
          color:
            colorScheme === "dark"
              ? theme.colors.gray[0]
              : active !== item.path
                ? theme.colors.dark[2]
                : theme.colors.dark[7],
        }}
        label={showLabel ? item.name : undefined}
        description={showPath ? item.path : undefined}
      />
    </Tooltip>
  ));
}
