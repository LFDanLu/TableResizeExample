import React, { RefObject } from "react";
import { useTableColumnResize } from "@react-aria/table";
import { VisuallyHidden } from "react-aria";

// TODO: type the props
export const Resizer = React.forwardRef(
  (props: any, ref: RefObject<HTMLInputElement>) => {
    let {
      column,
      layoutState,
      onResizeStart,
      onResize,
      onResizeEnd,
      triggerRef,
      showResizer
    } = props;
    let { resizerProps, inputProps } = useTableColumnResize(
      {
        column,
        label: "Resizer",
        onResizeStart,
        onResize,
        onResizeEnd,
        triggerRef
      },
      layoutState,
      ref
    );

    return (
      <div
        role="presentation"
        style={{
          cursor: undefined,
          width: "6px",
          height: "auto",
          border: "2px",
          borderStyle: "none solid",
          borderColor:
            layoutState.resizingColumn === column.key ? "orange" : "grey",
          touchAction: "none",
          flex: "0 0 auto",
          boxSizing: "border-box",
          visibility: showResizer ? "visible" : "hidden",
          marginLeft: "4px"
        }}
        {...resizerProps}
      >
        <VisuallyHidden>
          <input ref={ref} type="range" {...inputProps} />
        </VisuallyHidden>
      </div>
    );
  }
);
