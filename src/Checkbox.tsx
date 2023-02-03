import React, { useRef } from "react";
import { useCheckbox } from "react-aria";
import { useToggleState } from "react-stately";

export function Checkbox(props) {
  let ref = useRef();
  let state = useToggleState(props);
  let { inputProps } = useCheckbox(props, state, ref);
  return <input {...inputProps} ref={ref} style={props.style} />;
}
