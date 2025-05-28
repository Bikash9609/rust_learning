import { useState, useMemo, useCallback } from "react";
import { useActivePathContent } from "../../rxjs/currentPathSelector";
import { Box } from "@mantine/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ColDef,
  GridReadyEvent,
  RowSelectedEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

type FileElement = {
  id: string;
  name: string;
  path: string;
  is_dir: boolean;
};

export const Content = () => {
  const content = useActivePathContent() ?? [];
  const [selected, setSelected] = useState<FileElement[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);

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
        checkboxSelection: true,
        headerCheckboxSelection: true,
        lockPosition: "left",
        suppressMovable: true,
      },
      {
        field: "type",
        headerName: "Type",
        sortable: true,
        filter: true,
        maxWidth: 150,
        minWidth: 100,
      },
      {
        field: "path",
        headerName: "Path",
        sortable: true,
        filter: true,
      },
    ],
    [],
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    }),
    [],
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);

  const onRowSelected = useCallback((event: RowSelectedEvent) => {
    if (event.node.isSelected()) {
      setSelected((prev) => [...prev, event.data]);
    } else {
      setSelected((prev) => prev.filter((item) => item.id !== event.data.id));
    }
  }, []);

  const onSelectionChanged = useCallback(() => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map((node: any) => node.data);
      setSelected(selectedData);
    }
  }, [gridApi]);

  return (
    <Box h="100%" style={{ display: "flex", flexDirection: "column" }}>
      {selected.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <button>Delete</button>
          <button>Move</button>
          <button>Copy</button>
          <button>Add to Shortcut</button>
        </div>
      )}

      <div
        className="ag-theme-alpine"
        style={{ height: "100%", width: "100%", flexGrow: 1 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection
          onGridReady={onGridReady}
          onRowSelected={onRowSelected}
          onSelectionChanged={onSelectionChanged}
          rowMultiSelectWithClick
          suppressCellFocus
          animateRows
        />
      </div>
    </Box>
  );
};
