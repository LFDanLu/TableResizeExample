import { mergeProps, useFocusRing, useTableCell } from "react-aria";
import React, { useRef } from "react";

// todo type props
export function TableCell({ cell, state, widths }) {
  let ref = useRef();
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();
  let column = cell.column;

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      style={{
        padding: "5px 10px",
        cursor: "default",
        outline: "none",
        boxShadow: isFocusVisible ? "inset 0 0 0 2px orange" : "none",
        width: widths.get(column.key),
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "block",
        flex: "0 0 auto",
        boxSizing: "border-box"
      }}
      ref={ref}
    >
      {cell.rendered}
    </td>
  );
}
