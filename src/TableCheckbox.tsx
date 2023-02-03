import { Checkbox } from "./Checkbox";
import React, { useRef } from "react";
import {
  useTableCell,
  useTableColumnHeader,
  useTableSelectAllCheckbox,
  useTableSelectionCheckbox,
  VisuallyHidden
} from "react-aria";

// TODO: type the props
export function TableCheckboxCell({ cell, state, widths }) {
  let ref = useRef();
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey },
    state
  );
  let column = cell.column;

  return (
    <td
      {...gridCellProps}
      style={{
        width: widths.get(column.key),
        display: "flex",
        boxSizing: "border-box"
      }}
      ref={ref}
    >
      <Checkbox
        {...checkboxProps}
        style={{ marginTop: "auto", marginBottom: "auto" }}
      />
    </td>
  );
}

export function TableSelectAllCell({ column, state, widths }) {
  let ref = useRef();
  let { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  let { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <th
      {...columnHeaderProps}
      style={{
        width: widths.get(column.key),
        boxSizing: "border-box",
        margin: "auto"
      }}
      ref={ref}
    >
      {state.selectionManager.selectionMode === "single" ? (
        <VisuallyHidden>{checkboxProps["aria-label"]}</VisuallyHidden>
      ) : (
        <Checkbox
          {...checkboxProps}
          style={{ marginTop: "auto", marginBottom: "auto" }}
        />
      )}
    </th>
  );
}
