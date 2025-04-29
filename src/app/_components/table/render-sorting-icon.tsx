import { Column } from "@tanstack/react-table";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export function RenderSortingIcon<TData>({
  column,
}: {
  column: Column<TData, unknown>;
}) {
  return (
    {
      asc: <ArrowUp />,
      desc: <ArrowDown />,
    }[column.getIsSorted() as string] ?? <ArrowUpDown />
  );
}
