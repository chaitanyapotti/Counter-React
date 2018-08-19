import React from 'react';
import { Button } from "reactstrap";

const Approve = (props) =>
    <Button className={props.class} color="primary" disabled={props.disabled} onClick={props.onClick}>Approve</Button>

export default Approve;