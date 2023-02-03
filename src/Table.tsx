import React, { useRef } from "react";
import { useTable } from "react-aria";
import { useTableState } from "react-stately";
import { useTableColumnResizeState } from "@react-stately/table";
import { TableRowGroup } from "./TableRowGroup";
import { TableHeaderRow } from "./TableHeaderRow";
import { TableColumnHeader } from "./TableColumnHeader";
import { TableCheckboxCell, TableSelectAllCell } from "./TableCheckbox";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";

// TODO add types
export function Table(props) {
  let {
    selectionMode,
    selectionBehavior,
    onResizeStart,
    onResize,
    onResizeEnd
  } = props;
  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === "multiple" && selectionBehavior !== "replace"
  });

  let ref = useRef();
  let { collection } = state;
  let { gridProps } = useTable(
    {
      ...props,
      // The table itself is scrollable rather than just the body
      scrollRef: ref
    },
    state,
    ref
  );

  let getDefaultWidth = React.useCallback((node) => {
    // selection cell column should always take up a specific width, doesn't need to be resizable
    if (node.props.isSelectionCell) {
      return 20;
    }
    return undefined;
  }, []);

  let getDefaultMinWidth = React.useCallback((node) => {
    // selection cell column should always take up a specific width, doesn't need to be resizable
    if (node.props.isSelectionCell) {
      return 20;
    }
    return 75;
  }, []);

  // TODO: Add resize observer
  // TODO: replace styles with tailwind styles
  // TODO: add sorting example via useAsyncList

  let layoutState = useTableColumnResizeState(
    {
      getDefaultWidth,
      getDefaultMinWidth,
      tableWidth: 300
    },
    state
  );
  let { widths } = layoutState;
  return (
    <table
      {...gridProps}
      ref={ref}
      style={{
        borderCollapse: "collapse",
        width: "300px",
        height: "200px",
        display: "block",
        position: "relative",
        overflow: "auto"
      }}
    >
      <TableRowGroup
        type="thead"
        style={{
          borderBottom: "2px solid var(--spectrum-global-color-gray-800)",
          display: "block",
          position: "sticky",
          top: 0,
          background: "var(--spectrum-gray-100)",
          width: "fit-content"
        }}
      >
        {collection.headerRows.map((headerRow) => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map((column) =>
              column.props.isSelectionCell ? (
                <TableSelectAllCell
                  key={column.key}
                  column={column}
                  state={state}
                  widths={widths}
                />
              ) : (
                <TableColumnHeader
                  key={column.key}
                  column={column}
                  state={state}
                  layoutState={layoutState}
                  onResizeStart={onResizeStart}
                  onResize={onResize}
                  onResizeEnd={onResizeEnd}
                />
              )
            )}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup
        style={{
          maxHeight: "200px"
        }}
        type="tbody"
      >
        {[...collection.body.childNodes].map((row) => (
          <TableRow key={row.key} item={row} state={state}>
            {[...row.childNodes].map((cell) =>
              cell.props.isSelectionCell ? (
                <TableCheckboxCell
                  key={cell.key}
                  cell={cell}
                  state={state}
                  widths={widths}
                />
              ) : (
                <TableCell
                  key={cell.key}
                  cell={cell}
                  state={state}
                  widths={widths}
                />
              )
            )}
          </TableRow>
        ))}
      </TableRowGroup>
    </table>
  );
}
