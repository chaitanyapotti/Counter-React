import React from 'react';
import { Button } from "reactstrap";

const Refund = (props) =>
    <Button className={props.class} color="primary" disabled={props.disabled} onClick={props.onClick}>Refund</Button>

export default Refund;