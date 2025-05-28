import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Box, rem, Flex, useMantineTheme, Title } from "@mantine/core";
import { PropsWithChildren, useState } from "react";
import AppHeader from "./header";
import { AppPath } from "./breadcrumbs";
import { IconGripHorizontal } from "@tabler/icons-react";
import { SideDrawer } from "./side-drawer";
import styles from "./appshell.module.scss";

export function AppCover({ children }: PropsWithChildren) {
  const { colors } = useMantineTheme();

  const [collapsedSidebar, setCollapsedSidebar] = useState(true);

  const handleCollapsedSidebar = () => setCollapsedSidebar(true);
  const handleExpandSidebar = () => setCollapsedSidebar(false);

  return (
    <Box h="100vh" display="flex" style={{ flexDirection: "column" }}>
      {/* Header */}
      <Flex
        h={rem(40)}
        px="md"
        style={{ borderBottom: `1px solid ${colors.gray[3]}` }}
        display="flex"
        ta="center"
      >
        <AppHeader />
      </Flex>
      {/* Main Content */}
      <Box flex="1 1 0" style={{ overflow: "hidden" }}>
        <PanelGroup direction="horizontal">
          <Panel
            defaultSize={5}
            collapsedSize={5}
            collapsible
            onCollapse={handleCollapsedSidebar}
            onExpand={handleExpandSidebar}
            minSize={10}
            maxSize={40}
          >
            <Box
              h="100%"
              bg="gray.1"
              py="xs"
              pb="xl"
              px={rem(5)}
              style={{
                overflowY: "auto",
              }}
            >
              {!collapsedSidebar && (
                <Title
                  px={rem(12)}
                  order={6}
                  pb={rem(5)}
                  style={{ fontSize: rem(12) }}
                  c="gray"
                >
                  Shortcuts
                </Title>
              )}
              <SideDrawer showLabel={!collapsedSidebar} />
            </Box>
          </Panel>

          <PanelResizeHandle className={styles.resizeHandler}>
            <Box
              style={{
                width: rem(8),
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "col-resize",
                background: "#f1f3f5",
              }}
            >
              <IconGripHorizontal size={16} stroke={1.5} />
            </Box>
          </PanelResizeHandle>

          <Panel minSize={40}>
            <AppPath />
            <Box
              bg="gray.1"
              p="0"
              h="100%"
              style={{
                overflowY: "auto",
              }}
            >
              {children}
            </Box>
          </Panel>
        </PanelGroup>
      </Box>
    </Box>
  );
}
