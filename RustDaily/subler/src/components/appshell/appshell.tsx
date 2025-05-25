import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {Skeleton, Box, rem, Flex, useMantineTheme} from "@mantine/core";
import {PropsWithChildren} from "react";
import AppHeader from "./header";
import {AppPath} from "./breadcrumbs";
import {IconGripHorizontal} from "@tabler/icons-react";
import styles from "./appshell.module.scss";

export function AppCover({children}: PropsWithChildren) {
  const {colors} = useMantineTheme();

  return (
    <Box h="100vh" display="flex" style={{flexDirection: "column"}}>
      {/* Header */}
      <Flex
        h={rem(40)}
        px="md"
        style={{borderBottom: `1px solid ${colors.gray[3]}`}}
        display="flex"
        ta="center">
        <AppHeader />
      </Flex>
      {/* Main Content */}
      <Box flex="1 1 0" style={{overflow: "hidden"}}>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={10} maxSize={40}>
            <Box
              h="100%"
              bg="gray.1"
              p="md"
              style={{
                overflowY: "auto",
              }}>
              Navbar
              {Array(15)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} h={28} mt="sm" animate={false} />
                ))}
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
              }}>
              <IconGripHorizontal size={16} stroke={1.5} />
            </Box>
          </PanelResizeHandle>

          <Panel minSize={40}>
            {/* AppPath */}
            <AppPath />
            <Box p="md" h="100%" style={{overflowY: "auto"}}>
              {children}
            </Box>
          </Panel>
        </PanelGroup>
      </Box>
    </Box>
  );
}
