import React from "react";
import ModalComponent from "../ModalComponent";
import Form from "../../pages/Form";
import ToggleSwitch from "../ToggleSwitch";
import TextField from "../TextField";

const TradeModal = props => (
  <ModalComponent toggle={props.toggle} modal={props.modal}>
    {props.checked ? (
      <div>
        <span>Do you wish to initate a trade </span>
        <ToggleSwitch checked={props.checked} onToggle={props.onToggle} />
        <Form />
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
