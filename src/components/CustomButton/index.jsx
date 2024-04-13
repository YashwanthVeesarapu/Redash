import React from "react";

import "./styles.scss";

const CustomButton = (props) => {
  return <button {...props}>{props.children}</button>;
};

export default CustomButton;
