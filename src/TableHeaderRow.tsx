import React, { useRef } from "react";
import { useTableHeaderRow } from "react-aria";

// TODO: replace with props
export function TableHeaderRow({ item, state, children }) {
  let ref = useRef();
  let { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref} style={{ display: "flex" }}>
      {children}
    </tr>
  );
}
