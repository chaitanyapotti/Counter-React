import React from "react";
import { Button } from "reactstrap";

const FetchDetails = props => (
  <Button
    className={props.class}
    color="primary"
    disabled={props.disabled}
    onClick={props.onClick}
  >
    Fetch Details
  </Button>
);

export default FetchDetails;
