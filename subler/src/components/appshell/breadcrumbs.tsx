import { Anchor, Group, ScrollArea, useMantineTheme } from "@mantine/core";
import { IconSlash } from "@tabler/icons-react";
import styles from "./breadcrumbs.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { useActivePath } from "../../rxjs/currentPathSelector";

export function AppPath() {
  const theme = useMantineTheme();
  const viewport = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const activePath = useActivePath();

  const items = useMemo(() => {
    if (!activePath) return [];
    const parts = activePath.split("/");
    let splitPaths = parts.map((part, index) => {
      let title = part === "" ? "Home" : part;
      return {
        title,
        href: `#${parts.slice(0, index + 1).join("/")}`,
      };
    });

    return splitPaths;
  }, [activePath]);

  useEffect(() => {
    if (expanded) {
      viewport.current?.scrollTo({
        left: viewport.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [expanded]);

  const visibleItems = () => {
    if (items.length <= 5 || expanded) return items;

    const firstTwo = items.slice(0, 2);
    const lastTwo = items.slice(-2);
    return [...firstTwo, { title: "...", href: "#expand" }, ...lastTwo];
  };

  const handleClick = (e: React.MouseEvent, item: { title: string }) => {
    if (item.title === "...") {
      e.preventDefault();
      setExpanded(true);
    }
  };

  const renderedItems = visibleItems();

  return (
    <ScrollArea
      viewportRef={viewport}
      w="100%"
      px="md"
      scrollbars="x"
      type="never"
      bg="gray.1"
      styles={{
        root: {
          borderBottom: "1px solid",
          borderBottomColor: theme.colors.gray[2],
        },
      }}
    >
      <Group gap="0" wrap="nowrap" py={4}>
        {renderedItems.map((item, index) => (
          <Group key={index} gap={4} align="center" style={{ flexShrink: 0 }}>
            {index !== 0 && <IconSlash size={10} stroke={1.5} />}
            <Anchor
              size="xs"
              c={item.title === items[items.length - 1].title ? "blue" : "gray"}
              fw={
                item.title === items[items.length - 1].title ? "500" : undefined
              }
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              classNames={{ root: styles.breadcrumbAnchor }}
              style={item.title === "..." ? { cursor: "pointer" } : {}}
            >
              {item.title}
            </Anchor>
          </Group>
        ))}
      </Group>
    </ScrollArea>
  );
}
