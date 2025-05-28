import { Table, Text } from "@mantine/core";
import { useActivePathContent } from "../../rxjs/currentPathSelector";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState } from "react";

type FileElement = {
  name: string;
  path: string;
  is_dir: boolean;
};

const columnHelper = createColumnHelper<FileElement>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <Text size="sm">{info.getValue()}</Text>,
  }),
  columnHelper.accessor("path", {
    header: "Variety",
    cell: (info) => (
      <Text size="xs" c="gray.7">
        {info.getValue()}
      </Text>
    ),
  }),
  columnHelper.accessor("is_dir", {
    header: "Variant",
    cell: (info) => (
      <Text size="xs">{info.getValue() ? "Directory" : "File"}</Text>
    ),
  }),
];

export const Content = () => {
  const content = useActivePathContent() ?? [];

  const [columnOrder, setColumnOrder] = useState<string[]>([
    "name",
    "path",
    "is_dir",
  ]);

  const table = useReactTable({
    data: content,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnOrderChange: setColumnOrder,
    state: {
      columnOrder,
    },
  });

  return (
    <Table stickyHeader stickyHeaderOffset={-12} highlightOnHover>
      <Table.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </Table.Th>
            ))}
          </Table.Tr>
        ))}
      </Table.Thead>
      <Table.Tbody>
        {table.getRowModel().rows.map((row) => (
          <Table.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
