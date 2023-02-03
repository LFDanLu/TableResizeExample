import { mergeProps, useFocusRing, useTableRow } from "react-aria";
import React, { useRef } from "react";

// TODO: type props
export function TableRow({ item, children, state }) {
  let ref = useRef();
  let isSelected = state.selectionManager.isSelected(item.key);
  let { rowProps, isPressed } = useTableRow(
    {
      node: item
    },
    state,
    ref
  );
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <tr
      style={{
        background: isSelected
          ? "blueviolet"
          : isPressed
          ? "var(--spectrum-global-color-gray-400)"
          : item.index % 2
          ? "var(--spectrum-alias-highlight-hover)"
          : "none",
        color: isSelected ? "white" : null,
        outline: "none",
        boxShadow: isFocusVisible ? "inset 0 0 0 2px orange" : "none",
        display: "flex",
        width: "fit-content"
      }}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </tr>
  );
}
