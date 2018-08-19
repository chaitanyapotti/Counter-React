import React from "react";
import { Form } from "reactstrap";
import ModalComponent from "../ModalComponent";
import TransactionForm from "../../pages/TransactionForm";
import ToggleSwitch from "../ToggleSwitch";
import TextField from "../TextField";

const TradeModal = props => (
  <ModalComponent toggle={props.toggle} modal={props.modal}>
    {props.checked ? (
      <div>
        <span>Do you wish to initate a trade </span>
        <ToggleSwitch checked={props.checked} onToggle={props.onToggle} />
        <TransactionForm />
      </div>
    ) : (
      <div>
        <span>Do you wish to initate a trade </span>
        <ToggleSwitch checked={props.checked} onToggle={props.onToggle} />
        <TextField
          label="Enter the address of the Initiator"
          placeholder="Address"
        />
      </div>
    )}
  </ModalComponent>
);

export default TradeModal;
