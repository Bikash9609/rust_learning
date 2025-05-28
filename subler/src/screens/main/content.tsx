import { useState, useMemo, useCallback, useRef } from "react";
import { useActivePathContent } from "../../rxjs/currentPathSelector";
import {
  Box,
  Text,
  Menu,
  ActionIcon,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridReadyEvent,
  RowSelectedEvent,
  ModuleRegistry,
  AllCommunityModule,
  GetContextMenuItemsParams,
  GridApi,
} from "ag-grid-community";
import {
  IconDotsVertical,
  IconTrash,
  IconCopy,
  IconCut,
  IconStar,
} from "@tabler/icons-react";

ModuleRegistry.registerModules([AllCommunityModule]);

type FileElement = {
  id: string;
  name: string;
  path: string;
  is_dir: boolean;
};

export const Content = () => {
  const theme = useMantineTheme();
  const content = useActivePathContent() ?? [];
  const [selected, setSelected] = useState<FileElement | null>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const rowData = useMemo(() => {
    return content.map((item, idx) => ({
      id: `${idx}-${item.name}`,
      name: item.name,
      path: item.path,
      type: item.is_dir ? "Directory" : "File",
      is_dir: item.is_dir,
    }));
  }, [content]);

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <Text size="sm" fw={params.data.is_dir ? 600 : 400}>
            {params.value}
          </Text>
        ),
      },
      {
        field: "type",
        headerName: "Type",
        sortable: true,
        filter: true,
        maxWidth: 150,
        minWidth: 100,
        cellRenderer: (params) => (
          <Text
            size="xs"
            c={
              params.value === "Directory"
                ? theme.colors.blue[6]
                : theme.colors.gray[6]
            }
          >
            {params.value}
          </Text>
        ),
      },
      {
        field: "path",
        headerName: "Path",
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <Text size="xs" c={theme.colors.gray[5]}>
            {params.value}
          </Text>
        ),
      },
      {
        field: "actions",
        headerName: "",
        maxWidth: 40,
        sortable: false,
        filter: false,
        cellRenderer: (params) => (
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(params.data);
              setContextMenuPosition({ x: e.clientX, y: e.clientY });
            }}
          >
            <IconDotsVertical size={rem(14)} />
          </ActionIcon>
        ),
      },
    ],
    [theme],
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      suppressMenu: true,
      cellStyle: {
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSizes.sm,
        padding: "2px 4px",
      },
      headerClass: "mantine-header-cell",
    }),
    [theme],
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);

  const onRowClicked = useCallback((params: any) => {
    setSelected(params.data);
  }, []);

  const handleContextMenu = useCallback((params: any) => {
    params.event.preventDefault();
    setSelected(params.node.data);
    setContextMenuPosition({
      x: params.event.clientX,
      y: params.event.clientY,
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenuPosition(null);
  }, []);

  const handleAction = useCallback(
    (action: string) => {
      if (!selected) return;
      console.log(`${action} item:`, selected);
      closeContextMenu();
    },
    [selected],
  );

  return (
    <Box
      h="100%"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.sm,
      }}
    >
      <Box
        className="ag-theme-alpine"
        style={{
          height: "100%",
          width: "100%",
          flexGrow: 1,
          "--ag-font-family": theme.fontFamily,
          "--ag-font-size": theme.fontSizes.xs,
          "--ag-row-height": "28px",
          "--ag-header-height": "30px",
          "--ag-border-color": "transparent",
          "--ag-row-border-color": theme.colors.gray[2],
          "--ag-header-background-color": theme.white,
          "--ag-odd-row-background-color": theme.white,
          "--ag-row-hover-color": theme.colors.gray[0],
          "--ag-selected-row-background-color": theme.colors.blue[0],
          "--ag-cell-horizontal-border": `1px solid ${theme.colors.gray[2]}`,
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowClickSelection
          onGridReady={onGridReady}
          onRowClicked={onRowClicked}
          onCellContextMenu={handleContextMenu}
          suppressCellFocus
          animateRows
          getRowStyle={() => ({
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
            padding: 0,
          })}
        />
      </Box>

      <Menu
        opened={!!contextMenuPosition}
        onChange={() => {}}
        position="bottom-end"
        onClose={closeContextMenu}
        styles={{
          dropdown: {
            boxShadow: theme.shadows.md,
            border: `1px solid ${theme.colors.gray[2]}`,
          },
        }}
      >
        <Menu.Target>
          <div
            ref={contextMenuRef}
            style={{
              position: "fixed",
              left: contextMenuPosition?.x || 0,
              top: contextMenuPosition?.y || 0,
              width: 0,
              height: 0,
              pointerEvents: "none",
            }}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconTrash size={rem(14)} color={theme.colors.red[6]} />
            }
            onClick={() => handleAction("Delete")}
          >
            Delete
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconCut size={rem(14)} color={theme.colors.blue[6]} />
            }
            onClick={() => handleAction("Move")}
          >
            Move
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconCopy size={rem(14)} color={theme.colors.blue[6]} />
            }
            onClick={() => handleAction("Copy")}
          >
            Copy
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconStar size={rem(14)} color={theme.colors.yellow[6]} />
            }
            onClick={() => handleAction("Add to Shortcut")}
          >
            Add to Shortcut
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};
