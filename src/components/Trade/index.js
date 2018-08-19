import React from 'react';
import { Button } from "reactstrap";

const Trade = (props) =>
    <Button className={props.class} color="primary" disabled={props.disabled} onClick={props.onClick}>Trade</Button>

export default Trade;