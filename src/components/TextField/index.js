import React from "react";
import {FormGroup, Label, Input } from "reactstrap";

const TextField = props => (
    <FormGroup>
      <Label for="exampleEmail">{props.label}</Label>
      <Input
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </FormGroup>
);

export default TextField;
