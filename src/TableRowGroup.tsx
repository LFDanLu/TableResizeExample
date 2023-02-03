import React from "react";
import { useTableRowGroup } from "react-aria";

// TODO: add props/types
export function TableRowGroup({ type: Element, style, children }) {
  let { rowGroupProps } = useTableRowGroup();
  return (
    <Element
      {...rowGroupProps}
      style={{
        display: "block",
        ...style
      }}
    >
      {children}
    </Element>
  );
}
