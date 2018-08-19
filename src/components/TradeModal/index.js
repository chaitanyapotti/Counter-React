import React from "react";
import { Form } from "reactstrap";
import ModalComponent from "../ModalComponent";
import TransactionForm from "../../pages/TransactionForm";
import ToggleSwitch from "../ToggleSwitch";
import TextField from "../TextField";

//Need to passs toggle state into transaction form
const TradeModal = props => (
  <ModalComponent toggle={props.toggle} modal={props.modal}>
    {props.checked ? (
      <div>
        <div className="push--bottom">
          <span className="txt-xl push--right">Do you wish to initate a trade </span>
          <ToggleSwitch checked={props.checked} onToggle={props.onToggle} />
        </div>
        <TransactionForm isInitiator={props.checked} disabled={props.disabled}/>
      </div>
    ) : (
      <div className="push--bottom">
        <div className="txt-xl push--right">
          <span>Do you wish to initate a trade </span>
          <ToggleSwitch checked={props.checked} onToggle={props.onToggle} />
        </div>
        <TextField
          label="Enter the address of the Initiator"
          placeholder="Address"
        />
        <TransactionForm isInitiator={props.checked} />
      </div>
    )}
  </ModalComponent>
);

export default TradeModal;
