import React from 'react';
import { Button } from "reactstrap";

const CreateTransaction = (props) =>
    <Button className={props.class} color="primary" onClick={props.onClick}>Create Transaction</Button>

export default CreateTransaction;