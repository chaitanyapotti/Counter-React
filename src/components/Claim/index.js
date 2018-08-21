import React from "react";
import { Button } from "reactstrap";

const Claim = props => (
  <Button
    className={props.class}
    color="primary"
    disabled={props.disabled}
    onClick={props.onClick}
  >
    Claim
  </Button>
);

export default Claim;
