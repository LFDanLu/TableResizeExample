import { Item } from "react-stately";
import { MenuTrigger } from "./Menu";
import {
  mergeProps,
  useHover,
  useFocusRing,
  useTableColumnHeader
} from "react-aria";
import React, { useMemo, useRef } from "react";
import { Resizer } from "./Resizer";

// TODO add types/props
export function TableColumnHeader({
  column,
  state,
  layoutState,
  onResizeStart,
  onResize,
  onResizeEnd
}) {
  let { widths } = layoutState;
  let ref = useRef(null);
  let resizerRef = useRef(null);
  let triggerRef = useRef(null);
  let { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  let { isFocusVisible, focusProps } = useFocusRing();
  let { hoverProps, isHovered } = useHover({});
  let showResizer = isHovered || layoutState.resizingColumn === column.key;
  let arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";
  let allowsSorting = column.props?.allowsSorting;
  let allowsResizing = column.props.allowsResizing;

  const onMenuSelect = (key) => {
    switch (key) {
      case "sort-asc":
        state.sort(column.key, "ascending");
        break;
      case "sort-desc":
        state.sort(column.key, "descending");
        break;
      case "resize":
        layoutState.onColumnResizeStart(column.key);
        if (resizerRef) {
          // Brief delay before moving focus to resizer input for screenreaders/Safari
          setTimeout(() => resizerRef.current?.focus(), 50);
        }
        break;
    }
  };

  let items = useMemo(() => {
    let options = [
      allowsSorting
        ? {
            label: "Sort ascending",
            id: "sort-asc"
          }
        : undefined,
      allowsSorting
        ? {
            label: "Sort descending",
            id: "sort-desc"
          }
        : undefined,
      {
        label: "Resize column",
        id: "resize"
      }
    ];
    return options;
  }, [allowsSorting]);

  let sortIcon = (
    <span
      aria-hidden="true"
      style={{
        padding: "0 2px",
        visibility:
          state.sortDescriptor?.column === column.key ? "visible" : "hidden"
      }}
    >
      {arrowIcon}
    </span>
  );

  let contents = allowsResizing ? (
    <>
      <MenuTrigger
        style={{
          width: "100%",
          textAlign: "left",
          border: "none",
          background: "transparent",
          flex: "1 1 auto",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          marginInlineStart: "-6px"
        }}
        label={column.rendered}
        onAction={onMenuSelect}
        items={items}
        ref={triggerRef}
      >
        {(item) => <Item>{item.label}</Item>}
      </MenuTrigger>
      {column.props.allowsSorting && sortIcon}
      <Resizer
        showResizer={showResizer}
        ref={resizerRef}
        triggerRef={triggerRef}
        column={column}
        layoutState={layoutState}
        onResizeStart={onResizeStart}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
      />
    </>
  ) : (
    <div
      style={{
        flex: "1 1 auto",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }}
    >
      {column.rendered}
      {column.props.allowsSorting && sortIcon}
    </div>
  );

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps, hoverProps)}
      colSpan={column.colspan}
      style={{
        textAlign: column.colspan > 1 ? "center" : "left",
        padding: "5px 10px",
        outline: "none",
        boxShadow: isFocusVisible ? "inset 0 0 0 2px orange" : "none",
        cursor: "default",
        width: widths.get(column.key),
        display: "block",
        flex: "0 0 auto",
        boxSizing: "border-box"
      }}
      ref={ref}
    >
      <div style={{ display: "flex", position: "relative" }}>{contents}</div>
    </th>
  );
}
