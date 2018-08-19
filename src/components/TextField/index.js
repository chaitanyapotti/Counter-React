import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const TextField = props => (
  <Form>
    <FormGroup>
      <Label for="exampleEmail">{props.label}</Label>
      <Input type="text" name="text" placeholder={props.placeholder} />
    </FormGroup>
  </Form>
);

export default TextField;
